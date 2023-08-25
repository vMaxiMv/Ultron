import React from 'react';
import {createIdActivityThunk, setIdActivity, changeNote, setFlagCreateNote} from '../../../redux/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
import NoteModal from './NoteModal';
import Modify from './NoteModal.module.css'
function NoteCreate(props) {
    const dispatch = useDispatch();
    const idActivity = useSelector((state) => state.Profile.Id_activity);
    const FlagCreateNote = useSelector((state)=> state.Profile.FlagCreateNote)

    //const activityButtons = Object.entries(props.ActivityButtons);

    const handleSelectChange = (event) => {
        dispatch(setIdActivity(event.target.value));
    };

    return (
        <div>

            <NoteModal
                statusVisibleWindow={FlagCreateNote}
                title="Создание записи"
                onSubmitHandler={(data) => dispatch(createIdActivityThunk({idActivity: idActivity, changesNoteObj: data}))}
                onCloseHandler={() => setFlagCreateNote(false)}
                selectOptions={props.ActivityButtons}
                buttonText="Создать"
                handleSelectChange={handleSelectChange}
                resetId_activity={()=> dispatch(setIdActivity(null))}
            />
        </div>

    );
}

export default NoteCreate;