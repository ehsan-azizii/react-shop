import { createContext, useState, useContext,useEffect } from "react";
import SnackbarContext from "./SnackbarContext";
import {getCart, addCartItem,removeCartItem} from "../api/cartApi"
import AuthContext from "./AuthContext";
const CartContext=createContext();


export function  CartProvider({children}){
    const [cart,setCart]=useState([]);
    const {showSnackbar}=useContext(SnackbarContext)
    const {isAuthenticated}=useContext(AuthContext)
    useEffect(()=>{
        async function loadCart(){
            try{
                const data= await getCart();
                console.log("cart from api:" ,data)
                setCart(data.items)
            }
            catch (error){
                console.log("cart err",error)
            }
        }
        if (isAuthenticated){
            loadCart()
        }else{
            setCart([])
        }
        console.log("Auth status",isAuthenticated)
    },[isAuthenticated])
    
   async function addToCart(product) {
    if (!isAuthenticated){
        showSnackbar("please login to add product to cart","error")
        return;
    }
    try {
        const data = await addCartItem(product.id);

        console.log("ADD CART:", data);

        setCart(data.items);

        showSnackbar(
            `${product.name} added to cart`,
            "success"
        );

    } catch (error) {
        console.log("add cart error:", error);
        showSnackbar(
            "Could not add product to cart",
            "error"
        );
    }
}
    async function decreaseQuantity(item) {
    try {
        const data = await removeCartItem(
            item.product_details.id
        );

        console.log("REMOVE CART ITEM:", data);

        setCart(data.items);

    } catch (error) {
        console.log("remove cart error:", error);

        showSnackbar(
            "Could not decrease product quantity",
            "error"
        );
    }
}
   async function deleteCartItem(item) {
    try {
        const data = await removeCartItem(
            item.product_details.id,
            item.quantity
        );

        console.log("DELETE CART ITEM:", data);

        setCart(data.items);

        showSnackbar(
            `${item.product_details.name} removed from cart`,
            "success"
        );

    } catch (error) {
        console.log("delete cart item error:", error);

        showSnackbar(
            "Could not remove item from cart",
            "error"
        );
    }
}
    return(
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQuantity,
                deleteCartItem,


            }}
        >
        {children}
        </CartContext.Provider>
    )

}
export default CartContext;