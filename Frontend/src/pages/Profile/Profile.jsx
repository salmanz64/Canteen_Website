import React from 'react'
import './Profile.css'
const Profile = () => {
  return (
    <div class="profile-container">
    <div class="profile-sidebar">
        <div class="profile-image-container">
          <img src="vishnu.jpeg" alt="Profile Picture" />
          <div class="camera-icon">📷</div>
        </div>
        <h2>Vishnu</h2>
        <p>User Interface Designer</p>
      </div>
    <div class="profile-content">
      <div class="profile-info">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" value="vishnu" />
        
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" value="dev" />
        
        <label for="email">Email Address</label>
        <input type="email" id="email" value="vishnudev@gmail.com" />
        
        <label for="phone">Phone Number</label>
        <input type="text" id="phone" value="+1234567890" />
        
        <label for="address">Address</label>
        <input type="text" id="address" value="123 Street, pathanamthita" />
        
        <button class="update-btn">Update Profile</button>
      </div>
    </div>
  </div>
  )
}

export default Profile
