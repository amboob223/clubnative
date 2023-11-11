import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function Home() { // this is the first page
  return (
 <View style={styles.container}>
    <Header/>
       <View style={styles.container}>
      <Image
        source={require("./images/clublink.jpg")}
        style={styles.image}
      />
      </View>
      
        
      <Text style={styles.container}>
        Welcome to the Clublink where we connect promoters with club goers
      </Text>
    
   
      
    <StatusBar style='auto'/>
    </View>
  );
}
function Header(){
  return (
        <View style={styles.newComponent}>
        <Image
          source={require("./images/clublink.jpg")}
          style={styles.lpic}
        />
          <Text>Welcome to the clublink

          </Text>
          </View>
  )
}
function Navbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Promo' component={Promo}/>
        <Tab.Screen name='Clubbers' component={Clubbers}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//prmo
function Promo(){
  return(<View style={styles.container}>
      <Header/>
      <View style={styles.container}>
    
    <Text style={styles.container}>
      Promoters tap in 
    </Text>
      </View>
  </View>)
}

function Clubbers(){
  return(<View style={styles.container}>
    <Header/>
    <View style={styles.container}>
      <Image
        source={require("./images/clublink.jpg")}
        style={styles.image}
      />
      </View>

  </View>)
}




export default function App() {//this is for the whole app
  return (

    <Navbar />
  );
}

const styles = StyleSheet.create({
  container: {   
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"black",
    color:"white"
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    resizeMode: "cover"
  },
  newComponent: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: 'center',
    backgroundColor:"white",
    width:400,
    marginTop:20,
    paddingRight:20,
    paddingLeft:20 
  },
  lpic:{
    width:50,
    height:50, 
  
  }
});
