// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles.css";

// import App from "./App";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

//so here we are using (or not?) 'createRoot' for rendering the React app then 'StrictMode' to catch mistakes
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/Store'; // Import redux store

import App from './App'; // our main App component

ReactDOM.render(
  <Provider store={Store}> 
    <App />
  </Provider>,
  document.getElementById('root')
); //this provides the Redux store to the entire app
