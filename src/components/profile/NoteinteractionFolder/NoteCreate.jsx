import React from 'react';
import { createIdActivityThunk, setIdActivity, changeNote } from '../../../redux/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
import NoteModal from './NoteModal';
import Modify from './NoteModal.module.css'
function NoteCreate(props) {
    const dispatch = useDispatch();
    const idActivity = useSelector((state) => state.Profile.Id_activity);

    //const activityButtons = Object.entries(props.ActivityButtons);

    const handleSelectChange = (event) => {
        dispatch(setIdActivity(event.target.value));
    };

    return (
        <div className={Modify.Main_activity_bar}>
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