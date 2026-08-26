import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import Loading from "./Components/common/Loading";
import { Provider } from "react-redux";
import { Store } from "./redux/store/store";
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={Store}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ToastContainer />
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
