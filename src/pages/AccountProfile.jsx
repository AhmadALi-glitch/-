import { httpClient } from '@/http';
import '../../app/profile.css';
import { DiamondsFour } from 'phosphor-react';
import { useEffect, useState } from 'react';

export default function AccountProfilePage() {

  const [loading, setLoading] = useState(true)
  const [accountData, setAccountData] = useState({})

  useEffect(() => {

    httpClient.get('/account/get-my-info').then((result) => {
      console.log(result)
      setAccountData(result.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })
    
  }, [])

  return (
      loading ? 
        <div>loading the account data</div> : <section className="profile-page">
            <div className="page-wrapper profile-wrapper">
              <div className="info">
                <img src="https://avatars.githubusercontent.com/u/152053291?v=4" alt="Profile Image" className="profile-img" />
                <ul className="info-list">
                  <li>{accountData.join_date_utc}</li>
                  {/* <li>{accountData}</li> */}
                  <li>الفريق : {accountData.team ? accountData.team.name : "لا يوجد"}</li>
                  <li>قام بتنظيم : {accountData.organizing.length}</li>
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
                  مرحبا انا عبد الرحمن خالد من مصر اعمل كمهندس برمجيات هدفي هنا ان اقوم بانشاء الفعاليات وتنظيمها والتنسيق بين الفرق ايضاً لدي شغف بكتابة القصص لذا اقضي معظم وقتي في ماراثونات الكتابة
                </p>
                <div className="events">
                  <h3>الفعاليات الحالية</h3>
                  <div className="boxes-wrapper">
                    <div className="box">
                      <h4>ينظم الآن</h4>
                      <span><DiamondsFour /> لا شيء</span>
                    </div>
                    <div className="box">
                      <h4>مشترك الآن في</h4>
                      <span><DiamondsFour /> ماراثون كتابة شعر نثري</span>
                    </div>
                  </div>
                </div>
                <div className="achievements">
                  <h3>الانجازات</h3>
                  <div className="boxes-wrapper">
                    <div className="box">
                      <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                      موقع تعليم التصميم
                    </div>
                    <div className="box">
                      <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                      موقع تعليم التصميم
                    </div>
                    <div className="box">
                      <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                      موقع تعليم التصميم
                    </div>
                    <div className="box">
                      <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                      موقع تعليم التصميم
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </section>
  )

}
