import { Employee } from "../model/dto-types";
import ApiClient, { Updater } from "./ApiClient";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000/employees";

let axiosIstance = axios.create({
    baseURL: BASE_URL, // "http://localhost:3000/employees"
})

class ApiClientJsonServer implements ApiClient {
    setToken(token: string): void {
        axiosIstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
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
    async getAll(params?: AxiosRequestConfig): Promise<Employee[]> {
        console.log("getAll with params", params)
        const res = await axiosIstance.get<Employee[]>("/", params);
        return res.data;
    }
    
}
const apiClient = new ApiClientJsonServer();
export default apiClient