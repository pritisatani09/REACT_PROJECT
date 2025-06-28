import React from 'react';
import UserProfileCard from './components/UserProfileCard';
import './components/UserProfileCard.css';

function App() {
  return (
    <div>
      <h1 className="main-title">User Profiles</h1>
      <div className="profile-container">
        <UserProfileCard
          name="Priti Satani"
          email="priti@gmail.com"
          profilePicture="https://randomuser.me/api/portraits/women/44.jpg"
          birthday="1998-05-20"
          age={18}
          field="Full Stack Developer"
          location="Surat, India"
          phone="+91 98765 43210"
        />
        <UserProfileCard
          name="Rina Patel"
          email="rina@gmail.com"
          profilePicture="https://randomuser.me/api/portraits/women/45.jpg"
          birthday="1995-10-10"
          age={29}
          field="UI/UX Designer"
          location="Ahmedabad, India"
          phone="+91 98765 54321"
        />
        <UserProfileCard
          name="Nikita Shah"
          email="nikita@gmail.com"
          profilePicture="https://randomuser.me/api/portraits/women/46.jpg"
          birthday="1993-03-15"
          age={32}
          field="Backend Developer"
          location="Mumbai, India"
          phone="+91 98765 12345"
        />
        <UserProfileCard
          name="Anjali Mehta"
          email="anjali@gmail.com"
          profilePicture="https://randomuser.me/api/portraits/women/47.jpg"
          birthday="1990-01-25"
          age={35}
          field="Project Manager"
          location="Pune, India"
          phone="+91 98765 67890"
        />
        <UserProfileCard
          name="Kavita Joshi"
          email="kavita@gmail.com"
          profilePicture="https://randomuser.me/api/portraits/women/48.jpg"
          birthday="1992-11-12"
          age={31}
          field="Data Scientist"
          location="Bangalore, India"
          phone="+91 98765 34567"
        />

        <UserProfileCard
          name="Swati Desai"
          email="swati@gmail.com"
          profilePicture="https://randomuser.me/api/portraits/women/49.jpg"
          birthday="1996-07-08"
          age={28}
          field="Mobile App Developer"
          location="Hyderabad, India"
          phone="+91 98765 87654"
        />


      </div>
    </div>
  );
}

export default App;
