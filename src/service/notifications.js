import { httpClient } from "@/http"


export const getEventJoinRequests = function() {
    return httpClient.get("/event/received-join-requests")
}


export const getTeamJoinRequests = function() {
    return httpClient.get("/team/received-join-requests")
}

