import React, {useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Animated} from 'react-native';
import HomeSprite from "./HomeSprite"
import {Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);

const PlayField = ()=>{  
    console.log('render')
    const [height, setHeight] = useState(0)
    
    function sprite(heightValue){
        return {
            width: 150,
            height: 150,
            resizeMode: "stretch",
            position: "absolute",
            bottom: heightValue
        }
    }

    function jump(){
        if(height<30){
            console.log(height)
            setHeight(height+5)
        }
        
    }

    setInterval(jump, 500)

    return (
            <ImageBackground source={require('../images/field_background.jpeg')} style={styles.backgroundImage} >
                <View style={styles.container}>
                    <Image source={require('../images/sprite.png')} style={sprite(height)}/>
                </View>
            </ImageBackground>
        
    );
}
export default PlayField

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage:{
        flex: 1,
        height: '100%',
        width: '100%'
    },

})

