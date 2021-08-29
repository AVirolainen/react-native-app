import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Sprite from './Sprite';


const PlayField = ()=>{  
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [height, setHeight] = useState(0)
    const [isJumping, setIsJumping] = useState(true)
    const [spritePosition, setSpritePosition] = useState(0)
    const [isMovingLeft, setIsMovingLeft] = useState(false)
    const [isStay, setIsStay] = useState(true)

    let jumpingTimerId
    let fallingTimerId



    //jumping mechanic
    useEffect(()=>{
        if(isJumping){
            
            jumpingTimerId = setInterval(()=>{
                setHeight(height => height+3)
                if(height==60){
                    setIsJumping(isJumping=>!isJumping)
                }
            }, 60) 
            return ()=>{clearInterval(jumpingTimerId)}
        }
        else{
            fallingTimerId = setInterval(()=>{
                setHeight(height => height-3)
                if(height==0){
                    setIsJumping(isJumping=>!isJumping)
                }
            }, 60)
            return ()=>{clearInterval(fallingTimerId)}
        }
    }, [height])

    useEffect(()=>{
        if(!isMovingLeft && !isStay){
            setSpritePosition(spritePosition=>spritePosition+1)
        }
        else if(isMovingLeft && !isStay){
            setSpritePosition(spritePosition=>spritePosition-1)
        }
    }, [spritePosition, isStay])

    //handle moving left/right
    const handleMoving=(direction)=>{
        setIsStay(false)
        if(direction == "right"){
            setIsMovingLeft(false)
        }
        else{
            setIsMovingLeft(true)
        }
    }


    const unHandleMoving=()=>{
        setIsStay(true)
    }
    

    return (
    
        <ImageBackground source={require('../images/field_background.jpeg')} style={styles.backgroundImage} >
            <View style={styles.container}>
                <Sprite spriteBottom={height} spritePosition={spritePosition}/>

                <View style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    bottom: 30,
                    left: screenWidth-10-100,
                }}>
                    <TouchableWithoutFeedback 
                    onPressIn={()=>{handleMoving('right')}}
                    onPressOut={()=>{unHandleMoving()}}>
                        <Image 
                            source={require('./sprites/arrow.png')} 
                            resizeMode='contain' 
                            style={{
                                width: 100,
                                height: 100,
                                transform: 'rotate(90deg)'
                            }}/>
                    </TouchableWithoutFeedback>
                </View>
                
                <View style={{
                            width: 100,
                            height: 100,
                            position: "absolute",
                            bottom: 30,
                            left: 10,
                    }}>
                    <TouchableWithoutFeedback
                    onPressIn={()=>{handleMoving('left')}}
                    onPressOut={()=>{unHandleMoving()}}>
                        <Image 
                            source={require('./sprites/arrow.png')} 
                            resizeMode='contain' 
                            style={{
                                width: 100,
                                height: 100,
                                transform: 'rotate(270deg)'
                            }}/>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        </ImageBackground>
            
        
    )
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

