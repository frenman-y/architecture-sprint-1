import React, { lazy, Suspense } from "react";

const Profile = lazy(() =>
  import("user_profile/Profile").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Places = lazy(() =>
  import("gallery/Places").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

function Main() {
  return (
    <main className="content">
      <Suspense>
        <Profile />
        <Places />
      </Suspense>
    </main>
  );
}

export default Main;
