import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import promo from "./promo";
import clubbers from "./clubbers";
import React from 'react';

  const tab = createBottomTabNavigator() // this got to be out the tab


  export default function App() {

  
  return (

    
      <NavigationContainer independent="true">
        <tab.Navigator>
          <tab.Screen name="home" component={Home}/>
          <tab.Screen name="promoters" component={promo}/>
          <tab.Screen name="clubbers" component={clubbers}/> 
        </tab.Navigator>
        <StatusBar style="auto"/>
      </NavigationContainer>
   
  );
}

const Home = () =>{
  return(
    <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to the club link app where we connect club goers and promoters together 
        </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
   color:"black"
  }
});
