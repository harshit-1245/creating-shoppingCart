import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux"
import StackNavigator from './navigation/StackNavigator';
import store from './store';

export default function App() {
  return (
 <>
 {/* redux setup */}
 <Provider store={store}>
 <StackNavigator/>
 </Provider>
 </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
