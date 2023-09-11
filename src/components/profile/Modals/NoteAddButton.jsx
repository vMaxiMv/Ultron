import React from 'react';
import {setFlagCreateNote} from "../../../redux/FlagsBooleanReducer";
import {setIdActivity} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";

function NoteAddButton(props) {
    const {SelectedActivity} = useSelector(state => state.Profile);
    const dispatch = useDispatch()
    const AddNoteFunction = ()=>{
        dispatch(setFlagCreateNote(true))
        dispatch(setIdActivity(SelectedActivity.activity_id))
    }
    return (
        <div> {SelectedActivity.activity_id !== null ? (<button onClick={AddNoteFunction}>Добавить запись</button>) :null}</div>
    );
}

export default NoteAddButton;