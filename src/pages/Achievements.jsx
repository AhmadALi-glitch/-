import achievementsArr from '../assets/achievements.json';
import { CaretCircleLeft, Diamond } from "phosphor-react";
import '../../app/achievements.css';

export default function Achievements() {
  return (
    <section className="achievements-page">
      <div className="page-wrapper">
        <div className="content">
          <h2>الانجازات</h2>
          <div className="achievements-wrapper">
            {
              achievementsArr.map(ach => {
                return <AchievementBox key={ach.id} achievementData={ach} />;
              })
            }
          </div>
        </div>
        <aside>
          <p>
            <Diamond />
            هنا يمكنك رؤية كل الانجازات      
            التي تم تسجيلها من قبل اعضاء الموقع   
          </p>
          <div className="inputs">
            <input type="text" placeholder="نوع الفعالية" />
            <input type="text" placeholder="المنظم" />
            <input type="text" placeholder="الفرق" />
            <input type="text" placeholder="المحتوي" />
          </div>
        </aside>
      </div>
    </section>
  );
}

function AchievementBox({ achievementData }) {
  return (
    <div className="box">
      <h3>{achievementData.title}</h3>
      <div className="body">
        <div className="col">
          <div className="teams">
            <span>الفريق</span>
            <div className="imgs">
              <img src={achievementData.teams[0]} alt="Team" />
              <img src={achievementData.teams[1]} alt="Team" />
              <img src={achievementData.teams[2]} alt="Team" />
              <img src={achievementData.teams[3]} alt="Team" />
            </div>
          </div>
          <div className="organizer">
            <span>المنظم</span>
            <img src={achievementData.organizer} alt="Organizer" />
          </div>
        </div>
        <div className="col">
          <a href="#" className='btn'>معلومات الفعالية <CaretCircleLeft /></a>
          <span>تاريخ الإنجاز: {achievementData.endDate}</span>
        </div>
      </div>
    </div>
  );
}