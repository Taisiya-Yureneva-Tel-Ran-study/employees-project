import { create } from 'zustand'
import { UserData } from '../services/AuthClient';

interface EmployeeFilters {
    department: string | null;
    salaryFrom: number | null;
    salaryTo: number | null;
    ageFrom: number | null;
    ageTo: number | null;
    setDepartment: (department: string | null) => void;
    setAgeFrom: (ageFrom: number | null) => void;
    setAgeTo: (ageTo: number | null) => void;
    setSalaryFrom: (salaryFrom: number | null) => void;
    setSalaryTo: (salaryTo: number | null) => void;
    setSalaryRange: (salaryFrom: number | null, salaryTo: number | null) => void;
    setAgeRange: (ageFrom: number | null, ageTo: number | null) => void;
}

interface AuthData {
    userData: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
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
    setSalaryFrom: (salaryFrom) => set((state) => { return (state.salaryFrom === salaryFrom ? state : { ...state, salaryFrom })}),
    setSalaryTo: (salaryTo) => set((state) => { return (state.salaryTo === salaryTo ? state : { ...state, salaryTo })}),
    setAgeFrom: (ageFrom) => set((state) => { return (state.ageFrom === ageFrom ? state : { ...state, ageFrom })}),
    setAgeTo: (ageTo) => set((state) => { return (state.ageTo === ageTo ? state : { ...state, ageTo })}),
    setSalaryRange: (salaryFrom, salaryTo) => set((state) => { return (state.salaryFrom === salaryFrom && state.salaryTo === salaryTo ? state : { ...state, salaryFrom, salaryTo })}),
    setAgeRange: (ageFrom, ageTo) => set((state) => { return (state.ageFrom === ageFrom && state.ageTo === ageTo ? state : { ...state, ageFrom, ageTo })}),
}))

export const useAuthData = create<AuthData>(set => ({
    userData: null,
    login: (userData) => set((state) => { return (state.userData === userData ? state : { ...state, userData })}),
    logout: () => set((state) => { return (state.userData === null ? state : { ...state, userData: null })})
}))

export default useEmployeeFilters;

interface PagerData {
    count: number;
    page: number;
    setCount: (count: number) => void;
    setPage: (page: number) => void;
}

export const usePagerData = create<PagerData>(set => ({
    count: 0,
    page: 1,
    setCount: (count) => set({ count } ),
    setPage: (page) => set({ page })
}))
