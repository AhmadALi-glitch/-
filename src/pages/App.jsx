
import { createContext, useEffect, useReducer, useState } from "react";
import LoadingPage from "./loadingPage";
import { animated, easings, useSpring } from "@react-spring/web";

export const loadingContext = createContext({
    loading: false
})
export const loadingReducerContext = createContext({
    loading: false
})


export default function App({children}) {

  let [loading, setLoading] = useState(false)

  let [pageSprings, pageSpringsApi] = useSpring(() => {
    return {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        duration: 1000,
        easing: easings.easeInOutExpo
      }
    }
  })

  let [loadingSprings, loadingSpringsApi] = useSpring(() => {
    return {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        duration: 1000,
        easing: easings.easeInOutExpo
      }
    }
  })

  let runLoadingAnimation = function(state) {


    if(!state) {

      setTimeout(() => {
        pageSpringsApi.start({
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          },
          config: {
            duration: 1000,
            easing: easings.easeOutExpo
          }
        })
        setLoading(state)
      }, 1000)

      loadingSpringsApi.start({
        from: {
          opacity: 1
        },
        to: {
          opacity: 0
        },
        config: {
          duration: 1000,
          easing: easings.easeOutExpo
        }
      })

    } else {
      setLoading(state)
      loadingSpringsApi.start({
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        },
        config: {
          duration: 1000,
          easing: easings.easeOutExpo
        }
      })
    }

  }

  return (
    <>
      <loadingContext.Provider value={loading}>
        <loadingReducerContext.Provider value={runLoadingAnimation}>
          { loading ? <animated.div style={{...loadingSprings}} className="w-svw h-svh">
            <LoadingPage />
          </animated.div> :
          <animated.div style={{...pageSprings}} className="children">
            { children }
          </animated.div> }
        </loadingReducerContext.Provider>
      </loadingContext.Provider>
    </>
  )

}

