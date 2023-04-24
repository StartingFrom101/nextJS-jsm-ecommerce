import Link from 'next/link'
import React, {useRef} from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineDelete, } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'






function cart() {
const cartRef = useRef();
const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();

// toggleCartItemQuantity("1", 'inc');

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading'
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>

        </button>

        {cartItems.length < 1 && (
          <>
            <h3>Your shopping bag is empty </h3>
          </>
        )}

        <div className='product-container'> 

        {/* Cart Items Mapping */}
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id} >
              <img src={urlFor(item?.image[0])} alt="" className='cart-product-image' />
              <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <p className='quantity-desc'>
                    <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinus/>
                    </span>
                    <span className='num' >
                        {item.quantity}
                    </span>
                    <span className='plus' onClick={() => toggleCartItemQuantity(item._id , 'inc')}>
                        <AiOutlinePlus/>
                    </span>
                  </p>
                <button type='button' className='remove-item' onClick={() => onRemove(item._id)}><AiOutlineDelete/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >=1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <button className='btn' type='button' onClick={() => alert("End of Demo!")}>Check Out</button>  
          </div>
        )}
      </div>
    </div>
  )
}

export default cart