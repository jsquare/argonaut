import React from 'react';

import AreasMenu from './AreasMenu.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


const App = () => (
  <div className="container">
    <header>
      <h1>SBP</h1>
      <AccountsUIWrapper />
    </header>
    <AreasMenu title="Areas" />
  </div>
);

export default App;
