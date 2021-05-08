import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { JudgePage } from 'pages/JudgePage';
import { askForConnect } from 'services/askForConnect';
import { getWeb3 } from 'GlobalContext';
import './index.d';


function App() {
  const [userAddress, setUserAddress] = React.useState<string>();
  React.useEffect(() => {    
    askForConnect().then(() => {
      getWeb3().eth.getAccounts().then(accounts => {
        if (accounts && accounts[0]) {
          setUserAddress(accounts[0]);
        }
      });
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
              <li>
                <Link to="/judge">Judge</Link>
              </li>
          </ul>
        </nav>
        <span>
          {userAddress}
        </span>
        <Switch>
          <Route path='/judge'>
            <JudgePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
