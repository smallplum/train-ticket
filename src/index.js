import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App.jsx';
// import UseContext from './UseContext.jsx';
import UseMemo from './UseMemo.jsx';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <UseContext></UseContext> */}
    <UseMemo></UseMemo>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
