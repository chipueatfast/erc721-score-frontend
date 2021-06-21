import React, { useState } from 'react';
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/database';
import { config } from 'firebase-service/config';
import { JudgePageV2 } from 'pages/JudgePageV2';
import { askForConnect } from 'services/askForConnect';
import { getWeb3 } from 'GlobalContext';
import './index.d';
import { Header } from 'component/Header';
import { SearchPage } from 'pages/SearchPage';
import { UpdateTokenPage } from 'pages/UpdateTokenPage';
import HomePage from 'pages/HomePage';
import JudgePageV3 from 'pages/JudgePageV3';
import ExamRoomPage from 'pages/ExamRoomPage';
import { UserAddressContext } from '../context/userAddressContext';
import ResultExamRoomPage from 'pages/ResultExamRoomPage';

function App() {
  const [isEthEnabled, setIsEthEnabled] = useState<boolean>(false);
  const [userAddress, setUserAddress] = React.useState<string>('');
  React.useEffect(() => {    
    askForConnect().then((rs) => {
      setIsEthEnabled(rs);
      if (!rs) {
        return;
      }
      getWeb3().eth.getAccounts().then(accounts => {
        if (accounts && accounts[0]) {
          setUserAddress(accounts[0]);
        }
      });
    });
  }, []);
  if (!isEthEnabled) {
    return <div>
      Please install a wallet plugin such as Metamask to use this dapp.
    </div>
  }

  return (
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <UserAddressContext.Provider value={userAddress}>
        <Router>
          <div className="App">     
                <Header
                  userAddress={userAddress}
                />
                <Switch>
                  <Route path='/judgeV3'>
                    <JudgePageV3 />
                  </Route>
                  <Route path='/:subject/:roomId/result-exam-room'>
                    {
                      (routeProps) => {
                        if (routeProps.match?.params.roomId && routeProps.match?.params.subject) {
                          return <ResultExamRoomPage subject={routeProps.match.params.subject} roomId={routeProps.match?.params.roomId} />
                        }
                      }
                    }
                  </Route>
                  <Route path='/exam-room'>
                    <ExamRoomPage />
                  </Route>
                  <Route path='/mint'>
                    <JudgePageV2
                      userAddress={userAddress}
                    />
                  </Route>
                  <Route path='/update'>
                    <UpdateTokenPage 
                      userAddress={userAddress} 
                    />
                  </Route>
                  <Route path='/search'>
                    <SearchPage />
                  </Route>
                  <Route path='/'>
                    <HomePage />
                  </Route>
                </Switch>      
            </div>
          </Router>
      </UserAddressContext.Provider>
      </FirebaseDatabaseProvider>
  );
}

export default App;
