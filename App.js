import {SafeAreaView, Text, View} from 'react-native';
import Routes from './src/navigators/Routes';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};
export default App;
