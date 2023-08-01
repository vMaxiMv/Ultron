import React from 'react';
import "./test.css"
function Test(props) {
    return (
        <div className='test'>
            <div className='test_title'><h2>Редактирование активности</h2></div>
            <div className='test_menu'>
                <ul>
                    <li><button>Изменить</button></li>
                    <li><button>Удалить</button></li>

                </ul>
            </div>
        </div>
    );
}

export default Test;