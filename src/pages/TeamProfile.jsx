import '../../app/team-profile.css';
import { DiamondsFour } from 'phosphor-react';

export default function TeamProfilePage() {
  return (
    <section className="team-profile-page">
      <div className="page-wrapper profile-wrapper">
        <div className="info">
          <div className="shield">
            <img src="https://penji.co/wp-content/uploads/2019/06/team-empire-esports-team-logo.jpg" alt="Team Image" className="team-img" />
          </div>
          <ul className='info-list'> 
            <li>تاريخ الانضمام : 2024\1\1</li>
            <li>عدد الفعاليات المتشرك بها : 55</li>
            <li>الفريق : تطوير</li>
            <li>قام بتنظيم  7 فعالية</li>
            <li>عدد التقييمات الايجابية :  30</li>
          </ul>
          <div className="members">
            <h3>الأعضاء</h3>
            <div className="members-wrapper">
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
              <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="Member Profile Pic" />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <h2>فريق التطوير</h2>
            <div className="banners">
              <img src="src/assets/banners/star-banner.svg" alt="Banner" />
              <img src="src/assets/banners/star-banner.svg" alt="Banner" />
              <img src="src/assets/banners/star-banner.svg" alt="Banner" />
              <img src="src/assets/banners/potheus-banner.svg" alt="Banner" />
              <img src="src/assets/banners/potheus-banner.svg" alt="Banner" />
              <img src="src/assets/banners/potheus-banner.svg" alt="Banner" />
              <img src="src/assets/banners/lotus-banner.svg" alt="Banner" />
              <img src="src/assets/banners/lotus-banner.svg" alt="Banner" />
            </div>
          </div>
          <ul className="stats">
            <li>فريق كتّاب</li>
            <li>1000 نقطة خبرة</li>
            <li>المؤسس : احمد</li>
          </ul>
          <p>
            اهلا وسهلا بك بفريقنا . نحن مجموعة من الكتاب الشغوفين من جميع المستويات مبتدئ أو محترف . هدفنا هو  ربط الكتاب
            العرب ببعضهم في ماراثونات وفعاليات كتابة ترفع الكتاب العربي عالياً !!
          </p>
          <div className="events">
            <h3>الفعاليات الحالية</h3>
            <div className="boxes-wrapper">
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

