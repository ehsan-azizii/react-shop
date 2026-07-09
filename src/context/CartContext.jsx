import { createContext, useState } from "react";
const CartContext=createContext();

export function  CartProvider({children}){
    const [cart,setCart]=useState([]);
    const [snackbarOpen,setSnackbarOpen]=useState(false);
    const [snackbarMessage,setSnackbarMessage]=useState("");


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
        setSnackbarMessage(`${product.name} added to cart`);
        setSnackbarOpen(true);

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
        setSnackbarMessage("item removed from cart");
        setSnackbarOpen(true);
   }
    return(
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                snackbarOpen,
                setSnackbarOpen,
                snackbarMessage,
                decreaseQuantity,
                removeFromCart,


            }}
        >
        {children}
        </CartContext.Provider>
    )

}
export default CartContext;