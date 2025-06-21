import { useQuery } from "@tanstack/react-query";
import apiClient  from "../services/ApiClientJsonServer";
import { Employee } from "../model/dto-types";

export default function useEmployee() {
    return useQuery<Employee[], Error>({
        queryKey: ['employees'],
        queryFn: async () => apiClient.getAll(),
        staleTime: 3600 * 1000 * 24
    });
}