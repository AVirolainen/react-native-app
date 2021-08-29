import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Animated} from 'react-native';


const Sprite=({spriteBottom, spritePosition})=>{
    return(
        <Image 
        source={require('../images/sprite.png')} 
        style={{
            width: 150,
            height: 150,
            resizeMode: "stretch",
            position: "absolute",
            bottom: spriteBottom,
            left: spritePosition
        }}/>
    )
}

export default Sprite
