import { getEventJoinRequests } from "@/service/notifications"
import { useEffect, useState } from "react"
import loadingAnimationData from "../assets/lottiefiles/loading.json"
import Lottie from "react-lottie";


export default function Notifications() {

    let [notifications, setNotifications] = useState(null);
    let [loading, setLoading] = useState(true);

    let loadingAnimationOptions = {
        animationData: loadingAnimationData,
        autoplay: true,
        loop: true,
        isPausedWhenClick: false
    }


    useEffect(() => {
        getEventJoinRequests().then((result) => {
            setNotifications(result.data)
            setLoading(false)
            console.log(result)
        })
    }, [])

    return (
        <>
            <div className="wrapper flex items-start justify-center">
                {
                    loading ? <Lottie options={loadingAnimationOptions} width={50}/> : <div>
                        {notifications?.length ? notifications.map((n, i) => {
                            return <div className="notification bg-primary text-xs rounded-xl text-center items-center flex p-2 font-main text-[#333]">
                                <div className="num rounded-full bg-white w-[20px] p-1">{i+1}</div>
                                {n}
                                <div className="actions"></div>
                            </div>
                        }) : <>لا يوجد اشعارات</>}
                    </div>
                } 
            </div>
        </>
    )
} 