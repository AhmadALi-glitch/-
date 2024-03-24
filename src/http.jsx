
import axios from "axios"
import { redirect, useNavigate } from "react-router-dom"

export const httpClient = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true
})


httpClient.interceptors.response.use(
    function (response) {
        console.log("Response Intercepted With No Errors")
        return response
    },
    function(error) {
        console.log("Intercepter Response Error", error, "With Status: ", error.request.status)
        if(error.request.status == 403) {
            document.location.replace('/login')
        }
        return error;
    }
)
