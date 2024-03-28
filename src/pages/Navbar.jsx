import { UsersThree, Flag, House, UserCircle } from "phosphor-react";
import { useState } from "react";
import '../../app/header.css';
import { accountContext } from "@/state/account"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const [isActive, setIsActive] = useState("events");

    let accountState = useContext(accountContext)
    let navigator = useNavigate()
    let navigate = (path) => {
       navigator(path, {
        replace: true
       }) 
    }
  return (
    <>
        <div className="pages flex items-center justify-end gap-2 basis-[20%]">
          <div className="group-1 flex border-2 gap-5 border-[#C9DF8A] text-[#333] text-sm font-extrabold pl-2 pr-2 p-1 rounded-[5px] bg-[#C9DF8A]">
            <div className={isActive === "events" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} onClick={() => setIsActive("events")}>
              <Flag size={25} />
              <span>الفعاليات</span>
            </div>
            <div className={isActive === "teams" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} onClick={() => setIsActive("teams")}>
              <UsersThree size={25} />
              <span>الفرق</span>
            </div>
            <div className={isActive === "home" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} onClick={() => setIsActive("home")}>
              <House size={25} />
              <span>المنزل</span>
            </div>
          </div>

          <div className="group-2 border-2 rounded-[5px] text-sm border-[#C9DF8A] p-[6px]">
            <div className="flex cursor-pointer items-center gap-2 pl-1 pr-1 profile">
              <UserCircle size={25} className="text-[#C9DF8A]" />
              {accountState.name}
              {/* <div>صفحتي الشخصية</div> */}
            </div>
          </div>
      </div>
    </>
  );
}