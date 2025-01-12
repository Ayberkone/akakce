import React from "react"
import { Link } from "@remix-run/react"
import type { ProductType } from "~/types"
import styles from "~/styles//VerticalProductList.module.scss"

interface VerticalProductListProps {
	products: ProductType[] | undefined
}

const VerticalProductList: React.FC<VerticalProductListProps> = ({ products }) => {
	if (!products || products?.length === 0) {
		return null
	}

	return (
		<div className={styles.productListContainer}>
			{products.map((product) => (
				<Link to={`/product-detail/${product.code}`}>
					<div key={product.code} className={styles.productCard}>
						<div className={styles.productImageContainer}>
							{product?.dropRatio ? <div className={styles.discount}>%{product.dropRatio}</div> : null}
							<img src={product.imageUrl} alt={product.name} className={styles.productImage} />
						</div>
						<h3 className={styles.productName}>{product.name}</h3>
						<p className={styles.productPrice}>{product.price.toLocaleString('tr-TR', {
							style: 'currency',
							currency: 'TRY'
						})}</p>
						{product?.countOfPrices ? <p className={styles.sellerInfo}>{product.countOfPrices} satıcı {">"}</p> : null}
						{product?.followCount ? <p className={styles.followerInfo}>{product.followCount}+ takip</p> : null}
					</div>
				</Link>
			))}
		</div>
	)
}

export default VerticalProductList