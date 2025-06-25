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
    setDepartment: (dept) => {
        set((state) => { return (state.department === dept ? state : {...state, department: dept}) });
    },
    setSalaryFrom: (salaryFrom) => set((state) => {return (state.salaryFrom === salaryFrom) ? state : {...state, salaryFrom} }),
    setSalaryTo: (salaryTo) => set((state) => { return (state.salaryTo === salaryTo) ? state : {...state, salaryTo} }),
    setAgeFrom: (ageFrom) => set((state) => {
        return (state.ageFrom === ageFrom ? state : { ...state, ageFrom })}),
    setAgeTo: (ageTo) => set((state) => { return (state.ageTo === ageTo ? state : { ...state, ageTo })}),
}))

export default useEmployeeFilters;