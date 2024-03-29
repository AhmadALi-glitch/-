import { accountContext } from "@/state/account";
import { convertUtcToLocale } from "@/utils/date";
import { Diamond } from "phosphor-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TeamCard({teamData}) {

    let accountState = useContext(accountContext)
    let navigator = useNavigate()
    // let [joinRequestState, setJoinRequestState] = useState(false)

    return (
        <>
            <div className="wrapper border-2 rounded-xl mt-3 p-4 flex flex-col">
                <div className="name font-extrabold text-2xl flex items-center gap-2"><Diamond className="text-primary" size={15}></Diamond>{teamData.name}</div>
                <div className="about">{teamData.about}</div>
                <div className="date">تم تأسيسه منذ : {convertUtcToLocale(+teamData.create_date_utc).date}</div>
                {!accountState.team_id ? <button>انضم</button> : <></>}
                <button onClick={() => navigator(`/teamProfile?teamId=${teamData.id}`)} className="bg-primary text-[#333] pl-2 pr-2  p-1 self-end" style={{borderRadius: '10px'}} >صفحة الفريق</button>
            </div> 
        </>
    )

}