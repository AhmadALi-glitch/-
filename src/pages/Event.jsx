import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Plus, Signpost, Flag, Circle, DiamondsFour, User } from "phosphor-react"
import { Checks } from "phosphor-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { convertUtcToLocale } from "@/utils/date"
import { httpClient } from "@/http"
import { getCheckpointsInADay } from "@/state/checkpoints"
import { CircleDotDashed, RefreshCw, Save, X } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { callCheckACheckpoint, callSaveCheckpoint } from "@/service/checkpoint"
import { easings, useSpring } from "@react-spring/web"
import { animated } from "@react-spring/web"
import { checkIsMember, finishAnEvent, joinRequest } from "@/service/event"
import { accountContext } from "@/state/account"
import Lottie from "react-lottie"
import loadingAnimationData from "../assets/lottiefiles/loading.json"

export default function EventPage() {

    let [eventInfo, setEventInfo] = useState(null)
    let dayInMs = 1000*60*60*24
    let [ checkpointsStatus, setCheckpointsStatus ] = useState({})
    let [ datesTeamsMap, setDatesTeamsMap ] = useState({})
    let [ start_date, setStart_date ] = useState(0)
    let [ end_date, setEnd_date ] = useState(0)
    // let [ diff, setDiff ] = useState(0)
    let [eventTimeIntervalInMs, setEventTimeIntervalInMs] = useState(null)
    let [diff, setDiff] = useState(0)

    let [params, _] = useSearchParams()
    const [loading, setLoading] = useState(true)

    let [role, setRole] = useState(null);
    let [isMember, setIsMember] = useState('unknown')
    let accountState = useContext(accountContext)


    useEffect(() => {

        
        // Second Get The Information Of The Event
        httpClient.get(`/event/${params.get('event_id')}`).then((result) => {


            checkIsMember(accountState.team_id, result.data.events.id).then((res) => {
                console.log("MEMBER l ", res.data)
                setIsMember(res.data)
            })

            setRole(result.data.role)
            setEventInfo(result.data.events)
            console.log("Event Data", result.data)
            // console.log("Event Info", eventInfo )

            // Formulate The Datastructure As Needed
            let diff = +result.data.events.end_date_utc - +result.data.events.start_date_utc
            setDiff(diff)

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

            setEventTimeIntervalInMs(+result.data.events.end_date_utc <= Date.now().valueOf() ? +result.data.events.end_date_utc: Date.now().valueOf() - +result.data.events.start_date_utc  )

            setInterval(() => {
                setEventTimeIntervalInMs((oldState) => {
                    return oldState + 1000 * 60
                })
            }, 1000 * 60) // each minute increase it


            setLoading(false)

        })

    }, [])

    let [checkpointsListModalData, setcheckpointsListModalData] = useState(null)
    let [loadingDayCheckpoints, setLoadingDayCheckpoints] = useState(true)

    const loadCheckpointsForADay = (teamId, checkpointDateInUtc) => {
        setLoadingDayCheckpoints(true)
        getCheckpointsInADay(eventInfo.id, teamId, checkpointDateInUtc).then((result) => {
            console.log("loading checkpoints for a day",result.data.checkpointsInDay)
            setcheckpointsListModalData(result.data.checkpointsInDay)
            setLoadingDayCheckpoints(false)
        })
    }

    // console.log("Start Date IN UTC : ", new Date(+eventInfo.start_date_utc).valueOf(), +eventInfo.start_date_utc , (new Date().getTimezoneOffset() * 60 * 1000))

    let [checkpointModal, setDayCheckpointsList] = useState(false);

    
    let [ref, inView] = useInView()

    let eventFieldMap = {
        programming: 'برمجة',
        writing: 'كتابة'
    }
    let eventStyleMap = {
        competetive: 'تنافسية',
        collaborative: 'تعاونية'
    }
    
    let [checkpointModalDetails, setDayCheckpointModalDetails] = useState(null)
    let [createCheckpointModal, setCreateCheckpointModal] = useState(false)
    let [createCheckpointDetails, setCreateCheckpointDetails] = useState(false)
    

    const showCheckpoint = (checkpoint) => {
        setDayCheckpointsList(true)
        setDayCheckpointModalDetails(checkpoint)
    }


    const createCheckpoint = (details) => {
        setCreateCheckpointDetails(details)
        setCreateCheckpointModal(true)
    }

    let [checkpointForm, setCheckpointForm] = useState({
        executorsIds: [],
        title: null,
        description: null
    })
    let [savingCheckpoint, setSavingCheckpoint] = useState(false)

    const saveCheckpoint = () => {
        console.log("Saving")
        console.log(checkpointForm, createCheckpointDetails)
        setSavingCheckpoint(true)
        let form = {
            ...checkpointForm,
            create_date_utc: createCheckpointDetails.eventDay,
            event_id: eventInfo.id,
            team_id: createCheckpointDetails.team.id
        }

        callSaveCheckpoint(form).then((res) => {
            console.log(res)
            setSavingCheckpoint(false)
            let checkpointOldState = checkpointsStatus[`${res.data.create_date_utc}|${res.data.team_id}`]
            setCheckpointsStatus((status) => {
                return {
                    ...status,
                    [`${res.data.create_date_utc}|${res.data.team_id}`]: [checkpointOldState[0], ++checkpointOldState[1]]
                }
            })
        })

    }


    let [eventSection, setEventSection] = useState("event")
    let [tableSprings, tableSpringsApi] = useSpring(() => {
        return {
            from: {
                flexBasis: '100%',
                overflow: 'auto'
            }
        }
    })
    
    let [evaluatingSectionSprigns ,evaluatingSectionSpringsApi] = useSpring(() => {
        return {
            from: {
                flexBasis: '0%'
            }
        }
    })

    let toggleEventSection = () => {
        console.log("Converting")
        if(eventSection == 'event') {
            setEventSection("evaluate")
            tableSpringsApi.start({
                to: {
                    flexBasis: '0%',
                    overflow: 'hidden'
                },
                config: {
                    duration: 500,
                    easing: easings.easeInExpo
                }
            })
            evaluatingSectionSpringsApi.start({
                to: {
                    flexBasis: '100%'
                },
                config: {
                    duration: 500,
                    easing: easings.easeInExpo
                }
            })
        } else {

            setEventSection("event")
            tableSpringsApi.start({
                to: {
                    flexBasis: '100%',
                    overflow: 'auto'
                },
                config: {
                    duration: 500,
                    easing: easings.easeInExpo
                }
            })
            evaluatingSectionSpringsApi.start({
                to: {
                    flexBasis: '0%'
                },
                config: {
                    duration: 500,
                    easing: easings.easeInExpo
                }
            })

        }

    }


    let [nextDegree, setNextDegree] = useState(1);

    let [teamsEvaluation, setTeamsEvaluation] = useState({})

    let evaluateTeam = (teamId) => {
        setTeamsEvaluation((oldState) => {
            return {
                ...oldState,
                [teamId]: nextDegree
            }
        })
        setNextDegree(++nextDegree)
    }
    
    let resetTeamsEvaluation = (teamId) => {
        setTeamsEvaluation((oldState) => {
            return {
            }
        })
        setNextDegree(1)
    }

    let isTeamHasEvaluation = (teamId) => teamsEvaluation[teamId]

    let checkACheckpoint = (checkpoint) => {
        let executorsIds = checkpoint.executors.map((ex) => {
            return ex.executor.id
        })
        console.log('CHecking A CHeckpoint', checkpoint, executorsIds)
        let oldCheckpoints =  checkpointsStatus[`${checkpoint.create_date_utc}|${checkpoint.team_id}`];
        callCheckACheckpoint(checkpoint.id, executorsIds).then(() => {
            setCheckpointsStatus((oldState) => {return {...oldState, [`${checkpoint.create_date_utc}|${checkpoint.team_id}`] : --oldCheckpoints } })
        })
    }


    let finishTheEvent = function() {
        console.log(teamsEvaluation, nextDegree)
        finishAnEvent(eventInfo, teamsEvaluation).then(console.log)
    }


    let loadingAnimationOptions = {
        animationData: loadingAnimationData,
        autoplay: true,
        loop: true,
        isPausedWhenClick: false
    }


    let saveJoinRequest = () => {
        joinRequest(accountState.team_id, eventInfo.id).then(() => {
            setIsMember("onHold")
        }).catch(console.log)
    }


    return (
        <>

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
                                {
                                    accountState.isTeamLeader && role != 'organizer' ? <button className="join text-primary">
                                        { isMember == "unknown" ? <Lottie options={loadingAnimationOptions} isClickToPauseDisabled={true} width={40}/> : isMember == "onHold" ?  <div>تم ارسال طلب انضمامك</div> : isMember ? <></> :  <div onClick={() => {saveJoinRequest()}}>انضم</div> }
                                    </button> : <></>
                                }
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
                <div className="separator rounded-full h-[5px] opacity-[0.5] w-[100%] bg-primary"></div>
                <div className="max-w-[100%] relative basis-[700px] flex flex-col items-start justify-start w-full overflow-auto">


                    {
                        checkpointModal ? 

                            <div className="absolute w-full h-full z-50 bg-transparent backdrop-blur-sm text-[#d0f0428e] text-2xl flex items-center justify-center">
                                <div className="checkpoint-details relative overflow-hidden w-[500px] h-[500px] bg-[#eee] rounded-2xl p-8 border-2 border-primary">
                                    <Signpost className="absolute left-0 -bottom-[50px] opacity-[0.5]" weight="duotone" size={200}></Signpost>


                                    <div className="fore w-full h-full absolute left-0 top-0 p-8">
                                        <div className="header flex justify-between">
                                            <div className="checkpoint-title flex items-center gap-2 font-bold text-black">
                                                <Signpost weight="duotone" size={40}></Signpost>
                                                <div>
                                                    {checkpointModalDetails.title}
                                                </div>
                                            </div>
                                            <button onClick={() => setDayCheckpointsList(false)}>
                                                <X color={'#333'} fontWeight={"duotone"} />
                                            </button>
                                        </div>

                                        <div className="checkpoint-body pt-10 flex flex-col gap-6 text-xl text-black">
                                            <div className="checkpoint-date">تاريخ التسجيل : { convertUtcToLocale(+checkpointModalDetails.create_date_utc).date }</div>
                                            <div className="checkpoint-executors">المنفذين : { 
                                                checkpointModalDetails.executors.map((ex, i, arr) => {
                                                    return <span className="ex">{ex.executor.name}
                                                    {arr.length-1 == i ? '' : ' و '}
                                                    </span>
                                                })
                                            }</div>
                                            <div className="checkpoint-description overflow-auto max-h-40"> 
                                                شرح : <span style={{lineHeight: 2.1}} className="bg-[#3331] pr-4 p-2 pl-4 rounded-md border-r-4">
                                                    {checkpointModalDetails.description}
                                                </span>
                                            </div>
                                            <div className="checkpoint-evaluating flex justify-start items-center gap-4">
                                                { checkpointModalDetails.checked ? <Checks color="green" size={30} weight="duotone"></Checks> : <CircleDotDashed  color="orange" size={20}/> }
                                                { checkpointModalDetails.checked ? 'تم التحقق' : 'لم يتم التحقق منها بعد'}
                                                { checkpointModalDetails.checked || role != 'organizer' ? <></> : 
                                                
                                                    <button onClick={() => checkACheckpoint(checkpointModalDetails)} className="check bg-primary w-fit p-1 text-black text-[15px] rounded-md self-end">
                                                        سجّل التحقق
                                                    </button>
                                                
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <></>
                    }

                    {
                        createCheckpointModal ? 

                            <div className="absolute w-full h-full z-50 bg-transparent backdrop-blur-sm text-[#d0f0428e] text-2xl flex items-center justify-center">
                                <div className="checkpoint-details relative overflow-hidden w-[500px] h-[500px] bg-[#eee] rounded-2xl p-8 border-2 border-primary">
                                    
                                    <Save className="absolute left-0 -bottom-[50px] opacity-[0.5]" weight="duotone" size={200} />
                                    <div className="fore w-full h-full absolute left-0 top-0 p-8">
                                        <div className="header flex justify-between">
                                            <div className="checkpoint-title flex items-center gap-2 font-bold text-black">
                                                <Signpost weight="duotone" size={40}></Signpost>
                                                <div>
                                                    <Input onInput={($event) => setCheckpointForm((form) => { return { ...form, title: $event.target.value } })}  className="bg-transparent text-xl" placeholder="العنوان"></Input>
                                                </div>
                                            </div>
                                            <button onClick={() => setCreateCheckpointModal(false)}>
                                                <X color={'#333'} fontWeight={"duotone"} />
                                            </button>
                                        </div>
                                        <div className="checkpoint-body pt-10 flex flex-col gap-6 text-xl text-black">
                                            <div className="checkpoint-date">تاريخ التسجيل : { convertUtcToLocale(+createCheckpointDetails.eventDay).date }</div>
                                            <div className="checkpoint-executors">المنفذين : 
                                                <ToggleGroup className="border-r-primary border-r-2 border-dotted flex items-end justify-end  pt-5" type="multiple" onValueChange={(val) => setCheckpointForm((form) => {return {...form, executorsIds: val} })}>
                                                    { createCheckpointDetails.team.accounts.map((a) => {
                                                        return <div className={ `flex flex-col justify-end items-end`}>
                                                            <ToggleGroupItem className={`flex items-center gap-2 mr-2 ml-2 p-2 text-sm rounded-lg ${checkpointForm?.executorsIds.includes(a.id) ? "bg-primary" : ''}`} value={a.id}>
                                                                <User></User>
                                                                {a.name}
                                                            </ToggleGroupItem> 
                                                        </div> 
                                                    })}
                                                </ToggleGroup>
                                            </div>
                                            <div className="checkpoint-description overflow-auto max-h-40"> 
                                                شرح : <span style={{lineHeight: 2.1}} className="bg-[#3331] pr-4 p-2 pl-4 rounded-md border-r-4">
                                                    <Textarea onInput={($event) => setCheckpointForm((form) => { return { ...form, description: $event.target.value } })} ></Textarea>
                                                </span>
                                            </div>
                                            <div className="checkpoint-evaluating flex justify-start items-center gap-4">
                                                { 
                                                    savingCheckpoint ? <Lottie options={loadingAnimationOptions} width={50}/> :
                                                    <button onClick={() => saveCheckpoint()} className="check flex justify-center gap-5 items-center bg-primary w-fit p-1 text-black text-[15px] rounded-md self-end">
                                                        سجّل 
                                                        <Save />
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <></>
                    }

                    <div className="event-workspace flex gap-6 h-full w-full">

                        <animated.div style={{...tableSprings}} className="event-section">
                                
                            <table className="w-full overflow-auto">
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
                                {

                                eventInfo.participants.length ?
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
                                                                            <div className={ `checkpoint backdrop-blur-md rounded-2xl p-4 text-xs w-5 h-5 absolute left-[40%] top-[-18px] flex items-center justify-center ${datesTeamsMap[eventDay].includes(participant.team.id) ? 'bg-[#d0f0428e] outline-3 outline-dotted outline-[#d0f0428e]' : ''}` }>
                                                                                <DropdownMenu onOpenChange={(state) => state ? loadCheckpointsForADay(participant.team.id, eventDay) : () => {}}>
                                                                                    <DropdownMenuTrigger>
                                                                                        <div>
                                                                                            <Signpost size={25} weight="bold" color="#eee" opacity={0.09} />
                                                                                        </div>
                                                                                    </DropdownMenuTrigger>
                                                                                    <DropdownMenuContent sideOffset={15} className="z-20  border-2 bg-primary border-[#d0f0428e] p-2 rounded-xl">
                                                                                        <DropdownMenuLabel className="text-xl text-black">
                                                                                            نقاط تقدم الفعالية
                                                                                        </DropdownMenuLabel>
                                                                                        <DropdownMenuSeparator className="bg-muted h-[1px] mt-2" />
                                                                                        {
                                                                                            loadingDayCheckpoints ? <>loading</> :
                                                                                            <>
                                                                                                {
                                                                                                checkpointsListModalData?.length ?  checkpointsListModalData.map((checkpoint) => {
                                                                                                    return <> <DropdownMenuItem  onClick={() => showCheckpoint(checkpoint)} className="flex cursor-pointer items-center gap-2 justify-end text-xl pt-2">
                                                                                                            <div className="checkpoint-title text-sm text-black">
                                                                                                                {checkpoint.title}
                                                                                                            </div>
                                                                                                            <DiamondsFour size={14} color="black"/>
                                                                                                        </DropdownMenuItem>
                                                                                                        <DropdownMenuSeparator className="bg-[#1112] h-[1px] mt-2" />
                                                                                                    </>
                                                                                                    }) : <div className="text-black">لا يوجد نقاط تقدم في هذااليوم</div>
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                    </DropdownMenuContent>
                                                                                </DropdownMenu>
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

                                                                            <DropdownMenu  onOpenChange={(state) => state ? loadCheckpointsForADay(participant.team.id, eventDay) : () => {}} modal={true}>
                                                                                <DropdownMenuTrigger asChild>
                                                                                    <button>
                                                                                        <Signpost size={25} weight="bold" color="#d0f0428e" />
                                                                                    </button>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent sideOffset={15} className="z-20  border-2 bg-primary border-[#d0f0428e] p-2 rounded-xl">
                                                                                    <DropdownMenuLabel className="text-xl text-black">
                                                                                        نقاط تقدم الفعالية
                                                                                    </DropdownMenuLabel>
                                                                                    <DropdownMenuSeparator className="bg-muted h-[1px] mt-2" />
                                                                                    {
                                                                                        loadingDayCheckpoints ? <>loading</> :
                                                                                        <>
                                                                                            {
                                                                                                checkpointsListModalData?.length ?  checkpointsListModalData.map((checkpoint) => {
                                                                                                    return <> <DropdownMenuItem  onClick={() => showCheckpoint(checkpoint)} className="flex cursor-pointer items-center gap-2 justify-end text-xl pt-2">
                                                                                                        <div className="checkpoint-title text-sm text-black">
                                                                                                            {checkpoint.title}
                                                                                                        </div>
                                                                                                        <DiamondsFour size={14} color="black"/>
                                                                                                    </DropdownMenuItem>
                                                                                                    <DropdownMenuSeparator className="bg-[#1112] h-[1px] mt-2" />
                                                                                                    </>
                                                                                                }) : <div className="text-black">لا يوجد نقاط تقدم في هذااليوم</div>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                    {
                                                                                        role == "teamLeader" ?  <DropdownMenuItem autoSave>
                                                                                            <Button  onClick={() => createCheckpoint({ team: participant.team, eventDay })} className="text-lg rounded-xl mt-3 mb-1 w-[100%] gap-3 bg-[#d0f0428e] cursor-pointer h-[30px]">
                                                                                                <Plus/> اضِف
                                                                                            </Button>
                                                                                        </DropdownMenuItem> : <></>
                                                                                    }
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

                                    : <div className="text-5xl flex items-center justify-center backdrop-blur-lg absolute z-10 font-extrabold w-[100%] h-full">لا يوجد متسابقين حتى الآن</div>
                                }
                            </table>

                        </animated.div>
                        
                        <div className="finish max-h-full flex items-center mt-24 pt-2 pr-1 w-[60px] border-2 border-[#3337] border-opacity-[0.1] rounded-lg">
                            <button onClick={() => toggleEventSection()} className="rotate-90">
                                النتيجة
                            </button>
                        </div>

                        <animated.div style={{...evaluatingSectionSprigns}} className="flex flex-col items-center justify-start pt-20 gap-10 overflow-hidden evaluating-section">
                            
                            {
                                role == 'organizer' ?  
                                <>

                                {

                                    eventInfo.style == 'competetive' ? <div className="descirption text-3xl flex itmes-center gap-4 font-extrabold">
                                        انتهت الفعالية . الآن عليك تقييم المتنافسين
                                        <div onClick={() => resetTeamsEvaluation()} className="cursor-pointer reset-evaluation border-2 flex gap-2 items-center text-sm rounded-lg p-2">
                                            اعد التقييم
                                            <RefreshCw className="text-primary" size={20}></RefreshCw>
                                        </div>
                                    </div> :  

                                    <div className="descirption text-3xl flex itmes-center gap-4 font-extrabold">
                                        انتهت الفعالية  . قم بإنهائها كي تتوزع النقاط بشكل متساوٍ على المشتركين
                                    </div>

                                }

                                    <div className="evaluate-panel flex gap-5 justify-around items-center">
                                        {
                                            eventInfo.participants.map((p) => {
                                                return <div className="flex flex-col items-center gap-2">
                                                    { 
                                                        eventInfo.style == "competetive" ? <>
                                                            <button disabled={isTeamHasEvaluation(p.team.id)} onClick={() => evaluateTeam(p.team.id)} style={{marginTop: teamsEvaluation[p.team.id] + 5 + "px"}} className={ `relative bg-primary text-[#333] font-extrabold text-xl rounded-lg p-14` }>
                                                                {!isTeamHasEvaluation(p.team.id) ? <div className="next-degree absolute top-1 left-1 rounded-xl border-2 border-[#333] w-8 h-8">{nextDegree}</div>: <></>}
                                                                {p.team.name}
                                                            </button>
                                                            <div className="degree text-center border-dashed border-[1px] border-primary w-full rounded-lg">
                                                                {teamsEvaluation[p.team.id]}
                                                            </div>
                                                        </> : <>
                                                            <button style={{marginTop: teamsEvaluation[p.team.id] + 5 + "px"}} className={ `relative bg-primary text-[#333] font-extrabold text-xl rounded-lg p-14` }>
                                                                {p.team.name}
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                            })
                                        }
                                    </div>
                                    <button disabled={eventInfo?.participants.length != Object.keys(teamsEvaluation).length} onClick={() => finishTheEvent()} className="bg-primary w-[80%] p-5 rounded-lg text-2xl text-[#333]">انهي الفعالية</button>
                                </> :
                                    <div>
                                        هذه الصفحة مخصصة فقط لمنظمي الفعالية
                                    </div>
                            }

                        </animated.div>

                    </div>

                </div>
            </div> : <></>
            }

        </>
    )

}

