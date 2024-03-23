import postsArr from '../assets/posts.json';
import currentEvents from '../assets/current-events.json';
import upcommingEvents from '../assets/upcomming-events.json';
import  { ArrowCircleLeft } from "phosphor-react";
import '../../app/home-page.css';

export default function MainPage() {
  return (
    <main className="home-page">
      <div className="page-wrapper">
        <div className="posts">
          {
            postsArr.map(post => {
              return <Post postData={post} key={post.id} />
            })
          }
        </div>
        <aside>
          <h3>الفعاليات الجارية</h3>
          <div className="block">
            {
              currentEvents.map(event => {
                return <EventLink key={event.id}>{event.content}</EventLink>
              })
            }
          </div>
          <h3>الفعاليات القادمة</h3>
          <div className="block">
            {
              upcommingEvents.map(event => {
                return <EventLink key={event.id}>{event.content}</EventLink>
              })
            }
          </div>
        </aside>
      </div>
    </main>
  );
}

function Post({ postData }) {
  let profilePic = postData.profilePic !== ""
    ? postData.profilePic
    : postData.userGender === "male"
    ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png"
    : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";

  return (
    <div className="post">
      <div className="user">
        <img src={profilePic} alt={postData.userName} />
        <div className="info">
          <h4>{postData.userName}</h4>
          <span>{postData.date}</span>
        </div>
      </div>
      <p className="text">{postData.postText}</p>
      <button className="comment-btn">تعليق</button>
    </div>
  );
}

function EventLink({ children }) {
  return (
    <a href="#">
      {children} 
      <span><ArrowCircleLeft /></span>
    </a>
  );
}