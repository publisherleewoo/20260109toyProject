import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./slice/memberSlice.js";

const store = configureStore({
   reducer: {
      ms: memberSlice,
   },
});

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
      ,
   </Provider>
);
