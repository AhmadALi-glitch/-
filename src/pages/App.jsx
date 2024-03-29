
import { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "./loadingPage";
import { animated, easings, useSpring } from "@react-spring/web";
import { accountContext, accountReducerContext } from "@/state/account";
import { getMyAccountInfo, login } from "@/service/account";
import { useLocation, useResolvedPath, useRoutes } from "react-router-dom";
import Demo from "@/demo";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const loadingContext = createContext({
    loading: false
})
export const loadingReducerContext = createContext(null)


export default function App({children}) {

  let [loading, setLoading] = useState(true)
  let [account, setAccount] = useState({name: null, email: null})

  let location = useLocation()

  useEffect(() => {
    if(!account.name) {
      console.log('my account data', location.pathname)
      setLoading(true)
      getMyAccountInfo().then((result) => {
        console.log("My Account Info", result)
        if(result.data) {
          setAccount(result.data)
        }
        setLoading(false)
      }).catch((err) => console.log(err))
    }
  }, [])


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

  let runLoadingAnimation = (state) => {

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
            <ThemeProvider defaultTheme='dark' storageKey='emerald-theme'>

                <accountContext.Provider value={account}>
                  <accountReducerContext.Provider value={setAccount}>


                          { loading ?


                            <animated.div style={{...loadingSprings}} className="w-svw h-svh">
                              <LoadingPage />
                            </animated.div> :
                            
                            <animated.div style={{...pageSprings}} className="children">

                              <div className="bg-background flex flex-col w-svw h-svh pl-10 pr-10 pt-6 font-main overflow-auto">
                                
                                <div className="w-full border-b-[3px] border-[#A8BE69] pb-[1px] border-opacity-[0.1] flex justify-between items-center gap-2 text-[#C9DF8A]">

                                  <div className="logo basis-[95%]">
                                      <img width={50} src="src/assets/logo/logo.svg"></img>
                                  </div>

                                  { account.email ? <>
                                      <Navbar />
                                    </> : <></>
                                  }

                                </div>

                                <div className="page basis-[100%]">
                                  { children }
                                </div>

                              </div>
                            </animated.div>

                          }


                  </accountReducerContext.Provider>
                </accountContext.Provider>

            </ThemeProvider>
        </loadingReducerContext.Provider>
      </loadingContext.Provider>
    </>
  )

}

