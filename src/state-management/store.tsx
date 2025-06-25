import { create } from 'zustand'

interface EmployeeFilters {
    department: string | null;
    salaryFrom: number | null;
    salaryTo: number | null;
    ageFrom: number | null;
    ageTo: number | null;
    setDepartment: (department: string | null) => void;
    setSalaryRange: (salaryFrom: number | null, salaryTo: number | null) => void;
    setAgeRange: (ageFrom: number | null, ageTo: number | null) => void;
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
    setSalaryRange: (salaryFrom, salaryTo) => set((state) => { return (state.salaryFrom === salaryFrom && state.salaryTo === salaryTo ? state : { ...state, salaryFrom, salaryTo })}),
    setAgeRange: (ageFrom, ageTo) => set((state) => { return (state.ageFrom === ageFrom && state.ageTo === ageTo ? state : { ...state, ageFrom, ageTo })}),
}))

export default useEmployeeFilters;