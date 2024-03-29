import { httpClient } from "@/http"
import { getMyTimeZone } from "@/utils/date"

export function getRunningEvents() {
    return httpClient.post("/event/get-running-events", {
        timezone: getMyTimeZone()
    }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}


export function getScheduledEvents() {
    return httpClient.post("/event/get-scheduled-events", {
        timezone: getMyTimeZone()
    }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}


export function finishAnEvent(eventInfo, evaluation) {
    console.log("EVAL", evaluation)
    return httpClient.post("/event/finish", {eventInfo, evaluation}, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}


export function callCreateEvent(form) {
    return httpClient.post("/event/create", {...form, timezone: getMyTimeZone()})
}


export function checkIsMember(teamId, eventId) {
    return httpClient.get(`/event/is-member/${teamId}/${eventId}`)
}


export function joinRequest(teamId, eventId) {
    return httpClient.get(`/event/join-request/${teamId}/${eventId}`)
}


