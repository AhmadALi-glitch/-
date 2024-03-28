import { httpClient } from '@/http';
import '../../app/profile.css';
import { DiamondsFour } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { convertUtcToLocale, getMyTimeZone } from '@/utils/date';
import { accountContext } from '@/state/account';

export default function AccountProfilePage() {

  const [loading, setLoading] = useState(false)
  const accountData = useContext(accountContext)

  // useEffect(() => {

  //   httpClient.get(`/account/get-my-info/${getMyTimeZone().replace('/','-')}`).then((result) => {
  //     console.log(result)
  //     setAccountData(result.data)
  //     setLoading(false)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
    
  // }, [])

  return (
      loading ? 
        <div>loading the account data</div> : <section className="profile-page">
            <div className="page-wrapper profile-wrapper">
              <div className="info">
                <img src="https://avatars.githubusercontent.com/u/152053291?v=4" alt="Profile Image" className="profile-img" />
                <ul className="info-list">
                  <li>انضم في : {convertUtcToLocale(accountData.join_date_utc).date}</li>
                  {/* <li>{accountData}</li> */}
                  <li>الفريق : {accountData.team ? accountData.team.name : "لا يوجد"}</li>
                  <li>قام بتنظيم : {accountData.organizing.length} فعاليات</li>
                  {/* <li>عدد التقييمات الايجابية :  30</li> */}
                </ul>
              </div>
              <div className="content">
                <h2>{accountData.name}</h2>
                <ul className="stats">
                  {
                    accountData.professions.map((p, i) => {
                      return <li key={i}>{p}</li>
                    })
                  }
                  <li>نقاط الخبرة : {accountData.xp_points}  </li>
                  <li>فريق : {accountData.team  ? accountData.team.name : "لا يوجد"}</li>
                </ul>
                <p>
                  {accountData.about}
                </p>
                <div className="events">
                  <h3>الفعاليات الحالية</h3>
                  <div className="boxes-wrapper">
                    <div className="box overlfow-hidden">
                      <h4>ينظم الآن</h4>
                      <div className="flex flex-col gap-4 overflow-scroll max-h-[170px]">
                        {
                          accountData.organizingNow.length ? accountData.organizingNow.map((o, i) => {
                            return <>
                              <div key={i} className='flex items-center gap-2'>
                                <DiamondsFour className='text-primary'/>
                                <div>{ o.event.start_date_utc?.length > 0 ? convertUtcToLocale(+o.event.end_date_utc).date : '' }</div>
                                {/* <div>{ o.event.start_date_utc }</div> */}
                              </div> 
                            </>
                          }): <div className='flex items-center gap-2'>
                            <DiamondsFour className='text-primary'/>
                            <div>لا شيء</div>
                          </div> 
                        }
                      </div>
                    </div>

                    <div className="box">
                      <h4>فعاليات مجدولة</h4>
                      <div className="flex flex-col gap-4 overflow-scroll max-h-[170px]">
                        {
                          accountData.scheduling.length ? accountData.scheduling.map((o, i) => {
                            return <div key={i} >
                              <div className='flex items-center gap-2'>
                                <DiamondsFour className='text-primary'/>
                                {/* <div>{ o.event.start_date_utc?.length > 0 ? convertUtcToLocale(+o.event.end_date_utc).date : '' }</div> */}
                                <div>{ o.event.name }</div>
                              </div> 
                            </div>
                          }): <div className='flex items-center gap-2'>
                            <DiamondsFour className='text-primary'/>
                            <div>لا شيء</div>
                          </div> 
                        }
                      </div>
                    </div>

                    <div className="box">
                      <h4>مشترك الآن في</h4>
                        {
                          accountData.enrolledIn.length ? accountData.enrolledIn.map((event, i) => {
                            return <div key={i} >
                              <div className='flex items-center gap-2'>
                                <DiamondsFour className='text-primary'/>
                                <div>{ event.name }</div>
                              </div> 
                            </div>
                          }): <div className='flex items-center gap-2'>
                            <DiamondsFour className='text-primary'/>
                            <div>لا شيء</div>
                          </div> 
                        }
                    </div>
                  </div>
                </div>
                <div className="achievements">
                  <h3>الانجازات</h3>
                  <div className="boxes-wrapper">
                    {
                      accountData.achievments.length ? accountData.achievments.map((ach) => {
                        return <div className="box">
                            <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                            <div className="ach-name">{ ach.name }</div>
                        </div>
                      }) : <div className="box">
                            <div className="ach-name">لا يوجد انجازات حتى الآن</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
      </section>
  )

}
