import React from 'react';


import Auth from '../utils/auth';

const Profile = () => {

  if (!Auth.loggedIn()) {
    return (
      <h4>
      <br />
      <br />
      <br />
      <br />
      <br />
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      <br />
      <br />
      <br />
      <br />
      <br />
      </h4>
      
    );
  }

  else 

  return (
    <div>
      <div >
      <br />
      <br />
      <br />
      <br />
      <br />
        <h2 >
          Viewing {Auth.getProfile().data.username}'s profile.
        </h2>
        <br />
      <br />
      <br />
      <br />
      <br />
      </div>
    </div>
  );
};

export default Profile;
