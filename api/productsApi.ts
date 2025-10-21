import { API_BASE_URL } from "../config";

export const fetchAllProducts = async () => {
    const res = await fetch(`${API_BASE_URL}/products?limit=100`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products;
};

export const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
};

export const fetchProductsByCategory = async (category: string) => {
    const res = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!res.ok) throw new Error(`Failed to fetch products for category ${category}`);
    const data = await res.json();
    return data.products;
};

// Simulated DELETE
export const deleteProduct = async (productId: number) => {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    const data = await res.json();
    return data.isDeleted; // The API returns an object with isDeleted
};
