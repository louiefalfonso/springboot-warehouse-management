import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Inventory {
    id: string;
    inventoryCode?: string;
    quantity?: number;
    value?: string;
    location?: string;
    reorderPoint?: number;
    unitCost?: number;
    remarks?: string;
    inventoryManager?: string;
    product?: number;
    warehouse?: number;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_INVENTORIES

const inventoryServices = {

    addNewInventory: async (newInventory: Inventory) => {
        const response = await axios.post(API_BASE_URL, newInventory);
        return response.data;
    },


     getAllInventories: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getInventoryById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentInventory: async (currentInventory: Inventory, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentInventory);
        return response.data;
    },
  
    deleteInventory: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewInventory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newInventory: Inventory) => inventoryServices.addNewInventory(newInventory),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['inventories'] });
      },
    });
};

export const useGetAllInventories = () => {
    return useQuery( 
      { queryKey: ['inventories'], queryFn: inventoryServices.getAllInventories });
};


export const useGetInventoryById = (id: string) => {
    return useQuery(
      { queryKey: ['inventory', id], queryFn: () => inventoryServices.getInventoryById(id) });
}

export const useUpdateInventory = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentInventory: Inventory) => inventoryServices.updateCurrentInventory(currentInventory, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['inventory', id] });
      },
    });
};

export const useDeleteInventory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => inventoryServices.deleteInventory(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['inventories'] });
      },
    });
};


 export default inventoryServices

 