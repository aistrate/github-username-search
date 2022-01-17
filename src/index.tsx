import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import store from "./app/store";
import "./index.css";

(async () => {
  // Uncomment the following lines to enable client-side mocking
  // if (process.env.NODE_ENV === "development") {
  //   const { worker } = await import("./mocks/browser");
  //   worker.start({ onUnhandledRequest: "bypass" });
  // }

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
