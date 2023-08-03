import React from 'react';
import "./EditActivityBar.css"
import {changeNoteAC, DeletIdEnteryThunk} from "../../../redux/ProfileReducer";
import {useDispatch} from "react-redux";

import CreateNote from "./CreateNote";




function CreateActivityForm(props) {
    const dispatch = useDispatch()

    return (
        <div className='Main_activity_bar'>
            <div className='activity_bar_title'><h2>Редактирование активности</h2></div>
            <div className='activity_bar_menu'>
                <ul>
                    <li><button onClick={()=>dispatch(changeNoteAC(true))}>Создать</button></li>
                </ul>
            </div>
            <CreateNote ActivityButtons={props.ActivityButtons}/>
        </div>
    );
}

export default CreateActivityForm;