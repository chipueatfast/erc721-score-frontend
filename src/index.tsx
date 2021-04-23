import React from 'react';
import ReactDOM from 'react-dom';
import { initResource } from 'resource-profile/initResource';
import App from './app/App';
import reportWebVitals from './misc/reportWebVitals';
import { GlobalContext } from './GlobalContext';

const {
  web3,
} = initResource();

ReactDOM.render(
  <React.StrictMode>
    <GlobalContext.Provider value={{
      web3
    }}>
       <App />
    </GlobalContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
