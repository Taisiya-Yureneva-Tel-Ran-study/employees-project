import { useQuery } from "@tanstack/react-query";
import apiClient  from "../services/ApiClientJsonServer";
import { Employee } from "../model/dto-types";
import useEmployeeFilters from "../state-management/store";
import { AxiosRequestConfig } from "axios";
import { getDateFromAge } from "../util/functions";

export default function useEmployee() {
    const query = useEmployeeFilters();
    
    const config: AxiosRequestConfig = {params: {
        department: query.department,
        salary_gte: query.salaryFrom,
        salary_lte: query.salaryTo,
        birthDate_gte: (query.ageTo ? getDateFromAge(query.ageTo) : null),
        birthDate_lte: (query.ageFrom ? getDateFromAge(query.ageFrom) : null),
    }}

    const qryKey: any[] = ['employees'];
    qryKey.push(config);

    return useQuery<Employee[], Error>({
        queryKey: qryKey,
        queryFn: async () => apiClient.getAll(config),
        staleTime: 3600 * 1000 * 24
    });
}