import { httpClient } from "@/http";
import { getMyTimeZone } from "@/utils/date";

export function getAllTeams() {
    return httpClient.get("/team")
}

export function getTeamInfo(teamId) {
    return httpClient.get(`/team/${teamId}/${getMyTimeZone().replace('/', '-')}`)
}
