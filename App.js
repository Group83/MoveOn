import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nManager } from "react-native";
import { Header } from 'react-native-elements';


//Pages
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AddPatient from './Pages/AddPatient';
import ActivityBoard from './Pages/ActivityBoard';
import AddActivity from './Pages/AddActivity';
import PatientPage from './Pages/PatientPage';
import Dashboard from './Pages/Dashboard';

const Stack = createNativeStackNavigator();

// export const languageRestart = async () => {
//   //changing language based on what was chosen
//   if (I18nManager.isRTL) {
//     await I18nManager.forceRTL(false);
//   } else {
//     if (!I18nManager.isRTL) {
//       await I18nManager.forceRTL(true);
//       await I18nManager.allowRTL(true);
//     }
//   }
// };

export default function App() {

  // //changing language based on what was chosen
  // languageRestart();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'
      options={{
        headerBackColor: 'white',
      }}
      
      >
        <Stack.Screen name='Log in' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Sign Up' component={SignUp} />
        <Stack.Screen name='Add Patient' component={AddPatient} />
        <Stack.Screen name='Activity Board' component={ActivityBoard} />
        <Stack.Screen name='Add Activity' component={AddActivity} />
        <Stack.Screen name='Patient Page' component={PatientPage} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
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
