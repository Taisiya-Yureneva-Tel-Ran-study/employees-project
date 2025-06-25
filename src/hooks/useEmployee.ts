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
        minSalary: query.salaryFrom,
        maxSalary: query.salaryTo,
        birthdateFrom: (query.ageTo ? getDateFromAge(query.ageTo) : null),
        birthDateTo: (query.ageFrom ? getDateFromAge(query.ageFrom) : null),
    }}

    const qryKey: any[] = ['employees'];
    qryKey.push(config);

    console.log("query key", qryKey);
    
    return useQuery<Employee[], Error>({
        queryKey: qryKey,
        queryFn: async () => apiClient.getAll(config),
        staleTime: 3600 * 1000 * 24
    });
}