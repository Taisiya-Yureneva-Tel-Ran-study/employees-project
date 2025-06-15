import { useQuery } from "@tanstack/react-query";
import ApiClientJsonServer from "../services/ApiClientJsonServer";
import { Employee } from "../model/dto-types";

const jsonClient = new ApiClientJsonServer;

export default function useEmployee() {
    return useQuery<Employee[], Error>({
        queryKey: ['employees'],
        queryFn: async () => jsonClient.getAll(),
        staleTime: 3600 * 1000 * 24
    });
}