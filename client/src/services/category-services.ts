import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Category {
    id: string;
    categoryName?: string;
    categoryCode?: string;
    categoryDescription?: string;
    categoryStatus?: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_CATEGORIES
;
const categoryServices = {

    addNewCategory: async (newCategory: Category) => {
        const response = await axios.post(API_BASE_URL, newCategory);
        return response.data;
    },

    getAllCategories: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getCategoryById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentCategory: async (currentCategory: Category, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentCategory);
        return response.data;
    },
  
    deleteCategory: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newCategory: Category) => categoryServices.addNewCategory(newCategory),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
};

export const useGetAllCategories = () => {
    return useQuery( 
      { queryKey: ['categories'], queryFn: categoryServices.getAllCategories });
}

export const useGetCategoryById = (id: string) => {
    return useQuery(
      { queryKey: ['category', id], queryFn: () => categoryServices.getCategoryById(id) });
}

export const useUpdateCategory = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentCategory: Category) => categoryServices.updateCurrentCategory(currentCategory, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category', id] });
      },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => categoryServices.deleteCategory(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
};

export default categoryServices

