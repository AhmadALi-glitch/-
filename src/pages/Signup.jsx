import { IdentificationCard } from "phosphor-react";
import { UserCircle } from "phosphor-react";
import { ShieldCheck } from "phosphor-react";
import { Input } from "@/components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import '../../app/globals.css';
import '../../app/signup.css';

export default function SignupPage() {
  return (
    <section className="signup-page">
      <div className="info">
        <img src="src/assets/logo/logo-dark.svg" alt="Logo" />
        <h1>زمرّد</h1>
        <p>
          اشترك مع فريق عندما 
          تشعر انك ستكون صاحب تأثير
          ايجابي به
        </p>
        <ul className="bullets">
          <li></li>
          <li></li>
          <li></li>
          <li className="active"></li>
          <li></li>
        </ul>
      </div>
      <form>
        <div className="row">
          <span className="icon">
            <span className="card-icon">
              <IdentificationCard />
            </span>
            من انت
          </span>
          <div className="inputs">
            <div className="field">
              <label>الاسم</label>
              <Input type="text" />
            </div>
            <div className="field">
              <label>المهن</label>
              <ToggleGroupDemo />
            </div>
          </div>
        </div>
        <div className="profile-image-row">
          <img src="https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" alt="profile image" />
          <div className="box">
            <span className="user-icon">
              <UserCircle />
            </span>
            الصورة الشخصية
          </div>
        </div>
        <div className="safe-bar">
          <span className="shield-icon">
            <ShieldCheck />
          </span>
          الحماية
        </div>
        <div className="row">
          <div className="inputs">
            <div className="field">
              <label>البريد الإلكتروني</label>
              <Input type="email" />
            </div>
            <div className="field">
              <label>كامة المرور</label>
              <Input type="password" />
            </div>
          </div>
        </div>
        <button className="submit-btn" type="submit">انشئ</button>
      </form>
    </section>
  );
}

function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        استاذ
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        طالب
      </ToggleGroupItem>
    </ToggleGroup>
  );
}