import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, VideoDataProvider } from "./contexts/";

ReactDOM.render(
  <React.StrictMode>
    <VideoDataProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </VideoDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
