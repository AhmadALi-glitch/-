
// import { Flag, UserCircle, UsersThree, House } from "phosphor-react"
import { ArrowCircleLeft } from "phosphor-react";
import '../../app/home.css';


export default function MainPage() {
  return (
    <>
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
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
            </tr>
            <tr>
              <td className="main-cell">الفعاليات القادمة</td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
              <td><EventBox /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function EventBox() {
  return (
    <div className="box">
      <h3>ماراثون كتابة</h3>
      <p>شرح شرح شرح شرح</p>
      <a href="#"><ArrowCircleLeft /></a>
    </div>
  );
}