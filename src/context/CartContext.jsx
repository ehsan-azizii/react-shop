import { createContext, useState,useContext } from "react";
import SnackbarContext from "./SnackbarContext";
const CartContext=createContext();


export function  CartProvider({children}){
    const [cart,setCart]=useState([]);
    const {showSnackbar}=useContext(SnackbarContext)
    


    function addToCart(product){
        console.log(cart)
        const existingProduct = cart.find(
        (item) => item.id === product.id
        );
        // !undefined=true
        if (!existingProduct){
            setCart([
                ...cart,
                {
                    ...product,
                    quantity:1,
                }
            ])
        }
        else{
            const newCart = cart.map((item)=>{
                if (item.id===product.id){
                    return{
                        ...item,
                        quantity:item.quantity+1,
                    };
                }
                return item;
            })
            setCart(newCart)
        }
        showSnackbar(`${product.name} added to cart`,"success")

    }
    function decreaseQuantity(id) {
    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct.quantity === 1) {
        setCart(cart.filter((item) => item.id !== id));
        return;
    }

    const newCart = cart.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                quantity: item.quantity - 1,
            };
        }

        return item;
    });

    setCart(newCart);
}
   function removeFromCart(id){
        setCart(cart.filter((item) => item.id !== id));
        showSnackbar("item removed from cart","success")
   }
    return(
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQuantity,
                removeFromCart,


            }}
        >
        {children}
        </CartContext.Provider>
    )

}
export default CartContext;