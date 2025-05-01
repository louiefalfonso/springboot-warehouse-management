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



export default supplierServices


