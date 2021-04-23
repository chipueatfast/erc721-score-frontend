import React from 'react';

export const GlobalContext = React.createContext<{
    web3: any,
  }>({
    web3: null,
  });