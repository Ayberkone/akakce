import React from "react"
import { Link } from "@remix-run/react"
import type { ProductType } from "~/types"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import styles from '~/styles/HorizontalProductList.module.scss'

interface HorizontalProductListProps {
  products: ProductType[] | undefined
}

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        className="w-full h-auto"
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50
          }
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.code} className={styles.slide}>
            <div className={styles.productContainer}>
              <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.mkName} className={styles.productImage} />
                {product?.dropRatio ? <div className={styles.dropRatio}>%{product?.dropRatio}</div> : null}
              </div>
              <div className={styles.productInfo}>
                <Link to={`/product-detail/${product.code}`} className={styles.productTitle}>
                  <h3>{product.name}</h3>
                </Link>
                <div>
                  <p className={styles.productPrice}>{product.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}</p>
                  {product.countOfPrices ? <p>{product.countOfPrices} satıcı {">"}</p> : ''}
                </div>
                {product.followCount ? <p>{product.followCount}+ takip</p> : ''}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HorizontalProductList