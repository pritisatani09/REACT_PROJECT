import React from 'react';
import './UserProfileCard.css';

const UserProfileCard = ({ name, email, profilePicture, birthday, age, field, location, phone }) => {
  return (
    <div className="profile-card-wrapper">
      <div className="profile-card-left">
        <img src={profilePicture} alt={`${name}'s profile`} className="profile-pic" />
      </div>
      <div className="profile-card-right">
        <h2>{name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Birthday:</strong> {birthday}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Field:</strong> {field}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;


