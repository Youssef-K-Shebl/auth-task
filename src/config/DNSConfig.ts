import axios from "axios";
import { CreateDomainRequest } from "../dto/requests/CreateDomainRequest";
import { CreateRecordRequest } from "../dto/requests/CreateRecordRequest";
import { CreateDomainOptions, CreateRecordOptions, IDNSConfig, UpdateRecordOptions } from "../interfaces/IDNSConfig";
import { setting } from "./Setting";
import ExposableError from "../error/ExposableError";
import { log } from "console";

export class DNSConfig implements IDNSConfig {
  async create(createDomainOptions: CreateDomainOptions): Promise<any> {
    try {
      const response = await axios.post(
        `http://${setting.DNS_HOST}/api/v1/servers/localhost/zones`,
        {
          name: `${createDomainOptions.name}.`,
          kind: "Native",
          masters: [],
        },
        { headers: { "X-API-Key": setting.X_API_KEY } }
      );
      return response;
    } catch (error: any) {
      if (error.status === 409) {
        throw new ExposableError("This domain already exist", 409);
      }
      throw error;
    }
  }
  async delete(domainName: string): Promise<any> {
    try {
      return await axios.delete(`http://${setting.DNS_HOST}/api/v1/servers/localhost/zones/${domainName}.`, {
        headers: { "X-API-Key": setting.X_API_KEY },
      });
    } catch (error: any) {
      if (error.status === 404) {
        throw new ExposableError("This domain does not exist", 404);
      }
      throw error;
    }
  }

  async createRecord(domainName: string, createRecordOptions: CreateRecordOptions): Promise<any> {
    try {
      const result = await axios.patch(
        `http://${setting.DNS_HOST}/api/v1/servers/localhost/zones/${domainName}.`,
        {
          rrsets: [
            {
              name: `${createRecordOptions.name}.${domainName}.`,
              type: createRecordOptions.type,
              ttl: createRecordOptions.ttl,
              changetype: "REPLACE",
              records: [{ content: createRecordOptions.value, disabled: false }],
            },
          ],
        },
        { headers: { "X-API-Key": setting.X_API_KEY } }
      );
      return result;
    } catch (error: any) {
      if (error.status === 404) {
        throw new ExposableError("This domain does not exist", 404);
      }
      throw error;
    }
  }
  async updateRecord(domainName: string, recordName: string, updateRecordOptions: UpdateRecordOptions): Promise<any> {
    try {
      const result = await axios.patch(
        `http://${setting.DNS_HOST}/api/v1/servers/localhost/zones/${domainName}.`,
        {
          rrsets: [
            {
              name: `${recordName}.${domainName}` + ".",
              type: updateRecordOptions.type,
              ttl: updateRecordOptions.ttl,
              changetype: "REPLACE",
              records: [{ content: updateRecordOptions.value, disabled: false }],
            },
          ],
        },
        { headers: { "X-API-Key": setting.X_API_KEY } }
      );
      return result;
    } catch (error: any) {
      if (error.status === 404) {
        throw new ExposableError("This domain does not exist", 404);
      }
      throw error;
    }
  }

  async deleteRecord(domainName: string, recordName: string, recordType: string): Promise<any> {
    try {
      const result = await axios.patch(
        `http://${setting.DNS_HOST}/api/v1/servers/localhost/zones/${domainName}.`,
        {
          rrsets: [
            {
              name: domainName + "." + recordName + ".",
              type: recordType,
              changetype: "DELETE",
            },
          ],
        },
        { headers: { "X-API-Key": setting.X_API_KEY } }
      );
      return result;
    } catch (error: any) {
      if (error.status === 404) {
        throw new ExposableError("This domain does not exist", 404);
      }
      throw error;
    }
  }
}
