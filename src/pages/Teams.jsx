import { getAllTeams } from "@/service/teams"
import { useEffect, useState } from "react"
import TeamCard from "./TeamCard"


export default function Teams() {

    let [teams, setTeams] = useState()
    let [loadingTeams, setLoadingTeams] = useState(true)

    useEffect(() => {

        getAllTeams().then((res) => {
            console.log(res)
            setLoadingTeams(false)
            setTeams(res.data)
        })

    }, [])


    return (
        <>
        { loadingTeams ? 'loading' : teams.map((t) => {
            return <TeamCard teamData={t}></TeamCard>
        }) } 
        </>
    )

}
