import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CaretCircleDown, CaretDown, Plus, Signpost } from "phosphor-react"
import {CaretDoubleDown} from "phosphor-react"
import { Popover } from "@/components/ui/popover"
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Checks } from "phosphor-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function EventPage() {

    // let [eventDataStatus, setEventDataStatus] = useState('loading')
    let [params, _] = useSearchParams()

    let checkpointsStatus = {};
    let eventDays = []
    let dates = {}
    let dayInMs = 1000*60*60*24

    let start_date = 1710001116417
    let end_date = 1710901116417  + dayInMs*8
    let diff = end_date - start_date

    let teams = [
        {
            id: 1,
            name: 'Team 1',
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

    dates[start_date] = [[], []]
    for(let i=0;diff != 0; i++) {
        if(diff > dayInMs) {
            dates[+Object.keys(dates)[i] + +dayInMs] = [[], []]
            diff -= dayInMs
        } else {
            dates[+Object.keys(dates)[i] + +diff] = [[], []]
            diff = 0
        }
    }
    console.log(dates)

    teams.forEach((t) => {
        t.checkpoints.forEach((c) => { 
            for(let i=0; i<Object.keys(dates).length; i++) {
                if(new Date(+Object.keys(dates)[i]).toISOString().split('T')[0] == new Date(c.create_date).toISOString().split('T')[0]) {
                    // dates [Date] = [ [...teams Ids] , [...checkpoints Ids] ]
                    dates[Object.keys(dates)[i]][0].push(t.id)
                    // ${Object.keys(dates)[i]}|${t.id} : Represends the  Date and team id 
                    //  [0, 0] : [number of checked checkpoints , number of unchecked checkpoints]
                    if(!checkpointsStatus[`${Object.keys(dates)[i]}|${t.id}`]) { checkpointsStatus[`${Object.keys(dates)[i]}|${t.id}`] = [0, 0] }
                    c.checked ? checkpointsStatus[`${Object.keys(dates)[i]}|${t.id}`][0]++ : checkpointsStatus[`${Object.keys(dates)[i]}|${t.id}`][1]++
                }
            }
        })
    })


    console.log(checkpointsStatus)

    let [checkpointModal, setCheckpointModal] = useState(false);
    
    let [ref, inView, entry] = useInView()
    

    return (
        <>

            {
                checkpointModal ? 
                    <div className="fixed w-full h-full z-40 bg-transparent backdrop-blur-sm text-[#7de64d65] text-2xl flex items-center justify-center">
                        <button onClick={() => setCheckpointModal(false)}>
                            exit
                        </button>
                    </div> : 
                    <></>
            }

            <div className="h-lvh overflow-auto bg-black flex items-center justify-center">
                <div className="max-w-[70%] max-h-[90%] overflow-auto bg-black ">
                <table className="p-7 w-full" >
                    <thead className="sticky -top-1 backdrop-blur-sm z-20">
                        <th ref={ref} className="min-w-40 pl-2 pr-2 pt-8 pb-8 text-center">EventDays/Teams</th>
                        {
                            Object.keys(dates).map((date) => {
                                return <>
                                    <th className={ `pl-2 pr-2 pt-8 pb-8 text-center ${new Date(+Date.now()).toISOString().split('T')[0] == new Date(+date).toISOString().split('T')[0] ? 'text-[#7de64d65]' : ''}` }>
                                        <div>
                                            {new Date(+date).toISOString().split('T')[0]}
                                        </div>
                                        {/* <span className="text-xs">{new Date(date).toISOString().split(/[T.]/g)[1]}</span> */}
                                    </th> 
                                </>
                            })
                        }
                        {/* <th className="pl-2 pr-2 rotate-90 pt-8 pb-8 text-center">2024/1/3</th> */}
                        {/* <th className="pl-2 pr-2 rotate-90 pt-8 pb-8 text-center">2024/1/4</th> */}
                    </thead>
                    <tbody>
                        {
                            teams.map((team) => {
                                return <>
                                    <tr>
                                        
                                        <td style={{transition: 'all ease-in .2s'}} className={ `${inView ? 'min-w-44 h-36 pl-3 text-center' : 'min-w-7 max-w-5 sticky right-0 pt-24 '} ` }>
                                            <div className={ `team-name flex items-center rounded-3xl min-h-[100%] ${inView ? 'border-2 border-[#7de64d54] justify-center ' : 'justify-start'}` }>
                                            <div className={ `team-name-minimized p-1 pr-2 pl-2 rounded-full text-sm ${ !inView ? 'font-extrabold text-[#7de64d54]' : ''} ` }>
                                                    {team.name}
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {
                                            Object.keys(dates).map((date) => {
                                                return (
                                                    new Date(+Date.now()).toISOString().split('T')[0] > new Date(+date).toISOString().split('T')[0] ?
                                                        <td className="checkpoint_td relative h-14 text-center min-h-[100%] pt-6 pb-6">

                                                            <div className="chekpointsStats absolute top-8 left-4">
                                                                {
                                                                    Object.keys(checkpointsStatus).includes(`${date}|${team.id}`) ? 
                                                                        <div className="bg-[#7de64d65] text-center pr-1 pl-1 h-5 w-5 cursor-pointer border-2 text-xs rounded-3xl border-[#7de64d65]">
                                                                            { 
                                                                                checkpointsStatus[`${date}|${team.id}`][1] == 0 ?
                                                                                <>
                                                                                    <TooltipProvider>
                                                                                        <Tooltip delayDuration={0}>
                                                                                            <TooltipTrigger >
                                                                                                <Checks className="border-2 rounded-full backdrop-blur-2xl border-dotted border-[#7de64d65]" fontSize={20}/>
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
                                                                                                {checkpointsStatus[`${date}|${team.id}`][1]}
                                                                                            </TooltipTrigger>
                                                                                            <TooltipContent>
                                                                                               {checkpointsStatus[`${date}|${team.id}`][1]}  نقطة تقدم غير متحقق منها
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
                                                                <div className={ `opacity-[0.2] checkpoint backdrop-blur-md rounded-2xl p-4 text-xs w-5 h-5 absolute left-[30%] top-[-18px] flex items-center justify-center ${dates[date][0].includes(team.id) ? 'bg-[#7de64d65] outline-3 outline-dotted outline-[#7de64d65]' : 'border'}` }>
                                                                </div>
                                                            </div>

                                                        </td>
                                                    : new Date(+Date.now()).toISOString().split('T')[0] == new Date(+date).toISOString().split('T')[0] ?
                                                        <td className="checkpoint_td relative h-40 text-center min-h-[100%] pt-6 pb-6">
                                                            
                                                            <div className="chekpointsStats absolute top-8 left-4">
                                                                {
                                                                    Object.keys(checkpointsStatus).includes(`${date}|${team.id}`) ? 
                                                                        <div className="bg-[#7de64d65] text-center pr-1 pl-1 h-5 w-5 cursor-pointer border-2 text-xs rounded-3xl border-[#7de64d65]">
                                                                            { 
                                                                                checkpointsStatus[`${date}|${team.id}`][1] == 0 ?
                                                                                <>
                                                                                    <TooltipProvider>
                                                                                        <Tooltip delayDuration={0}>
                                                                                            <TooltipTrigger >
                                                                                                <Checks className="border-2 rounded-full backdrop-blur-2xl border-dotted border-[#7de64d65]" fontSize={20}/>
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
                                                                                                {checkpointsStatus[`${date}|${team.id}`][1]}
                                                                                            </TooltipTrigger>
                                                                                            <TooltipContent>
                                                                                               {checkpointsStatus[`${date}|${team.id}`][1]}  نقطة تقدم غير متحقق منها
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
                                                                            <Signpost size={25} weight="bold" color="#7de64d65" />
                                                                        </button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent sideOffset={15} className="z-20  border-2 bg-primary border-[#7de64d65] p-2 rounded-xl">
                                                                        <DropdownMenuLabel className="text-xl">
                                                                            نقاط تقدم الفعالية
                                                                        </DropdownMenuLabel>
                                                                        <DropdownMenuSeparator className="bg-muted h-[1px] mt-2" />
                                                                        <Button  onClick={() => setCheckpointModal(true)} className="text-lg rounded-xl mt-3 mb-1 w-[100%] gap-3 bg-[#7de64d65] cursor-pointer h-[30px]">
                                                                            <Plus/> اضِف
                                                                        </Button>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>

                                                        </td> :
                                                        <td className="checkpoint_td h-40 text-center min-h-[100%] pt-6 pb-6">
                                                            <div className="line opacity-[.1] min-w-[100%] relative max-h-[1px] min-h-[1px] bg-[#7de64d65]">
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
            </div>
        </>
    )

}

