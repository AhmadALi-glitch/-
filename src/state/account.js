import { createContext } from "react";


export const accountContext = createContext(localStorage.getItem('emerald-user'))
export const accountReducerContext = createContext(null)
