import api from "./apiClient"

export async function getProducts(params){
    const response = await api.get("/products/",
    {
        params,
    });
    return response.data;
}
export async function getProduct(id) {
    const response = await api.get(`/products/${id}/`);

    return response.data;
}
export async function getCategories() {
    const response = await api.get("/categories/");
    return response.data;
}