import { client, urlFor } from '../../lib/client'
import React, {useState} from 'react'
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from "react-icons/ai"

import {Product} from "../../components"

import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({product, products}) => {
    
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0);
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();
    

    return (
    <div>
        <div className='product-detail-container'>
            <div>
            <div className="image-container"> 
                <img src={urlFor(image && image[index] ? image[index] :      image[0] )} className='product-detail-image' />
            </div>
            <div className='small-images-container'>
                {image?.map((item, i) => (
                   <img src={urlFor(item)} className={i === index ? "small-image selected-image" : "small-image"} onMouseEnter={() => setIndex(i) }/> 
                ))}
            </div>
            </div>


            <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiOutlineStar/>
                <p>(20)</p>
            </div>

            <div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
            </div>
            <div className='quantity' >
                <h3>Quantity</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}>
                        <AiOutlineMinus/>
                    </span>
                    <span className='num' >
                        {qty}
                    </span>
                    <span className='plus' onClick={incQty}>
                        <AiOutlinePlus/>
                    </span>
                </p>
            </div>
            <div className='buttons'>
                <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to cart</button>
                <button type='button' className='buy-now' onClick={() => {onAdd(product, qty);  setShowCart(true);}}>Buy Now</button>
            </div>
        </div>

    </div>
       
    <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
            <div className='track maylike-products-container'>
                {products.map((item) => (
                    <Product key={item._id} product={item}/>
                ))}
            </div>
        </div>
    </div>   
    
    </div>

    
        
  )
}


export const getStaticProps = async ({params: {slug}}) => {
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const product = await client.fetch(productQuery);
    
    const productsQuery = `*[_type == "product"]`
    const products = await client.fetch(productsQuery); 
    
    // console.log(product);
    
    return {
      props: {product, products}
    }
  }



export const getStaticPaths = async () => {
    const query = `*[_type == "products"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths, 
        fallback: 'blocking'
    }
}

export default ProductDetails
