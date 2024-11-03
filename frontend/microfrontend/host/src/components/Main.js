import React, { lazy } from 'react';

const ProfileControl = lazy(() => import('profile/ProfileControl').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));

const PhotosControl = lazy(() => import('photos/PhotosControl').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));

function Main({ currentUser }) {
  return (
    <main className="content">
      <ProfileControl/>
      <PhotosControl 
        currentUser={currentUser}
      />
    </main>
  );
}

export default Main;
