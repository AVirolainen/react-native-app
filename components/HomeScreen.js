import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Animated} from 'react-native';
import HomeSprite from "./HomeSprite"

const HomeScreen = ({ navigation }) => { 
    return (
          <ImageBackground source={require('../images/background.png')} style={styles.backgroundImage} >
            <View style={styles.container}>
              <Image source={require('../images/logo.png')} style={styles.logoImage}/>  
              <HomeSprite />  
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlayField')}>
                <ImageBackground source={require('../images/play_button.png')} style={styles.backgroundButton}>
                  <Text>                       </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
    )
}
export default HomeScreen
  
const styles = StyleSheet.create({
container: {
    justifyContent: 'center',
    alignItems: 'center',
},
backgroundImage:{
    flex: 1,
    width: null,
    height: null,
},
logoImage:{
    marginTop: 30,
    width: 250,
    justifyContent: "center",
},
button:{
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 190,
    height: 70,
},
backgroundButton:{
    width: 220,
    height: 100,
    resizeMode: "stretch",
    position: 'absolute',
}

});