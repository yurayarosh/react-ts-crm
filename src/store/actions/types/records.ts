export interface IRecord {
  categoryId: string
  expenseType: string
  amount: string | number
  description: string
}

export interface IRecords {
  [key: string]: IRecord
}

export interface IRecordsState {
  records: IRecords | null
  error?: string
}

export interface ActionRecords {
  type: string
  records?: IRecords | null
  record?: IRecord
  recordName?: any
  error?: string
}

export interface ICreateRecordResponse {
  name: string
}
