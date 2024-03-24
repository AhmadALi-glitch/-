import { UsersThree, Flag, House, UserCircle } from "phosphor-react"

export default function Navbar() {
    return (
        <>
            <div className="pages flex items-center justify-end gap-2 basis-[20%]">

                <div className="group-1 flex border-2 gap-5 border-[#C9DF8A] text-[#333] text-sm font-extrabold pl-2 pr-2 p-1 rounded-[5px] bg-[#C9DF8A]">
                <div className="cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav">
                    <Flag size={25}/>
                    <div>الفعاليات</div>
                </div>
                <div className="flex cursor-pointer items-center gap-5 teams-nav">
                    <UsersThree size={25} />
                    {/* <div>الفرق</div> */}
                </div>
                <div className="flex cursor-pointer items-center gap-5 home-nav">
                    <House size={25}/>
                    {/* <div>المنزل</div> */}
                </div>
                </div>
            
                <div className="group-2 border-2 rounded-[5px] text-sm border-[#C9DF8A] p-[6px]">
                <div className="flex cursor-pointer items-center gap-2 pl-1 pr-1 profile">
                    <UserCircle size={25} className="text-[#C9DF8A]"/>
                    {/* <div>صفحتي الشخصية</div> */}
                </div>
                </div>

            </div>
        </>
    )
}