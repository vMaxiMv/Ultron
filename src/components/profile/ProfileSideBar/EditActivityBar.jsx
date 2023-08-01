import React, {useEffect} from 'react';
import "./EditActivityBar.css"
import {DeletIdEnteryThunk, FillActivityThunk} from "../../../redux/ProfileReducer";
import {useDispatch} from "react-redux";
function EditActivityBar(props) {
    const dispatch = useDispatch()
    return (
        <div className='Main_activity_bar'>
            <div className='activity_bar_title'><h2>Редактирование активности</h2></div>
            <div className='activity_bar_menu'>
                <ul>
                    <li><button>Изменить</button></li>
                    <li><button onClick={()=>dispatch(DeletIdEnteryThunk(103))}>Удалить</button></li>

                </ul>
            </div>
        </div>
    );
}

export default EditActivityBar;