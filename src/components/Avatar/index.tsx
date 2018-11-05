import React from 'react';
import Avatar from 'react-avatar';

import { User } from 'firebase';

export default function({
  user,
  size = '40',
  round = true,
}: {
  user: User;
  size: string;
  round: boolean;
}) {
  const getGoogleId = () => {
    const { providerData } = user;
    const googleProvider = providerData.find(item => item.providerId === 'google.com');
    if (googleProvider) {
      return googleProvider.uid;
    }
  };

  const googleId: string | undefined = getGoogleId();

  return (
    <Avatar
      googleId={googleId}
      name={user.displayName}
      email={user.email}
      round={round}
      size={size}
    />
  );
}
