import { httpClient } from "@/http"
import { getMyTimeZone } from "@/utils/date"


export const callSaveCheckpoint = function(form) {

    // internally seding the server session cookie which contains the user_id and his email
    return httpClient.post(`/checkpoint/create`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

}

export const callCheckACheckpoint = function(checkopintId, executorsIds) {

    return httpClient.post(`/checkpoint/check/${checkopintId}`, {executorsIds}, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

}