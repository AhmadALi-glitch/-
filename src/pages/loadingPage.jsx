
import glossary from "../glossary/data.json"

import Lotus1 from "../glossary/lotus1"
import Lotus2 from "../glossary/lotus2"
import Lotus3 from "../glossary/lotus3"

import Ace1 from "../glossary/ace1"
import Ace2 from "../glossary/ace2"
import Ace3 from "../glossary/ace3"

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
import Emerald3 from "../glossary/emerald3"
import { Separator } from "@radix-ui/react-dropdown-menu"

export default function LoadingPage() {

    let components = {
        'Lotus1': <Lotus1></Lotus1>,
        'Lotus2': <Lotus2></Lotus2>,
        'Lotus3': <Lotus3></Lotus3>,
        'Ace1': <Ace1></Ace1>,
        'Ace2': <Ace2></Ace2>,
        'Ace3': <Ace3></Ace3>,
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
        'Emerald3': <Emerald3></Emerald3>
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
            <div className="wrapper flex items-center justify-center gap-2 w-full h-full">
                <div className="tip text-center line-clamp-6 basis-[50%] flex justify-center items-center">
                    <div className="content w-[50%]">
                        {
                            data
                        }
                    </div>
                </div>
                <div className="separator w-[2px] bg-[#C9DF8A] opacity-[0.06] h-[400px]"></div>
                <div className="basis-[50%] flex bg-blend-lighten justify-center items-center">
                    {
                        components[componentName] 
                    }
                </div>   
            </div>
        </>
    )

}

