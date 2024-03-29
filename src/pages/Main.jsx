
// import { Flag, UserCircle, UsersThree, House } from "phosphor-react"
import { ArrowCircleLeft } from "phosphor-react";
import '../../app/home.css';
import { useEffect, useState } from "react";
import { getRunningEvents, getScheduledEvents } from "@/service/event";
import { useNavigate } from "react-router-dom";


export default function MainPage() {

  let [loadingEvents, setLoadingEvents] = useState(true)
  let [runningEvents, setRunningEvents] = useState(null)
  let [scheduledEvents, setScheduledEvents] = useState(null)

  useEffect(() => {
    Promise.all([
      getRunningEvents(),
      getScheduledEvents()
    ]).then((result) => {
      console.log(result)
      setRunningEvents(result[0].data.events)
      setScheduledEvents(result[1].data.events)
      setLoadingEvents(false)
    })
  }, [])


  return (
    <>
     {
        !loadingEvents ? 
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td colSpan="8">الفعاليات</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="main-cell">الفعاليات الجارية</td>
                  {
                    runningEvents.map((re) => {
                      return <td><EventBox description={re.description} title={re.title} id={re.id} /></td>
                    })
                  }
                </tr>
                <tr>
                  <td className="main-cell">الفعاليات القادمة</td>
                  {
                    scheduledEvents.map((re) => {
                      return <td><EventBox description={re.description} title={re.title} id={re.id} /></td>
                    })
                  }
                </tr>
              </tbody>
            </table>
          </div> :
        <>loading</>
     }
    </>
  )
}

function EventBox({title, description, id}) {
  let navigator = useNavigate()
  return (
    <div className="box">
      <h3>{ title }</h3>
      <p>{ description }</p>
      <a className="cursor-pointer" onClick={() => navigator(`/event?event_id=${id}`)}><ArrowCircleLeft /></a>
    </div>
  );
}