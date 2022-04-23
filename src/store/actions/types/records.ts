export enum ExpencesTypes {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

export interface IRecord {
  id: string
  date: Date
  categoryId: string
  expenseType: string
  amount: string | number
  description: string
}

export interface ITableRecord extends IRecord {
  typeText: string
  color: string
  categoryName: string
  recordNameId?: string
}

export interface IRecords {
  [key: string]: IRecord
}

export interface IRecordsState {
  records: IRecords | null
  record?: IRecord
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
