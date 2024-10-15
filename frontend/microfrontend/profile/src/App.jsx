import React from "react";
import ReactDOM from "react-dom/client";
import EditProfilePopup from "./components/EditProfilePopup";
import "./index.css";

const App = () => (
  <div className="container">
    <EditProfilePopup />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)