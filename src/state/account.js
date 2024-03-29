import { createContext } from "react";


export const accountContext = createContext({name: 'no name', email: 'no email', team_id: null, isTeamLeader: false})
export const accountReducerContext = createContext(null)
