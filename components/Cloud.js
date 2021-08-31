import React from 'react';
import {Image} from 'react-native';


const Cloud=({cloudBottom, cloudLeft})=>{
   
    return(
        <Image 
        source={require('./sprites/cloud.png')} 
        style={{
            width: 125,
            height: 100,
            resizeMode: "stretch",
            position: "absolute",
            bottom: cloudBottom,
            left: cloudLeft
        }}/>
    )
}

export default Cloud
