import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Sprite from './Sprite';
import Cloud from './Cloud';

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }


const PlayField = ()=>{  
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const [height, setHeight] = useState(0)
    const [isJumping, setIsJumping] = useState(true)
    const [spritePosition, setSpritePosition] = useState(0)
    const [isMovingLeft, setIsMovingLeft] = useState(false)
    const [isStay, setIsStay] = useState(true)
    const [cloudsArray, setCloudsArray] = useState([])
    const [jumpBottom, setJumpBottom] = useState(0) 
    let jumpingTimerId
    let fallingTimerId
    let cloudsTimerId

    //creatng clouds
    useEffect(()=>{
        let tempBottom = 100
        let tempArray = []
        for(let i=0; i<8; i++){
            tempArray.push([
                randomInteger(0, screenWidth-150), tempBottom
            ])
            tempBottom += 100
        }
        console.log(tempArray)
        setCloudsArray(tempArray)
    }, [screenWidth])

    useEffect(()=>{
        cloudsTimerId = setTimeout(()=>{
            let tempArray = cloudsArray
            if(cloudsArray[0][1]<0){
                tempArray.shift()
                tempArray.push([
                    randomInteger(0, screenWidth-150), screenHeight
                ])
            }
            setCloudsArray(tempArray.map((item)=>{
                return [item[0], item[1]-2]
            }))
        }, 60)

        return ()=>{clearInterval(cloudsTimerId)}
    }, [cloudsArray])

    //jumping mechanic
    useEffect(()=>{
        if(isJumping){
            jumpingTimerId = setInterval(()=>{
                setHeight(height => height+1)
                
                if(height+5>(jumpBottom+120)){
                    setHeight(height => height-10)
                    setIsJumping(isJumping=>!isJumping)
                }

            }, 60) 
            return ()=>{clearInterval(jumpingTimerId)}
        }
        else{

            cloudsArray.map((item)=>{
                let xCoord = item[0]
                let yCoord = item[1]
                if(
                    (height-5<yCoord+100 && height+5>yCoord) &&
                    (spritePosition<xCoord+125 && spritePosition>xCoord)
                ){
                    setJumpBottom(yCoord)
                    console.log("jump")
                }
            })

            fallingTimerId = setInterval(()=>{
               

                setHeight(height => height-1)
                if(height<jumpBottom+5){
                    setIsJumping(isJumping=>!isJumping)
                    setHeight(height => height+10)
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
                {
                    cloudsArray.map((item, i)=>{
                        return <Cloud cloudLeft={item[0]} cloudBottom={item[1]} key={i}/>
                    })
                }

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

