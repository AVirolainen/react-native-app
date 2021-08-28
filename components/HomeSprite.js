import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Animated} from 'react-native';

export default class HomeSprite extends React.Component{
    constructor(props) {
      super(props);
      this.sprite = new Animated.Value(0);
    }
  
    moveSprite = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.sprite, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 500
          }),
          Animated.timing(this.sprite, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          })
        ]),
        {
          iterations: 4000
        }
      ).start()
    };
  
    render(){  
      const yVal = this.sprite.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -200],
      });
  
      const animStyle = {
        transform: [
          {
            translateY: yVal,
          },
        ],
      };
  
      return (
        <Animated.View style={animStyle}>
            <Image source={require('../images/sprite.png')} style={styles.spriteImage}/>
        </Animated.View>
    );}
  }
  
const styles = StyleSheet.create({
spriteImage:{
    width: 200,
    height: 200,
    resizeMode: "stretch",
    marginTop: 200
}
});