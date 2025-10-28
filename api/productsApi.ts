import { API_BASE_URL } from "../config/index.js";
import { Product } from "../types/index.ts";

export const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/products?limit=100`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!res.ok) throw new Error(`Failed to fetch products for category ${category}`);
    const data = await res.json();
    return data.products;
};

// Simulated DELETE
export const deleteProduct = async (productId: number): Promise<{ isDeleted: boolean }> => {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
};
