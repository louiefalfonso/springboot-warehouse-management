import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Supplier {
    id: string; 
    supplierName?: string;
    supplierCode?: string;
    supplierCompany?:string;
    supplierEmail?: string;
    contactInfo?: string;
    status?: string;
    contactAddress?: string;   
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_SUPPLIERS;

const supplierServices = {

    addNewSupplier: async (newSupplier: Supplier) => {
        const response = await axios.post(API_BASE_URL, newSupplier);
        return response.data;
    },

    getAllSuppliers: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getSupplierById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentSupplier: async (currentSupplier: Supplier, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentSupplier);
        return response.data;
    },
  
    deleteSupplier: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newSupplier: Supplier) => supplierServices.addNewSupplier(newSupplier),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      },
    });
};

export const useGetAllSuppliers = () => {
    return useQuery( 
      { queryKey: ['suppliers'], queryFn: supplierServices.getAllSuppliers });
};

export const useGetSupplierById = (id: string) => {
    return useQuery(
      { queryKey: ['supplier', id], queryFn: () => supplierServices.getSupplierById(id) });
}

export const useUpdateSupplier = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentSupplier: Supplier) => supplierServices.updateCurrentSupplier(currentSupplier, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supplier', id] });
      },
    });
};

export const useDeleteSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => supplierServices.deleteSupplier(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      },
    });
  };

export default supplierServices


