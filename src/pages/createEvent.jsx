
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import '../../app/create-event-page.css';
import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
export function DatePickerWithRange({
  className,
}) {

  const [from, setFrom] = useState(new Date())

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
          <PopoverTrigger asChild>
            <div
              className={
                "cursor-pointer justify-start rounded-xl border-2 p-[5px] pr-5 pl-5 text-left font-normal"
              }
            >
              {from ? format(from, "PPP") : <span>Pick a date</span>}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar
              mode="single"
              selected={from}
              onSelect={setFrom}
              initialFocus
              className={"bg-[#111] rounded-2xl"}
            />
          </PopoverContent>
        </Popover>
    </div>
  )
}
export default function CreateEventPage() {


  let [form, setForm] = useState({
    name: '',
    description: '',
    start_date: null,
    end_date: null,
    field: ''
  })

  return (
    <section className="create-event-page">
      <div className="page-wrapper">
        <div className="content">
          <h1>انشئ فعالية</h1>
          <form action="">
            <div className="row">
              <div className="field">
                <label htmlFor="name">الأسم</label> 
                <Input onInput={($event) => setForm((oldState) => {return {...oldState, name: $event.target.value }})} type="text" id="name" />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="content">المحتوي</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="المحتوي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">برمجة</SelectItem>
                    <SelectItem value="writting">كتابة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="field">
                <label>النوع</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cooperative">تعاوني</SelectItem>
                    <SelectItem value="competitive">تنافسي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="desc">الوصف</label>
                <Textarea onInput={($event) => setForm((oldState) => {return {...oldState, name: $event.target.value }})} id="desc" />
              </div>
            </div>
            <div className="row">
              <div className="field ">
                <label htmlFor="date">التاريخ</label>
                <DatePickerWithRange ></DatePickerWithRange>
                <DatePickerWithRange ></DatePickerWithRange>
              </div>
            </div>
          </form>
        </div>

        <aside>
          <p>
            اختر اسم يدل على محتوى الفعاليةهذا الاسم سيظهر للمستخدمين ويلعب دور
            في جذب انتباههم   
          </p>
          <p>
            يمكنك ترك تاريخ النهاية بدون قيمة . اي يمكنك  
            أن تنهي الفعالية متى اردت      
          </p>
        </aside>
      </div>
    </section>
  );
}