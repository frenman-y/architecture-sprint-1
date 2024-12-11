import React, { lazy }  from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const CardsTestControl = lazy(() => import('cards/CardsTestControl').catch(() => {
      return { default: () => <div className='error'>Component is not available!</div> };
    })
 ); 

const AuthTestControl = lazy(() => import('auth/AuthTestControl').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
); 

const ProfileTestControl = lazy(() => import('profile/ProfileTestControl').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
); 

const App = () => (
  <div className="container">
    <CardsTestControl></CardsTestControl>
    <AuthTestControl></AuthTestControl>
    <ProfileTestControl></ProfileTestControl>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)