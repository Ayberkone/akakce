import { useState } from "react"
import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { ProductType } from "~/types"
import { getProduct } from "~/services/productService"
import styles from "~/styles/ProductDetail.module.scss"
import Rating from "~/components/Rating"

export const loader: LoaderFunction = async ({ params }) => {
  const productId = parseInt(params.productId ?? "0")
  const product = await getProduct(productId)
  return product
}

export default function ProductDetail() {
  const product = useLoaderData<ProductType>()
  const [selectedCapacity, setSelectedCapacity] = useState(product?.storageOptions?.[0] || '')

  if (!product) {
    return <div>Ürün bulunamadı.</div>
  }

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productHeader}>
        <h1 className={styles.productName}>{product?.name}</h1>
        <div className={styles.rating}>
          <Rating rating={product.rating ?? 0} />
        </div>
        {product?.badge && <div className={styles.badge}>{product?.badge}</div>}
      </div>
      <div className={styles.productImageContainer}>
        <img src={product?.imageUrl} alt={product?.name} className={styles.productImage} />
      </div>
      {product?.storageOptions?.length &&
        <div className={styles.capacityOptions}>
          Kapasite seçenekleri:
          <div className={styles.capacityButtons}>
            {product.storageOptions.map((capacity) => (
              <button
                key={capacity}
                onClick={() => setSelectedCapacity(capacity)}
                className={styles.capacityButton + ' ' + (capacity.includes(selectedCapacity) ? styles.capacityButtonSelected : '')}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
      }
      <div className={styles.priceAndShipping}>
        <div className={styles.sellerCount}>{product?.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat seçeneği</div>
        <div className={styles.price}>
          {product?.price.toLocaleString('tr-TR', {
            style: 'currency',
            currency: 'TRY'
          })}
        </div>
        {product?.freeShipping && <div className={styles.freeShipping}>Ücretsiz kargo</div>}
      </div>
      {product?.lastUpdate && <div className={styles.lastUpdate}>Son güncelleme: {product?.lastUpdate}</div>}
    </div>
  )
}