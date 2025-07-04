import { Employee, SearchObject } from "../model/dto-types";
import { getDateFromAge } from "../util/functions";
import ApiClient, { Updater } from "./ApiClient";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000/employees";

let axiosIstance = axios.create({
    baseURL: BASE_URL, 
})

class ApiClientJsonServer implements ApiClient {
    setToken(token: string): void {
        console.log("setToken", token);
        axiosIstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    async getEmployee(id: string): Promise<Employee> {
         const res = await axiosIstance.get<Employee>(`/${id}`);
         return res.data;
    }
    async addEmployee(empl: Employee): Promise<Employee> {
        empl.userId = "ADMIN";
        const res = await axiosIstance.post<Employee>('/', empl);
        return res.data;
    }
    async deleteEmployee(id: string): Promise<Employee> {
        const res = await axiosIstance.delete<Employee>(`/${id}`);
        return res.data;
    }
    async updateEmployee(updater: Updater): Promise<Employee> {
        console.log(updater);
        const res = await axiosIstance.patch<Employee>(`/${updater.id}`, updater.fields);
        return res.data
    }
    async getAll(params?: SearchObject): Promise<Employee[]> {
        const config: AxiosRequestConfig = {params: {
            department: params?.department,
            salary_gte: params?.minSalary,
            salary_lte: params?.maxSalary,
            birthDate_lte: (params?.minAge ? getDateFromAge(params?.minAge) : null),
            birthDate_gte: (params?.maxAge ? getDateFromAge(params?.maxAge) : null),
        }}

        console.log("getAll with params", params, config);

        const res = await axiosIstance.get<Employee[]>("/", config);
        return res.data;
    }
    
}
const apiClient = new ApiClientJsonServer();
export default apiClient