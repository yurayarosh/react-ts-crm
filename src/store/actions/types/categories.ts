export interface ICategory {
  id: string
  name: string
  limit: number | string
  spent?: number
}

export interface ICategories {
  [key: string]: ICategory
}

export interface ActionCategories {
  type: string
  categories?: ICategories | null
  category?: ICategory
  categoryName?: any
  error?: string
}

export interface ICategoriesState {
  categories: ICategories | null
  error?: string
}

export interface ICreateCategoryResponse {
  name: string
}
