import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Category {
    id: string;
    categoryName?: string;
    categoryCode?: string;
    categoryDescription?: string;
    product?: number;
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

export default categoryServices

