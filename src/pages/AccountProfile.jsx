import '../../app/profile.css';
import { DiamondsFour } from 'phosphor-react';

export default function AccountProfilePage() {
  return (
    <section className="profile-page">
      <div className="page-wrapper profile-wrapper">
        <div className="info">
          <img src="https://avatars.githubusercontent.com/u/152053291?v=4" alt="Profile Image" className="profile-img" />
          <ul className="info-list">
            <li>تاريخ الانضمام : 2024\1\1</li>
            <li>عدد الفعاليات المتشرك بها : 55</li>
            <li>الفريق : تطوير</li>
            <li>قام بتنظيم 4 فعالية</li>
            <li>عدد التقييمات الايجابية :  30</li>
          </ul>
        </div>
        <div className="content">
          <h2>عبد الرحمن خالد</h2>
          <ul className="stats">
            <li>مهندس برمجيات</li>
            <li>1000 نقطة خبرة</li>
            <li>فريق : تطوير</li>
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
  );
}
