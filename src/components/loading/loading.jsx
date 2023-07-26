import loading from './../../images/loading-4.gif'
import React from 'react';

function Loading(props) {
    return (
        <div style={{width:' 300px'}}>
            <img style={{ width: '100%', height: 'auto' }} src={loading}/>
        </div>
    );
}

export default Loading;