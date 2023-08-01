import React from 'react';
import "./EditActivityBar.css"
function EditActivityBar(props) {
    return (
        <div className='Main_activity_bar'>
            <div className='activity_bar_title'><h2>Редактирование активности</h2></div>
            <div className='activity_bar_menu'>
                <ul>
                    <li><button>Изменить</button></li>
                    <li><button>Удалить</button></li>

                </ul>
            </div>
        </div>
    );
}

export default EditActivityBar;