
const API_URL = "https://fakestoreapi.com";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
        throw new Error("Unable to fetch products");
    }

    return await response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error("Unable to fetch product details");
    }

    return await response.json();
}

export async function getCategories() {
    const response = await fetch(`${API_URL}/products/categories`);

    if (!response.ok) {
        throw new Error("Unable to fetch categories");
    }

    return await response.json();
}
