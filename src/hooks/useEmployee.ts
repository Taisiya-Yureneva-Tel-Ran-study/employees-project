import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/ApiClientJsonServer";
import { Employee, SearchObject } from "../model/dto-types";
import useEmployeeFilters from "../state-management/store";
import _ from "lodash";

export default function useEmployee() {
    const { department, salaryFrom, salaryTo, ageFrom, ageTo } = useEmployeeFilters();

    let searchObject: SearchObject | undefined = {};

    department && (searchObject.department = department);
    salaryFrom && (searchObject.minSalary = salaryFrom);
    salaryTo && (searchObject.maxSalary = salaryTo);
    ageFrom && (searchObject.minAge = ageFrom);
    ageTo && (searchObject.maxAge = ageTo);
    if (_.isEmpty(searchObject)) {
        searchObject = undefined
    }

    const qryKey: any[] = ['employees'];
    qryKey.push(searchObject);

    return useQuery<Employee[], Error>({
        queryKey: qryKey,
        queryFn: async () => apiClient.getAll(searchObject),
        staleTime: 3600 * 1000 * 24
    });
}