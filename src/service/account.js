import { httpClient } from "@/http"
import { getMyTimeZone } from "@/utils/date"


export const login = (email, password) => {
    return httpClient.post(`http://localhost:3000/api/v1/account/login/${getMyTimeZone().replace('/','-')}`, {
        email: email,
        password: password
    }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((result) => {
        return result
    })
}



export const getMyAccountInfo = function() {
    // internally seding the server session cookie which contains the user_id and his email
    return httpClient.get(`/account/get-my-info/${getMyTimeZone().replace('/','-')}`)
}
