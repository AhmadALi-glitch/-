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


    let [eventInfo, setEventInfo] = useState({})

    let [params, _] = useSearchParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        httpClient.get(`/event/${params.get('event_id')}`).then((result) => {
            setEventInfo(result.data.events)
            setLoading(false)
            console.log("res" ,result)
        })
    }, [])

    let checkpointsStatus = {};
    let datesTeamsMap = {}
    let dayInMs = 1000*60*60*24

    let start_date = 1710001116417
    let end_date = 1710901116417  + dayInMs*8
    let diff = end_date - start_date

    let teams = [
        {
            id: 1,
            name: 'Team 1',
            join_date:   1710001116417 + dayInMs* 14,
            checkpoints: [
                {
                    id: 1,
                    checked: false,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs* 12,
                    executors: []
                },
                {
                    id: 8,
                    checked: false,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 2,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs * 2,
                    executors: []
                }
            ]
        },
        {
            id: 2,
            name: 'Team 1',
            join_date: 1710001116417 + dayInMs* 8,
            checkpoints: [
                {
                    id: 1,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs,
                    executors: []
                }
            ]
        },
        {
            id: 3,
            name: 'Team 3',
            join_date: 1710001116417 + dayInMs* 4,
            checkpoints: [
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 19,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs*6,
                    executors: []
                }
            ]
        },
        {
            id: 4,
            name: 'Team 1',
            join_date: 1710001116417 + dayInMs* 10,
            checkpoints: [
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs * 6,
                    executors: []
                }
            ]
        },
        {
            id: 5,
            name: 'Team 1',
            join_date: 1710001116417 + dayInMs* 10,
            checkpoints: [
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs * 6,
                    executors: []
                }
            ]
        },
        {
            id: 6,
            name: 'Team 1',
            join_date: 1710001116417 + dayInMs* 10,
            checkpoints: [
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs * 6,
                    executors: []
                }
            ]
        },
        {
            id: 7,
            name: 'Team 1',
            join_date: 1710001116417 + dayInMs* 10,
            checkpoints: [
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs * 6,
                    executors: []
                }
            ]
        },
        {
            id: 8,
            name: 'Team 1',
            join_date: 1710001116417 + dayInMs* 5,
            checkpoints: [
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417,
                    executors: []
                },
                {
                    id: 4,
                    checked: true,
                    title: "develop ai model",
                    description: 'we made it !',
                    create_date: 1710001116417 + dayInMs * 6,
                    executors: []
                }
            ]
        }
    ]

    datesTeamsMap[start_date] = []
    for(let i=0;diff != 0; i++) {
        if(diff > dayInMs) {
            datesTeamsMap[+Object.keys(datesTeamsMap)[i] + +dayInMs] = []
            diff -= dayInMs
        } else {
            datesTeamsMap[+Object.keys(datesTeamsMap)[i] + +diff] = []
            diff = 0
        }
    }

    console.log(datesTeamsMap)

    teams.forEach((t) => {
        t.checkpoints.forEach((c) => { 
            for(let i=0; i<Object.keys(datesTeamsMap).length; i++) {
                if(convertUtcToLocale(Object.keys(datesTeamsMap)[i]).date == convertUtcToLocale(c.create_date).date) {
                    // dates [Date] = [ ...teams Ids That Have Checkpoints in this Date  ]
                    datesTeamsMap[Object.keys(datesTeamsMap)[i]].push(t.id)
                    // ${Object.keys(dates)[i]}|${t.id} : Represends the  Date and team id 
                    //  [0, 0] : [number of checked checkpoints , number of unchecked checkpoints]
                    if(!checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${t.id}`]) { checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${t.id}`] = [0, 0] }
                    c.checked ? checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${t.id}`][0]++ : checkpointsStatus[`${Object.keys(datesTeamsMap)[i]}|${t.id}`][1]++
                }
            }
        })
    })


    console.log(checkpointsStatus)

    let [checkpointModal, setCheckpointModal] = useState(false);
    
    let [ref, inView] = useInView()
    

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

                    <div className="information flex basis-[70%] flex-col gap-2">
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
                            <div className="tag border-2 rounded-lg p-1">
                                منظم : احمد
                            </div>
                            <div className="separator rounded-full h-[40%] opacity-[0.1] w-[5px] bg-primary"></div>
                            <div className="tag border-2 rounded-lg p-1">
                                المشاركين : احمد وعلي ومصطفى
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
                                {eventInfo.style}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="separator rounded-full h-[12px] opacity-[0.1] w-[100%] bg-primary"></div>
                <div className="max-w-[100%] basis-[70%] flex overflow-auto ">

                    <table className="p-7 w-full" >
                        <thead className="sticky -top-1 backdrop-blur-sm z-10">
                            <th ref={ref} className="min-w-40 pl-2 pr-2 pt-8 pb-8 text-center"></th>
                            {
                                Object.keys(datesTeamsMap).map((date) => {
                                    return <>
                                        <th className={ `pl-2 pr-2 pt-8 pb-8 text-center ${convertUtcToLocale(+Date.now()).date == convertUtcToLocale(+date).date ? 'text-[#d0f0428e]' : ''}` }>
                                            <div>
                                                { convertUtcToLocale(date).date }
                                            </div>
                                        </th> 
                                    </>
                                })
                            }
                        </thead>
                        <tbody>
                            {
                                teams.map((team) => {
                                    return <>
                                        <tr>

                                            <td style={{transition: 'all ease-in .1s'}} className={ `${inView ? 'h-36 pl-3 text-center' : 'sticky right-0 pt-24 '} ` }>
                                                <div className={ `team-name flex items-center rounded-3xl min-h-[100%] ${inView ? 'border-2 border-[#d0f0428e] justify-center ' : 'justify-start'}` }>
                                                    <div className={ `team-name-minimized p-1 pr-2 pl-2 rounded-full text-sm ${ !inView ? 'font-extrabold text-[#7de64d54d0f0428e]' : ''} ` }>
                                                        {team.name}
                                                    </div>
                                                </div>
                                            </td>

                                            {
                                                Object.keys(datesTeamsMap).map((eventDay) => {

                                                    return (
                                                        
                                                        convertUtcToLocale(Date.now()).date > convertUtcToLocale(eventDay).date ?

                                                            <td className="checkpoint_td relative h-14 text-center min-h-[100%] pt-6 pb-6">
                                                                <div className="chekpointsStats absolute top-8 left-4">
                                                                    {

                                                                        Object.keys(checkpointsStatus).includes(`${eventDay}|${team.id}`) ? 

                                                                            <div className="bg-[#d0f0428e] text-center pr-1 pl-1 h-5 w-5 cursor-pointer border-2 text-xs rounded-3xl border-[#d0f0428e]">
                                                                                { 
                                                                                    checkpointsStatus[`${eventDay}|${team.id}`][1] == 0 ?
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
                                                                                                    {checkpointsStatus[`${eventDay}|${team.id}`][1]}
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                {checkpointsStatus[`${eventDay}|${team.id}`][1]}  نقطة تقدم غير متحقق منها
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
                                                                    <div className={ `opacity-[0.2] checkpoint backdrop-blur-md rounded-2xl p-4 text-xs w-5 h-5 absolute left-[30%] top-[-18px] flex items-center justify-center ${datesTeamsMap[eventDay].includes(team.id) ? 'bg-[#d0f0428e] outline-3 outline-dotted outline-[#d0f0428e]' : 'border'}` }>
                                                                    </div>
                                                                </div>

                                                                {convertUtcToLocale(team.join_date).date == convertUtcToLocale(eventDay).date ? <div className="absolute top-[32%] text-[#d0f0428e] rounded-full ">
                                                                    <TooltipProvider>
                                                                        <Tooltip delayDuration={0} >
                                                                            <TooltipTrigger  className="flex flex-col justify-center items-center">
                                                                                <Flag size={24} />
                                                                                <Circle size={10} className="self-end" />
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                { team.name } Joining Date
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div> : <></>}

                                                            </td>

                                                        : convertUtcToLocale(Date.now()).date == convertUtcToLocale(eventDay).date ?

                                                            <td className="checkpoint_td relative h-40 text-center min-h-[100%] pt-6 pb-6">
                                                            
                                                                <div className="chekpointsStats absolute top-8 left-4">
                                                                    {
                                                                        Object.keys(checkpointsStatus).includes(`${eventDay}|${team.id}`) ? 
                                                                            <div className="bg-[#d0f0428e] text-center pr-1 pl-1 h-5 w-5 cursor-pointer border-2 text-xs rounded-3xl border-[#d0f0428e]">
                                                                                { 
                                                                                    checkpointsStatus[`${eventDay}|${team.id}`][1] == 0 ?
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
                                                                                                    {checkpointsStatus[`${eventDay}|${team.id}`][1]}
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                {checkpointsStatus[`${eventDay}|${team.id}`][1]}  نقطة تقدم غير متحقق منها
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

                                                                {convertUtcToLocale(team.join_date).date == convertUtcToLocale(eventDay).date ? <div className="absolute top-[42%] h-[25px] w-[2px] bg-[#d0f0428e] rounded-full"></div> : <></>}


                                                            </td> :
                                                            <td className="checkpoint_td h-40 text-center min-h-[100%] pt-6 pb-6">
                                                                <div className="line opacity-[.1] min-w-[100%] relative max-h-[1px] min-h-[1px] bg-[#d0f0428e]">
                                                                    <div className={ `checkpoint backdrop-blur-[1px] rounded-2xl p-4 text-xs w-5 h-5 absolute border-2 left-[30%] top-[-18px]` }>
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

