import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Plus, Signpost, Flag, Circle } from "phosphor-react"
import { Checks } from "phosphor-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { convertUtcToLocale } from "@/utils/date"
import { httpClient } from "@/http"


export default function EventPage() {

    let [eventInfo, setEventInfo] = useState(null)
    let dayInMs = 1000*60*60*24
    let [ checkpointsStatus, setCheckpointsStatus ] = useState({})
    let [ datesTeamsMap, setDatesTeamsMap ] = useState({})
    let [ start_date, setStart_date ] = useState(0)
    let [ end_date, setEnd_date ] = useState(0)
    // let [ diff, setDiff ] = useState(0)

    let [params, _] = useSearchParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // Fitst Get The Role Of The Account

        // Second Get The Information Of The Event
        httpClient.get(`/event/${params.get('event_id')}`).then((result) => {

            setEventInfo(result.data.events)
            console.log("Event Data", result.data)
            // console.log("Event Info", eventInfo )

            // Formulate The Datastructure As Needed
            let diff = +result.data.events.end_date_utc - +result.data.events.start_date_utc

            datesTeamsMap[+result.data.events.start_date_utc] = []
            
            for(let i=0;diff != 0; i++) {
                if(diff > dayInMs) {
                    datesTeamsMap[+Object.keys(datesTeamsMap)[i] + +dayInMs] = []
                    diff -= dayInMs
                } else {
                    datesTeamsMap[+Object.keys(datesTeamsMap)[i] + +diff] = []
                    diff = 0
                }
            }
            
            console.log("d&d", datesTeamsMap, diff)

            result.data.events.checkpoints.forEach((c) => {
                for(let i=0; i<Object.keys(datesTeamsMap).length; i++) {
                    if(convertUtcToLocale(Object.keys(datesTeamsMap)[i]).date == convertUtcToLocale(c.create_date_utc).date) {
                        // dates [Date] = [ ...teams Ids That Have Checkpoints in this Date  ]
                        datesTeamsMap[Object.keys(datesTeamsMap)[i]].push(c.team_id)
                        // ${Object.keys(dates)[i]}|${c.team_id} : Represends the  Date and team id
                        //  [0, 0] : [number of checked checkpoints , number of unchecked checkpoints]
                        if(!checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${c.team_id}`]) { checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${c.team_id}`] = [0, 0] }
                        c.checked ? checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${c.team_id}`][0]++ : checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${c.team_id}`][1]++
                    }
                }
            })

            setLoading(false)

        })

    }, [])



    // console.log("Start Date IN UTC : ", new Date(+eventInfo.start_date_utc).valueOf(), +eventInfo.start_date_utc , (new Date().getTimezoneOffset() * 60 * 1000))

    let [checkpointModal, setCheckpointModal] = useState(false);
    
    let [ref, inView] = useInView()

    let eventFieldMap = {
        programming: 'برمجة',
        writing: 'كتابة'
    }
    let eventStyleMap = {
        competetive: 'تنافسية',
        collaborative: 'تعاونية'
    }

    return (
        <>

            {
                checkpointModal ? 
                    <div className="fixed w-full h-full z-40 bg-transparent backdrop-blur-sm text-[#d0f0428e] text-2xl flex items-center justify-center">
                        <button onClick={() => setCheckpointModal(false)}>
                            exit
                        </button>
                    </div> : 
                    <></>
            }

            {!loading ? 
            <div className="max-h-[800px] overflow-auto flex flex-col justify-between gap-3 items-center">

                <div className="event-info flex justify-between gap-2 w-full pt-8 pb-4 basis-[30%]">

                    <div className="information flex basis-[70%] flex-col gap-6">
                        <div className="heading w-full flex items-center gap-4">
                            <div className="name text-3xl text-primary font-extrabold">
                                {eventInfo.name}
                            </div>
                            <div className="separator rounded-full h-[40%] opacity-[0.1] w-[5px] bg-primary"></div>
                            <div className="actions">
                                <button className="join text-primary">انضم</button>
                            </div>
                        </div>
                        <div className="tags flex items-center text-sm gap-2">
                            <div className="tag flex items-center gap-2 border-2 rounded-lg p-1">
                                المنظمين : {
                                    eventInfo.organizers.map((or, i) => {
                                        return <div key={i}>
                                            {or.organizer.name}
                                        </div>
                                    })
                                }
                            </div>
                            <div className="separator rounded-full h-[40%] opacity-[0.1] w-[5px] bg-primary"></div>
                            <div className="tag flex items-center gap-2 border-2 rounded-lg p-1">
                                المشاركين : {
                                    eventInfo.participants.map((pa, i) => {
                                        return <div key={i}>
                                            فريق {pa.team.name}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="description">
                            {
                                eventInfo.description
                            }
                        </div>
                    </div> 

                    <div className="details flex flex-col pt-2 pb-1 justify-start gap-2 rounded-2xl basis-[20%] border-opacity-10">
                        <div className="detail flex justify-between">تاريخ البدء
                            <span className="text-primary font-extrabold">
                                {convertUtcToLocale(+eventInfo.start_date_utc).date}
                            </span>
                        </div>
                        <div className="detail flex justify-between">تنتهي في 
                            <span className="text-primary font-extrabold">
                                {convertUtcToLocale(+eventInfo.end_date_utc).date}
                            </span>
                        </div>
                        <div className="detail flex justify-between">المحتوى 
                            <span className="text-primary font-extrabold">
                                {eventInfo.field}
                            </span>
                        </div>
                        <div className="detail flex justify-between">النوع 
                            <span className="text-primary font-extrabold">
                                {eventStyleMap[eventInfo.style]}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="separator rounded-full h-[1px] opacity-[0.1] w-[100%] bg-primary"></div>
                <div className="max-w-[100%] basis-[70%] flex justify-start w-full overflow-auto ">

                    <table className="p-7 w-full" >
                        <thead className="sticky -top-1 backdrop-blur-sm z-10">
                            <th ref={ref} className="min-w-40 pl-2 pr-2 pt-8 pb-8 text-center"></th>
                            {
                                Object.keys(datesTeamsMap).map((date, i) => {
                                    return <th key={i} className={ `pl-2 pr-2 pt-8 pb-8 text-center ${convertUtcToLocale(+Date.now()).date == convertUtcToLocale(+date).date ? 'text-[#d0f0428e]' : ''}` }>
                                        <div>
                                            { convertUtcToLocale(date).date }
                                        </div>
                                    </th> 
                                })
                            }
                        </thead>
                        <tbody>
                            {
                                eventInfo.participants.map((participant, i) => {
                                    return <>
                                        <tr key={i}>

                                            <td style={{transition: 'all ease-in .1s'}} className={ `${inView ? 'h-36 pl-3 text-center' : 'sticky right-0 pt-24 '} ` }>
                                                <div className={ `team-name flex items-center rounded-3xl min-h-[100%] ${inView ? 'border-2 border-[#d0f0428e] justify-center ' : 'justify-start'}` }>
                                                    <div className={ `team-name-minimized p-1 pr-2 pl-2 rounded-full text-sm ${ !inView ? 'font-extrabold text-[#7de64d54d0f0428e]' : ''} ` }>
                                                        {participant.team.name}
                                                    </div>
                                                </div>
                                            </td>

                                            {
                                                Object.keys(datesTeamsMap).map((eventDay, i) => {

                                                    return (
                                                        
                                                        convertUtcToLocale(Date.now()).date > convertUtcToLocale(eventDay).date ?

                                                            <td key={i} className="checkpoint_td relative h-14 text-center min-h-[100%] pt-6 pb-6">
                                                                <div className="chekpointsStats absolute top-8 left-4">
                                                                    {

                                                                        Object.keys(checkpointsStatus).includes(`${eventDay}|${participant.team.id}`) ? 

                                                                            <div className="bg-[#d0f0428e] text-center pr-1 pl-1 h-5 w-5 cursor-pointer border-2 text-xs rounded-3xl border-[#d0f0428e]">
                                                                                { 
                                                                                    checkpointsStatus[`${eventDay}|${participant.team.id}`][1] == 0 ?
                                                                                    <>
                                                                                        <TooltipProvider>
                                                                                            <Tooltip delayDuration={0}>
                                                                                                <TooltipTrigger >
                                                                                                    <Checks className="border-2 rounded-full backdrop-blur-2xl border-dotted border-[#d0f0428e]" fontSize={20}/>
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                    تم التحقق من كل نقاط التقدم 
                                                                                                </TooltipContent>
                                                                                            </Tooltip>
                                                                                        </TooltipProvider>
                                                                                    </>
                                                                                    : <>

                                                                                        <TooltipProvider>
                                                                                            <Tooltip delayDuration={0}>
                                                                                                <TooltipTrigger>
                                                                                                    {checkpointsStatus[`${eventDay}|${participant.team.id}`][1]}
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                {checkpointsStatus[`${eventDay}|${participant.team.id}`][1]}  نقطة تقدم غير متحقق منها
                                                                                                </TooltipContent>
                                                                                            </Tooltip>
                                                                                        </TooltipProvider>
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                        : ``
                                                                    }
                                                                </div>

                                                                <div className="line min-w-[100%] relative max-h-[5px] min-h-[1px] bg-[#eee1]">
                                                                    <div className={ `opacity-[0.2] checkpoint backdrop-blur-md rounded-2xl p-4 text-xs w-5 h-5 absolute left-[40%] top-[-18px] flex items-center justify-center ${datesTeamsMap[eventDay].includes(participant.team.id) ? 'bg-[#d0f0428e] outline-3 outline-dotted outline-[#d0f0428e]' : 'border'}` }>
                                                                    </div>
                                                                </div>

                                                                {convertUtcToLocale(participant.join_date_utc).date == convertUtcToLocale(eventDay).date ? <div className="absolute top-[32%] text-[#d0f0428e] rounded-full ">
                                                                    <TooltipProvider>
                                                                        <Tooltip delayDuration={0} >
                                                                            <TooltipTrigger  className="flex flex-col justify-center items-center">
                                                                                <Flag size={24} />
                                                                                <Circle size={10} className="self-end" />
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                تاريخ انضمام { participant.team.name } 
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div> : <></>}

                                                            </td>

                                                        : convertUtcToLocale(Date.now()).date == convertUtcToLocale(eventDay).date ?

                                                            <td key={i} className="checkpoint_td relative h-40 text-center min-h-[100%] pt-6 pb-6">
                                                            
                                                                <div className="chekpointsStats absolute top-8 left-4">
                                                                    {
                                                                        Object.keys(checkpointsStatus).includes(`${eventDay}|${participant.team.id}`) ? 
                                                                            <div className="bg-[#d0f0428e] text-center pr-1 pl-1 h-5 w-5 cursor-pointer border-2 text-xs rounded-3xl border-[#d0f0428e]">
                                                                                { 
                                                                                    checkpointsStatus[`${eventDay}|${participant.team.id}`][1] == 0 ?
                                                                                    <>
                                                                                        <TooltipProvider>
                                                                                            <Tooltip delayDuration={0}>
                                                                                                <TooltipTrigger >
                                                                                                    <Checks className="border-2 rounded-full backdrop-blur-2xl border-dotted border-[#d0f0428e]" fontSize={20}/>
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                    تم التحقق من كل نقاط التقدم 
                                                                                                </TooltipContent>
                                                                                            </Tooltip>
                                                                                        </TooltipProvider>
                                                                                    </>
                                                                                    : <>

                                                                                        <TooltipProvider>
                                                                                            <Tooltip delayDuration={0}>
                                                                                                <TooltipTrigger>
                                                                                                    {checkpointsStatus[`${eventDay}|${participant.team.id}`][1]}
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                {checkpointsStatus[`${eventDay}|${participant.team.id}`][1]}  نقطة تقدم غير متحقق منها
                                                                                                </TooltipContent>
                                                                                            </Tooltip>
                                                                                        </TooltipProvider>
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                        : ``
                                                                    }
                                                                </div>

                                                                    <DropdownMenu modal={true}>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <button>
                                                                                <Signpost size={25} weight="bold" color="#d0f0428e" />
                                                                            </button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent sideOffset={15} className="z-20  border-2 bg-primary border-[#d0f0428e] p-2 rounded-xl">
                                                                            <DropdownMenuLabel className="text-xl">
                                                                                نقاط تقدم الفعالية
                                                                            </DropdownMenuLabel>
                                                                            <DropdownMenuSeparator className="bg-muted h-[1px] mt-2" />
                                                                            <Button  onClick={() => setCheckpointModal(true)} className="text-lg rounded-xl mt-3 mb-1 w-[100%] gap-3 bg-[#d0f0428e] cursor-pointer h-[30px]">
                                                                                <Plus/> اضِف
                                                                            </Button>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>

                                                                {convertUtcToLocale(participant.join_date_utc).date == convertUtcToLocale(eventDay).date ? <div className="absolute top-[42%] h-[25px] w-[2px] bg-[#d0f0428e] rounded-full"></div> : <></>}


                                                            </td> :
                                                            <td key={i} className="checkpoint_td h-40 text-center min-h-[100%] pt-6 pb-6">
                                                                <div className="line opacity-[.1] min-w-[100%] relative max-h-[1px] min-h-[1px] bg-[#d0f0428e]">
                                                                    <div className={ `checkpoint backdrop-blur-[1px] rounded-2xl p-4 text-xs w-5 h-5 absolute border-2 left-[40%] top-[-18px]` }>
                                                                    </div>
                                                                </div>
                                                            </td> 
                                                    )

                                                })
                                            }

                                        </tr>
                                    </>
                                })
                            }

                        </tbody>
                    </table>

                </div>
            </div> : <></>}

        </>
    )

}

