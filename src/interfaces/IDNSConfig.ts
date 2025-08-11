import { CreateDomainRequest } from "../dto/requests/CreateDomainRequest";
import { CreateRecordRequest } from "../dto/requests/CreateRecordRequest";
import { DomainStatus } from "../models/DomainModel";

export interface CreateDomainOptions {
  name: string;
  status: DomainStatus;
}

export interface CreateRecordOptions {
  name: string;
  type: string;
  ttl: number;
  status: string;
  value: string;
}

export interface UpdateRecordOptions {
  type: string;
  ttl: number;
  status: string;
  value: string;
}

export interface IDNSConfig {
  create(createDomainOptions: CreateDomainOptions): Promise<any>;
  delete(domainName: string): Promise<any>;

  createRecord(domainName: string, createRecordOptions: CreateRecordOptions): Promise<any>;
  updateRecord(domainName: string, recordName: string, updateRecordOptions: UpdateRecordOptions): Promise<any>;
  deleteRecord(domainName: string, recordName: string, recordType: string): Promise<any>;
}

/* Creta domain record
  - name
  - domain (string)
  - type 
  - ttl
  - value (content) (destinatino)
  - status
 */

// domain & record name as ID
/* Update domain record
  - type 
  - ttl
  - value (content) (destinatino)
  - status
 */
