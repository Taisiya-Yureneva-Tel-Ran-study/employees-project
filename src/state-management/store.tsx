import { create } from 'zustand'

interface EmployeeFilters {
    department: string | null;
    salaryFrom: number | null;
    salaryTo: number | null;
    ageFrom: number | null;
    ageTo: number | null;
    setDepartment: (department: string | null) => void;
    setSalaryFrom: (salaryFrom: number | null) => void;
    setSalaryTo: (salaryTo: number | null) => void;
    setAgeFrom: (ageFrom: number | null) => void;
    setAgeTo: (ageTo: number | null) => void;
}

const useEmployeeFilters = create<EmployeeFilters>(set => ({
    department: null,
    salaryFrom: null,
    salaryTo: null,
    ageFrom: null,
    ageTo: null,
    setDepartment: (department) => set({ department }),
    setSalaryFrom: (salaryFrom) => set({ salaryFrom }),
    setSalaryTo: (salaryTo) => set({ salaryTo }),
    setAgeFrom: (ageFrom) => set({ ageFrom }),
    setAgeTo: (ageTo) => set({ ageTo })
}))

export default useEmployeeFilters;