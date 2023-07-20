import loading from './../../images/loading-4.gif'
import React from 'react';

function Loading(props) {
    return (
        <div style={{width:' 700px'}}>
            <img src={loading}/>
        </div>
    );
}

export default Loading;