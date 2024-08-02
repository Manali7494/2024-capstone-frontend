import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../config';

function Profile({ user }) {
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch(`${config.backend_url}/users/${user.id}/profile`);
      if (!response?.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfileData(data);
    }

    fetchProfile();
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        Name:
        <input type="text" id="name" value={profileData.name} readOnly />
      </div>
      <div>
        Username:
        <input type="text" id="username" value={profileData.username} readOnly />
      </div>
      <h2>Contact Information</h2>
      <div>
        Contact Email:
        <input type="email" id="email" value={profileData.email} readOnly />
      </div>
      <div>
        Contact Number:
        <input type="text" id="phone" value={profileData.phone} readOnly />
      </div>
      <button type="button">Edit Contact</button>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Profile;
