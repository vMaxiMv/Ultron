import React, {useEffect} from 'react';
import {
    setIdActivity,
    setFlagCreateNote,
    createIdEntryThunk
} from '../../../redux/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
import NoteModal from './NoteModal';
import Modify from './NoteModal.module.css'
function NoteCreate(props) {
    const dispatch = useDispatch();
    const idActivity = useSelector((state) => state.Profile.Id_activity);
    const FlagCreateNote = useSelector((state)=> state.Profile.FlagCreateNote)
    const SelectedActivity = useSelector(state => state.Profile.SelectedActivity)

    // useEffect(()=>{
    //     dispatch(setIdActivity(SelectedActivity.activity_id))
    // }, [FlagCreateNote])

    //const activityButtons = Object.entries(props.ActivityButtons);

    const handleSelectChange = (event) => {
        dispatch(setIdActivity(event.target.value));
    };

    return (
        <div>
            <NoteModal
                statusVisibleWindow={FlagCreateNote}
                title="Создание записи"
                onSubmitHandler={(data) => dispatch(createIdEntryThunk({idActivity: idActivity, changesNoteObj: data}))}
                onCloseHandler={() => setFlagCreateNote(false)}
                selectOptions={props.ActivityButtons}
                buttonText="Создать"
                handleSelectChange={handleSelectChange}
                resetId_activity={()=> dispatch(setIdActivity(null))}
                defaultValue ={new Date().toISOString().slice(0, 10)}
            />
        </div>

    );
}

export default NoteCreate;