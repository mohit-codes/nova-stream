import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, VideoDataProvider, UserDataProvider } from "./contexts/";

ReactDOM.render(
  <React.StrictMode>
    <VideoDataProvider>
      <AuthProvider>
        <UserDataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserDataProvider>
      </AuthProvider>
    </VideoDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
