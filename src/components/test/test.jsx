import React from 'react';
import {Navigate} from "react-router-dom";

function Test(props) {
    if (true) return <Navigate to='/form'/>
    return (
        <div>Да заработай ты уже наконец</div>
    );
}

export default Test;