import React from 'react';
import load from './loading.module.css'

function Loading(props) {
    return (
        <div>
            <img className={load.loading} src="/images/loading.gif" alt="Loading..."/>
        </div>
    );
}

export default Loading;