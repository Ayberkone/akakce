import { SellerType } from "./SellerType"

export interface ProductType {
  code: number
  mkName?: string
  name: string
  productName: string
  price: number
  url: string
  imageUrl: string
  badge?: string
  rating?: number
  description?: string
  dropRatio?: number
  countOfPrices?: number
  followCount?: number
  sellers?: SellerType[]
  storageOptions?: string[]
  freeShipping?: boolean
  lastUpdate?: string
}
