import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";


const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

const PopupWithForm = lazy(() => import('profile/PopupWithForm').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

const App = () => (
  <div className="container">
    <PopupWithForm />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)