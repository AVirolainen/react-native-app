
import React from 'react';

import {Image} from 'react-native';


const Sprite=({spriteBottom, spritePosition,  isLeft})=>{
    let transformValue = isLeft ? { scaleX: -1, scaleY: 1 } : { scaleX: 1, scaleY: 1 }
    return(
        <Image 
        source={require('../images/sprite.png')} 
        style={{
            width: 150,
            height: 150,
            resizeMode: "stretch",
            position: "absolute",
            bottom: spriteBottom,
            left: spritePosition,
            transform: [transformValue]
        }}/>
    )
}

export default Sprite
