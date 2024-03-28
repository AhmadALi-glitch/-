import { createContext } from "react";


export const accountContext = createContext({name: 'no name', email: 'no email'})
export const accountReducerContext = createContext(null)
