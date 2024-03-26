import { httpClient } from "@/http"


export const getCheckpointsInADay = async function(eventId, teamId, checkpointDateInUtc) {
    return httpClient.get(`checkpoint/get-day-checkpoints/${eventId}/${teamId}/${checkpointDateInUtc}`)
}