import React, {createContext, useContext, useState, useEffect} from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0 );
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    // CART CHECK
    const onAdd = (product, quantity) => {
        
        // Check if item is already in cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id );

        // 
        if (checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity 
                    }
                }
            })

            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity; 
            setCartItems([...cartItems, {...product}])

            setTotalQuantities
        }
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        toast.success(`${qty} ${product.name} added to the cart`);

    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);

        const newCartItems = [...cartItems];

        // EXPERIMENTAL
        // const editNewCartItems = cartItems.splice(index,-1,{...foundProduct, quantity: foundProduct.quantity + 1})

        
        if(value === 'inc') {

            // EXPERIMENTAL
            // setCartItems(editNewCartItems);

            // LEGACY
            // setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            
            foundProduct.quantity += 1
            newCartItems[index] = foundProduct
            setCartItems(newCartItems);

            setTotalPrice((prevTotalPrice) =>   prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) =>   prevTotalQuantities + 1)
        }
        else if (value === 'dec') {
            if( foundProduct.quantity > 1 ) {

                // setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                
            foundProduct.quantity -= 1
            newCartItems[index] = foundProduct
            setCartItems(newCartItems);

                setTotalPrice((prevTotalPrice) =>   prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) =>   prevTotalQuantities - 1)
            }
        }
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);

        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);

        setCartItems(newCartItems)

        setTotalPrice((prevTotalPrice) =>   prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities) =>   prevTotalQuantities - foundProduct.quantity)
    }

    // QUANTITY CHECK
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) {return 1;} 
            return prevQty - 1});
    }



return (
    <Context.Provider
        value={{
            // Product Page
            showCart, cartItems, totalPrice, totalQuantities, qty,
            incQty, decQty,
            onAdd,
            
            // Cart 
            setShowCart, cartItems, 
            toggleCartItemQuantity,
            onRemove,
        }}
    >
        {children}
    </Context.Provider>
)
}

export const useStateContext = () => useContext(Context); 