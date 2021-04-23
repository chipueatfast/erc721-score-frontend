import React from 'react';
import { GlobalContext } from 'GlobalContext';
import { Random } from 'components/Random';

function App() {
  const { web3 } = React.useContext(GlobalContext);
  React.useEffect(() => {
    web3.eth.getAccounts().then(console.log);
  }, []);

  return (
    <div className="App">
      <Random />
    </div>
  );
}

export default App;
