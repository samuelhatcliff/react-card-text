import React, { useState, useEffect } from "react";

const Card = ({code, suite, image, value}) => {
    const name = `${value} of ${suite}`
    return (
        <div>
            <img src={image} alt={name}/>
        </div>
    )
    
}


export default Card;
