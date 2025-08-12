import { isIP } from "net";
import { sequelize } from "../config/Database";
import { CreateDomainRequest } from "../dto/requests/CreateDomainRequest";
import { CreateRecordRequest } from "../dto/requests/CreateRecordRequest";
import { UpdateRecordRequest } from "../dto/requests/UpdateRecordRequest";
import ExposableError from "../error/ExposableError";
import { CreateDomainOptions, CreateRecordOptions, IDNSConfig, UpdateRecordOptions } from "../interfaces/IDNSConfig";
import { Domain } from "../models/DomainModel";
import { DomainRecord, RecordType } from "../models/DomainRecordModel";
import { isFQDN, isInt } from "validator";

export class DNSService {
  constructor(private DNSConfig: IDNSConfig) {
    this.DNSConfig = DNSConfig;
  }
  async getAll(userId: number) {
    return await Domain.findAll({ where: { created_by: userId } });
  }

  async create(createDomainBody: CreateDomainRequest) {
    const transaction = await sequelize.transaction();
    try {
      const domain = await Domain.findOne({ where: { name: createDomainBody.name } });
      if (domain) {
        throw new ExposableError("This domain name already exist", 409);
      }
      const result = await Domain.create(createDomainBody as any, { transaction });
      const dnsOptions: CreateDomainOptions = createDomainBody;
      await this.DNSConfig.create(dnsOptions);
      await transaction.commit();
      return result.get();
    } catch (error: unknown) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(domainId: string) {
    const transaction = await sequelize.transaction();
    const domain = await Domain.findByPk(domainId);
    if (!domain) {
      throw new ExposableError("Domain not found", 404);
    }
    try {
      await Domain.destroy({ where: { id: domainId }, transaction });
      await this.DNSConfig.delete(domain.name);
      await transaction.commit();
      return;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async createRecord(createRecordBody: CreateRecordRequest, domainId: number) {
    const domain = await Domain.findByPk(domainId);
    if (!domain) {
      throw new ExposableError("Domain not found", 404);
    }
    const record = await DomainRecord.findOne({ where: { domain_Id: domainId, name: createRecordBody.name } });
    if (record) {
      throw new ExposableError("This record already exists", 409);
    }

    createRecordBody.value =
      this.validateRecordType(createRecordBody.type, createRecordBody.value) ?? createRecordBody.value;
    const transaction = await sequelize.transaction();

    try {
      const newRecord = {
        ...createRecordBody,
        domain_id: domain.id,
      };

      const result = await DomainRecord.create(newRecord, { transaction });

      const recordOptions: CreateRecordOptions = createRecordBody;
      await this.DNSConfig.createRecord(domain.name, recordOptions);
      await transaction.commit();
      return result.get();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getRecords(domainId: number) {
    return await DomainRecord.findAll({ where: { domain_id: domainId } });
  }

  async updateRecord(updateRecordBody: UpdateRecordRequest, domainId: number, recordId: number) {
    const domain = await Domain.findByPk(domainId);
    if (!domain) {
      throw new ExposableError("Domain not found", 404);
    }
    const record = await DomainRecord.findByPk(recordId);
    if (!record) {
      throw new ExposableError("Record not found", 404);
    }

    updateRecordBody.value =
      this.validateRecordType(updateRecordBody.type, updateRecordBody.value) ?? updateRecordBody.value;
    const transaction = await sequelize.transaction();
    try {
      const result = await record.update(updateRecordBody, { transaction });

      const recordOptions: UpdateRecordOptions = record;
      await this.DNSConfig.updateRecord(domain.name, record.name, recordOptions);

      await transaction.commit();
      return result.get();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteRecord(domainId: number, recordId: number) {
    const domain = await Domain.findByPk(domainId);
    if (!domain) {
      throw new ExposableError("Domain not found", 404);
    }
    const record = await DomainRecord.findByPk(recordId);
    if (!record) {
      throw new ExposableError("Record not found", 404);
    }

    const transaction = await sequelize.transaction();
    try {
      const result = await record.destroy({ transaction });
      await this.DNSConfig.deleteRecord(domain.name, record.name, record.type);
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  validateRecordType(recordType: string, value: string) {
    switch (recordType) {
      case RecordType.A:
        if (isIP(value) === 4) return value;
        throw new ExposableError("value should be an IP address, for example: ‘203.0.113.210’", 400);

      case RecordType.AAAA:
        if (isIP(value) === 6) return value;
        throw new ExposableError("Value should be an IPv6 address. An example: ‘2001:DB8:2000:bf0::1’", 400);

      case RecordType.CNAME:
        if (isFQDN(value.slice(0, -1), { require_tld: true }) === true && value[value.length - 1] === ".") return value;
        throw new ExposableError('Value should be a FQDN ending with ".". An example: "test.example.com."', 400);

      case RecordType.MX:
        const [priority, dns] = value.split(" ");
        if (
          dns &&
          Number(priority) >= 0 &&
          isFQDN(dns.slice(0, -1), { require_tld: true }) === true &&
          dns[dns.length - 1] === "."
        ) {
          return value;
        }
        throw new ExposableError(
          'Value should have a number first (priority) then a FQDN ending with ".". An example: "10 test.example.com."',
          400
        );

      case RecordType.TXT:
        if (typeof value === "string") return `"${value}"`;
        throw new ExposableError("value should be a string", 400);

      default:
        break;
    }
  }
}
