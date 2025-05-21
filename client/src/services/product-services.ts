import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Product {
    id: string; 
    productName?: string;
    productCode?: string;
    description?: string;
    productBrand?:string;
    quantity?: number;
    sku?: string;
    price?: number;
    supplier?: number;
    category?: number;     
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_PRODUCTS

const productServices = {

    addNewProduct: async (newProduct: Product) => {
        const response = await axios.post(API_BASE_URL, newProduct);
        return response.data;
    },

     getAllProducts: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getProductById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentProduct: async (currentProduct: Product, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentProduct);
        return response.data;
    },
  
    deleteProduct: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },

};

// React Query Hooks
export const useAddNewProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newProduct: Product) => productServices.addNewProduct(newProduct),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
};

export const useGetAllProducts = () => {
    return useQuery( 
      { queryKey: ['products'], queryFn: productServices.getAllProducts });
};

export const useGetProductById = (id: string) => {
    return useQuery(
      { queryKey: ['product', id], queryFn: () => productServices.getProductById(id) });
}

export const useUpdateProduct = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentProduct: Product) => productServices.updateCurrentProduct(currentProduct, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['product', id] });
      },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => productServices.deleteProduct(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
};

export default productServices;

