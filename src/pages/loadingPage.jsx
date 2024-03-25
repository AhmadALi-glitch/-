
import glossary from "../glossary/data.json"

import Lotus1 from "../glossary/lotus1"
import Lotus2 from "../glossary/lotus2"
import Lotus3 from "../glossary/lotus3"

import Ace1 from "../glossary/ace1"
import Ace2 from "../glossary/ace2"

import Potheus1 from "../glossary/potheus1"
import Potheus2 from "../glossary/potheus2"
import Potheus3 from "../glossary/potheus3"

import Crown1 from "../glossary/crown1"
import Crown2 from "../glossary/crown2"
import Crown3 from "../glossary/crown3"

import Star1 from "../glossary/star1"
import Star2 from "../glossary/star2"
import Star3 from "../glossary/star3"
import Star4 from "../glossary/star4"

import Emerald1 from "../glossary/emerald1"
import Emerald2 from "../glossary/emerald2"

import Lottie from "react-lottie"
import sparksAnimationData from "../assets/lottiefiles/sparks.json"
import { animated, easings, useSpring, useTransition } from "@react-spring/web"
import "../../app/animation.css"
import { useEffect } from "react"
import loadingAnimationData from "../assets/lottiefiles/loading.json"

export default function LoadingPage() {

    let [slice1Springs, slice1SpringsApi] = useSpring(() => {
        return {
            from: {
                transform: 'translateY(-100px)',
                opacity: 0
            },
            to: {
                transform: 'translateY(0)',
                opacity: 1
            },
            config: {
                duration: 1000,
                easing: easings.easeOutQuad
            }
        }
    })
    
    let [slice2Springs, slice2SpringsApi] = useSpring(() => {
        return {
            from: {
                transform: 'translateY(-250px)',
                opacity: 0
            },
            to: {
                transform: 'translateY(0)',
                opacity: 1
            },
            config: {
                duration: 1000,
                easing: easings.easeOutQuad
            }
        }
    })

    let sparksAnimationOptions = {
        animationData: sparksAnimationData,
        autoplay: true,
        loop: true,
        isPausedWhenClick: false
    }

    let loadingAnimationOptions = {
        animationData: loadingAnimationData,
        autoplay: true,
        loop: true,
        isPausedWhenClick: false
    }

    let components = {
        'Lotus1': <Lotus1></Lotus1>,
        'Lotus2': <Lotus2></Lotus2>,
        'Lotus3': <Lotus3></Lotus3>,
        'Ace1': <Ace1></Ace1>,
        'Ace2': <Ace2></Ace2>,
        'Potheus1': <Potheus1></Potheus1>,
        'Potheus2': <Potheus2></Potheus2>,
        'Potheus3': <Potheus3></Potheus3>,
        'Star1': <Star1></Star1>,
        'Star2': <Star2></Star2>,
        'Star3': <Star3></Star3>,
        'Star4': <Star4></Star4>,
        'Crown1': <Crown1></Crown1>,
        'Crown2': <Crown2></Crown2>,
        'Crown3': <Crown3></Crown3>,
        'Emerald1': <Emerald1></Emerald1>,
        'Emerald2': <Emerald2></Emerald2>,
    }

    let chooseRandomTip = function() {
        let keys = Object.keys(glossary)
        let randomIndex = Math.ceil(Math.random() * keys.length - 1);
        let data = glossary[keys[randomIndex]]
        let componentName = keys[randomIndex]
        return [data, componentName]
    }

    let [data, componentName] = chooseRandomTip()

    return (
        <>
            <div className="flex flex-col w-full h-full font-main">
                <div className="wrapper basis-[100%] flex items-center justify-center gap-2 ">
                    <div className="tip text-center line-clamp-6 relative h-full basis-[50%] flex justify-center items-center">
                        <animated.div className="content text-xl w-[50%] font-extrabold text-[#C9DF8A]" style={{...slice1Springs, lineHeight: 1.6}}>
                            {
                                data
                            }
                        </animated.div>
                        <div className="floating-sparks absolute right-0 opacity-5 text-white">
                            <Lottie isClickToPauseDisabled={true} style={{cursor: "auto"}} width={400} options={sparksAnimationOptions} />
                        </div>
                    </div>
                    <div className="separator w-[2px] bg-[#C9DF8A] opacity-[0.06] h-[400px]"></div>
                    <animated.div style={{...slice2Springs}} className="basis-[50%] flex bg-blend-hard-light justify-center items-center">
                        {
                            components[componentName] 
                        }
                    </animated.div>   
                </div>
                <div className="basis-[10%] pl-10 font-extrabold self-end text-[#C9DF8A]">
                    <Lottie isClickToPauseDisabled={true} style={{cursor: "auto"}} width={80} options={loadingAnimationOptions} />
                </div>
            </div>
        </>
    )

}

