import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackRoute from './src/routes/StackRoute';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <StackRoute />
    </NavigationContainer>
    </Provider>
  );
};

export default App;