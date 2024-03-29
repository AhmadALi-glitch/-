import { UsersThree, Flag, House, UserCircle } from "phosphor-react";
import { useState } from "react";
import '../../app/header.css';
import { accountContext } from "@/state/account"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { callCreateEvent } from "@/service/event";


export default function Navbar() {

  const [isActive, setIsActive] = useState("events");

  let accountState = useContext(accountContext)
  let navigator = useNavigate()
  let navigate = (path) => {
    console.log(path)
    setIsActive(path)
      navigator(path, {
        replace: true
      })
  }

  let [eventForm, setForm] = useState({
    name: null,
    description: null,
    start_date: new Date(Date.now()).toISOString(),
    end_date:  new Date(Date.now() + (1000*60*60*24)).toISOString(),
    field: "programming",
    style: "collaborative"
  })

  let saveEvent = () => {
    console.log(eventForm)
    callCreateEvent(eventForm).then(console.log)
  }

  return (
    <>
        <div className="pages flex items-center justify-end gap-2 basis-[20%]">
          <div className="group-1 flex border-2 gap-5 border-[#C9DF8A] text-[#333] text-sm font-extrabold pl-2 pr-2 p-1 rounded-[5px] bg-[#C9DF8A]">
            <div onClick={() => navigate('/events')} className={isActive === "/events" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} >
              <Flag size={25} />
              <span>الفعاليات</span>
            </div>
            <div onClick={() => navigate('/teams')} className={isActive === "/teams" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} >
              <UsersThree size={25} />
              <span>الفرق</span>
            </div>
            <div onClick={() => navigate('/')} className={isActive === "/" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} >
              <House size={25} />
              <span>المنزل</span>
            </div>
            <div onClick={() => navigate('/login')} className={isActive === "/login" ? "active cursor-pointer bg-[#A8BE69] flex items-center gap-5 w-[200px] pr-2 p-[2px] rounded-[4px] events-nav" : "flex cursor-pointer items-center gap-5 teams-nav"} >
              <LogIn size={25}/>
              <span>تبديل الحساب</span>
            </div>
          </div>

          <div className="group-2 border-2 rounded-[5px] text-sm border-[#C9DF8A] p-[6px]">
            <div onClick={() => navigate('/accountProfile')} className="flex cursor-pointer min-w-[150px] items-center gap-2 pl-1 pr-1 profile">
              <UserCircle size={25} className="text-[#C9DF8A]"/>
              {accountState.name}
            </div>
          </div>

          <div className="group-2 border-2 rounded-[5px] text-sm border-[#C9DF8A] ">
            <Dialog>
              <DialogTrigger asChild>
                <Button>انشئ فعالية</Button>
              </DialogTrigger>
              <DialogContent className="rtl sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>انشاء فعالية</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="name" className="font-extrabold text-right">
                      الأسم
                    </Label>
                    <Input onInput={($event) => setForm((oldState) => {return { ...oldState, name: $event.target.value } })} id="name" className="bg-[#3336] rounded-[5px]  w-[200px]" />
                  </div>
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="username" className="font-extrabold text-right">
                      النوع
                    </Label>
                    <Input id="username" className="bg-[#3336] rounded-[5px]  w-[200px]" />
                  </div>

                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="name" className="font-extrabold text-right">
                      المحتوى
                    </Label>
                    <Input id="name" className="bg-[#3336] rounded-[5px]  w-[200px]" />
                  </div>
                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="username" className="font-extrabold text-right">
                      الوصف
                    </Label>
                    <Input onInput={($event) => setForm((oldState) => {return { ...oldState, description: $event.target.value } })}  id="username" className="bg-[#3336] rounded-[5px]  w-[200px]" />
                  </div>

                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="name" className="font-extrabold text-right">
                      من
                    </Label>

                    <Popover>
                        <PopoverTrigger asChild>
                          <div
                            className={
                              "cursor-pointer justify-start w-[300px] rounded-xl border-2 p-[5px] pr-5 pl-5 text-left font-normal"
                            }
                          >
                            {eventForm.start_date ? format(eventForm.start_date, "PPP") : <span>Pick a date</span>}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                          <Calendar
                            mode="single"
                            selected={eventForm.start_date}
                            onSelect={(date) => {setForm((oldState) => { return {...oldState, start_date: date} })}}
                            initialFocus
                            className={"bg-[#111] rounded-2xl"}
                          />
                        </PopoverContent>
                    </Popover>

                  </div>

                  <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="name" className="font-extrabold text-right">
                      إلى
                    </Label>

                    <Popover>
                        <PopoverTrigger asChild>
                          <div
                            className={
                              "cursor-pointer justify-start w-[300px] rounded-xl border-2 p-[5px] pr-5 pl-5 text-left font-normal"
                            }
                          >
                            {eventForm.end_date ? format(eventForm.end_date, "PPP") : <span>Pick a date</span>}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                          <Calendar
                            mode="single"
                            selected={eventForm.end_date}
                            onSelect={(date) => {setForm((oldState) => { return {...oldState, end_date: date} })}}
                            initialFocus
                            className={"bg-[#111] rounded-2xl"}
                          />
                        </PopoverContent>
                    </Popover>

                  </div>

                </div>

                <DialogFooter>
                  <Button onClick={() => {saveEvent()}} className="rounded-2xl">حفظ</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>


          
      </div>
    </>
  );
}