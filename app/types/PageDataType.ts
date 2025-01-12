import { ProductType } from "./ProductType"

export interface PageDataType {
  horizontalProductList: ProductType[]
  productList: ProductType[]
  nextUrl: string | null
  error: string | null
}
