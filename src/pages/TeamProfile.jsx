import { useSearchParams } from 'react-router-dom';
import '../../app/team-profile.css';
import { DiamondsFour } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { getTeamInfo } from '@/service/teams';
import { loadingContext, loadingReducerContext } from './App';
import { convertUtcToLocale } from '@/utils/date';

export default function TeamProfilePage() {

  let pointsBannersMap = {
    '0-100': ['star'],
    '100-200': ['star'],
    '200-300': ['star', 'star'],
    '300-400': ['star', 'star', 'star'],
    '400-500': ['potheus'],
    '500-600': ['potheus', 'potheus'],
    '600-700': ['potheus', 'potheus', 'potheus'],
    '700-800': ['lotus'],
    '800-900': ['lotus', 'lotus'],
    '900-1000': ['lotus', 'lotus', 'lotus'],
    '1000-1500': ['crown'],
    '1500-2000': ['crown', 'crown'],
    '2000-3000': ['crown', 'crown', 'crown'],
    '3000': ['ace']
  }

  let getXpPointsRange = (points) => {
    if(!points) return [];
    let result = null;
    for(let range in pointsBannersMap) {
      if(range.split('-')[0] <= points && range.split('-')[1] >= points ) {
        result = pointsBannersMap[range]
      }
    }
    if(!result && points > 3000) return ['ace']
    return result
  } 
  
  let [params, _] = useSearchParams()
  console.log(params.get('teamId'))

  let [loading, setLoading] = useState(true)
  let [team, setTeam] = useState(null)
  
  useEffect(() => {
    getTeamInfo(params.get("teamId")).then((res) => {
      setTeam(res.data)
      setLoading(false)
      console.log(res)
    })
  }, [])

  return (

    !loading ? 
      <section className="team-profile-page">
        <div className="page-wrapper profile-wrapper">
          <div className="info">
            <div className="shield">
              <img src="https://penji.co/wp-content/uploads/2019/06/team-empire-esports-team-logo.jpg" alt="Team Image" className="team-img" />
            </div>
            <ul className='info-list'> 
              <li>تاريخ التأسيس : {convertUtcToLocale(team.create_date_utc).date}</li>
              <li>عدد الفعاليات المشترك بها : {team.events?.length} </li>
              <li>عدد الإنجازات : {team.achievments?.length}</li>
            </ul>
            <div className="members">
              <h3>الأعضاء</h3>
              <div className="members-wrapper">
                {
                  team.accounts.map((acc) => {
                    return <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
                  })
                }
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <h2 className='font-main font-extrabold text-2xl'>{ team.name }</h2>
              <div className="flex items-end">
                {
                  getXpPointsRange(team.xp_points).map((level) => {
                    return <img style={{width: '70px'}} src={ `src/assets/banners/${level}-banner.svg` } alt="Banner" />
                  })
                }
                +{
                  team.xp_points
                }
              </div>
            </div>
            <ul className="stats">
              <li>{team.id}</li>
              <li>{team.xp_points} : نقطة خبرة</li>
            </ul>
            <p>
              { team.about }
            </p>
            <div className="events">
              <h3>الفعاليات الحالية</h3>
              <div className="boxes-wrapper">
                <div className="box">
                  <h4>مشترك الآن في</h4>
                  <div>
                    {
                      team.enrolledIn.length ?
                      
                      team.enrolledIn.map((e) => {
                        return  <div className='flex items-center gap-2'>
                          <DiamondsFour />
                          <div className="event-name">{e.name}</div>
                        </div>
                      })
                      : <div className='flex items-center gap-2'>
                        <DiamondsFour />
                        <div className="event-name">لا يوجد</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="achievements">
              <h3>الانجازات</h3>
              <div className="boxes-wrapper">
                {
                  team.achievments.length ? 

                    team.achievments.map((ac) => {
                      <div className="box">
                        <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                        {ac.name}
                      </div>
                    })
                  : <div className="box">
                    <img src="src/assets/achievment-badge.svg" alt="Badge Icon" />
                    لا يوجد
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      : <>loading</>
  );
}

