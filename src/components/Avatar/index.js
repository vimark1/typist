import React from 'react';
import Avatar from 'react-avatar';

export default function({ user, size = 40, round = true}) {

  const getGoogleId = () => {
    const googleData = user.providerData.find(item => item.providerId === 'google.com') || {};
    return googleData.uid;
  }

  const googleId = getGoogleId();

  return (
    <Avatar googleId={googleId} name={user.displayName} email={user.email} round={round} size={size} />
  );

}

