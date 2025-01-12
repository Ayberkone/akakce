import { PageDataType, ProductType } from "~/types"
import { ProductResponseType } from "~/types/ProductResponseType"

export const getProducts = async (page: number): Promise<ProductResponseType> => {
	let data: PageDataType = { horizontalProductList: [], productList: [], nextUrl: null, error: '' }
  try {
    const pageUrl = `https://mock.akakce.dev/page${page < 2 ? "" : page}.json`
    const response = await fetch(pageUrl)
    if (!response.ok) {
      if (response.status === 404) {
				data.error = 'Sayfa Bulunamadı.'
        return { data }
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = await response.json()
    return { data, page }
  } catch (error) {
    console.error("Error fetching data:", error)
		data.error = 'Veri yüklenirken bir hata oluştu.'
    return { data }
  }
}

export const getProduct = async (code: number): Promise<ProductType | null> => {
    try {
        const productUrl = `https://mock.akakce.dev/product${code}.json`
        const response = await fetch(productUrl)
        if (!response.ok) {
            return null
        }
        const product: ProductType = await response.json()
        return product
    } catch (error) {
        console.error("Error fetching product:", error)
        return null
    }
}
