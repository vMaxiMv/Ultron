import React from 'react';
import {createIdActivityThunk, setIdActivity, changeNote, setFlagCreateNote} from '../../../redux/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
import NoteModal from './NoteModal';
import Modify from './NoteModal.module.css'
function NoteCreate(props) {
    const dispatch = useDispatch();
    const idActivity = useSelector((state) => state.Profile.Id_activity);
   // const FlagCreateNote = useSelector((state)=> state.Profile.FlagCreateNote)

    //const activityButtons = Object.entries(props.ActivityButtons);

    const handleSelectChange = (event) => {
        dispatch(setIdActivity(event.target.value));
    };

    return (
        <div className={Modify.Main_activity_bar}>
            <div onClick={()=>dispatch(setFlagCreateNote(false))} className={Modify.CrossBlock}><img src="/images/cross.png" alt="Cross" className={Modify.close_modify_img}/></div>
            <div className={Modify.activity_bar_title}><h2>Редактирование активности</h2></div>
            <div className={Modify.activity_bar_menu}>
                <ul>
                    <li><button onClick={()=>dispatch(changeNote(true))}>Создать</button></li>
                </ul>
            </div>
            <NoteModal
                title="Создание активности"
                onSubmitHandler={(data) => dispatch(createIdActivityThunk({idActivity: idActivity, changesNoteObj: data}))}
                onCloseHandler={() => changeNote(false)}
                selectOptions={props.ActivityButtons}
                buttonText="Отправить"
                handleSelectChange={handleSelectChange}
                resetId_activity={()=> dispatch(setIdActivity(null))}
            />
        </div>

    );
}

export default NoteCreate;