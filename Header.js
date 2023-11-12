// Header.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.newComponent}>
      <Image
        source={require("./images/clublink.jpg")}
        style={styles.lpic}
      />
      <Text>Welcome to the clublink</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  newComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "white",
    width: 400,
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20
  },
  lpic: {
    width: 50,
    height: 50,
  }
});

export default Header;
