import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'

import { client } from '../lib/client'

const Home = ({products, banners}) => {
  return (
    <>
      <div className='heroBanner'>
          <HeroBanner heroBanner={banners.length && banners[0]}/>
          {/* {console.log(banners)} */}
      </div>
      <div className="products-heading">
          <h2>Best Sellers</h2>
          <p>Highest Selling Items To Turn The Tides</p>
      </div>
      <div className='products-container'>
        {products.map((product) => <Product key={product._id} product={product}/>)}
      </div>

      <div className='footer'>
        <FooterBanner FooterBanner={banners.length && banners[0]}/>
      </div>
    </>
  )
}
export default Home

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  return {
    props: {products, banners}
  }
}