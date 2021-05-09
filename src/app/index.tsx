import React from 'react';
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
import { askForConnect } from 'services/askForConnect';
import { getWeb3 } from 'GlobalContext';
import './index.d';
import { CandidatePage } from 'pages/CandidatePage';

function App() {
  const [userAddress, setUserAddress] = React.useState<string>('');
  React.useEffect(() => {    
    askForConnect().then(() => {
      getWeb3().eth.getAccounts().then(accounts => {
        if (accounts && accounts[0]) {
          setUserAddress(accounts[0]);
        }
      });
    });
  }, []);
  console.log(FirebaseDatabaseProvider);

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
              </span>
              <Switch>
                <Route path='/judge'>
                  <JudgePage
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
