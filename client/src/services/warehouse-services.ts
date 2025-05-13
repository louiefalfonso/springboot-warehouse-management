import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Warehouse {
    id: string;
    warehouseName?: string;
    warehouseCode?: string;
    officeHours?: string;
    warehouseLocation?: string;
    warehouseManager?: string;
    contactNumber?: string;
    description?: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_WAREHOUSES;

const warehouseServices = {

    addNewWarehouse: async (newWarehouse: Warehouse) => {
        const response = await axios.post(API_BASE_URL, newWarehouse);
        return response.data;
    },

    getAllWarehouses: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getWarehouseById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentWarehouse: async (currentWarehouse: Warehouse, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentWarehouse);
        return response.data;
    },

    deleteWarehouse: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewWarehouse = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newWarehouse: Warehouse) => warehouseServices.addNewWarehouse(newWarehouse),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      },
    });
};

export const useGetAllWarehouses = () => {
    return useQuery( 
      { queryKey: ['warehouses'], queryFn: warehouseServices.getAllWarehouses });
};

export const useGetWarehouseById = (id: string) => {
    return useQuery(
      { queryKey: ['warehouse', id], queryFn: () => warehouseServices.getWarehouseById(id) });
}

export const useUpdateWarehouse = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentWarehouse: Warehouse) => warehouseServices.updateCurrentWarehouse(currentWarehouse, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['warehouse', id] });
      },
    });
};

export const useDeleteWarehouse = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => warehouseServices.deleteWarehouse(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      },
    });
};

export default warehouseServices