import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import Loading from "./Components/common/Loading.jsx";
import { Provider } from "react-redux";
import { Store } from "./redux/store/store.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ToastContainer />
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
