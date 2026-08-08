import api from "./apiClient"

export async function getCart() {
    const {data}=await api.get("/cart/")
     return data
}
export async function addCartItem (productId,quantity=1){
    const {data} = await api.post("/cart/add_item/", {
        product_id: productId,
        quantity,

    }
);

 return data;   

}
export async function removeCartItem(productId, quantity = 1) {
    const { data } = await api.post("/cart/remove_item/", {
        product_id: productId,
        quantity,
    });

    return data;
}