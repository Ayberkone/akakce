import { MetaFunction, LoaderFunction, redirect } from "@remix-run/node"
import { Link, useLoaderData, useSearchParams } from "@remix-run/react"
import HorizontalProductList from "~/components/HorizontalProductList"
import VerticalProductList from "~/components/VerticalProductList"
import { getProducts } from "~/services/productService"
import styles from '~/styles/app.scss'

export const meta: MetaFunction = () => {
  return [
    { title: "banayeni" },
    { name: "banayeni", content: "Akakce'den banayeni" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url)
    const page = url.searchParams.get("page") || "1"
    const pageNumber = Number(page)
    const data = await getProducts(pageNumber)
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    return { horizontalProductList: [], productList: [], nextUrl: null, error: "Veri yüklenirken bir hata oluştu." }
  }
}

export default function Index() {
  const { data, page } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  if (data?.error) {
    return <div>{data.error}</div>
  }

  const handlePagination = (flag: boolean) => setSearchParams({ page: String(flag ? currentPage + 1 : currentPage - 1) })

  return (
    <div>
      <HorizontalProductList products={data?.horizontalProductList} />
      <VerticalProductList products={data?.productList} />
      {page > 1 && <button onClick={() => handlePagination(false)}>Onceki Sayfa</button>}
      {data.nextUrl && <button onClick={() => handlePagination(true)}>Sonraki Sayfa</button>}
    </div>
  )
}

