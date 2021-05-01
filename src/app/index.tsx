import React from 'react';
import { Random } from 'components/Random';
import { askForConnect } from 'services/askForConnect';
import './index.d';
import { getWeb3 } from 'GlobalContext';

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
    <div className="App">
      <Random />
      <span>
        {userAddress}
      </span>
    </div>
  );
}

export default App;
