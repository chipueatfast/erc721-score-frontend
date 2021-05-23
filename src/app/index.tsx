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
import { JudgePage } from 'pages/JudgePage';
import { JudgePageV2 } from 'pages/JudgePageV2';
import { askForConnect } from 'services/askForConnect';
import { getWeb3 } from 'GlobalContext';
import './index.d';
import { CandidatePage } from 'pages/CandidatePage';

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
      <Router>
        <div className="App">     
              <nav>
                <ul>
                    <li>
                      <Link to="/judge">Judge</Link>
                    </li>
                    <li>
                      <Link to="/candidate">Candidate</Link>
                    </li>
                </ul>
              </nav>
              <span>
                {userAddress}
                <br/>
                ---------------------
              </span>
              <Switch>
                <Route path='/judge'>
                  <JudgePageV2
                    userAddress={userAddress}
                  />
                </Route>
                <Route path='/candidate'>
                  <CandidatePage />
                </Route>
              </Switch>      
          </div>
        </Router>
      </FirebaseDatabaseProvider>
  );
}

export default App;
