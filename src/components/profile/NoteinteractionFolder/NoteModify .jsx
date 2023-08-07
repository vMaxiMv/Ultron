import React from 'react';
import {changeIdEntryThunk, changeNote, deleteIdEntryThunk} from '../../../redux/ProfileReducer';
import { useDispatch } from 'react-redux';
import NoteModal from './NoteModal';
import Modify from "./NoteModal.module.css";

function NoteModify(props) {
    const dispatch = useDispatch();

    return (
        <div className={Modify.Main_activity_bar}>
            <div className={Modify.activity_bar_title}><h2>Редактирование активности</h2></div>
            <div className={Modify.activity_bar_menu}>
                <ul>
                    <li><button onClick={()=>dispatch(changeNote(true))}>Изменить</button></li>
                    <li><button onClick={()=>dispatch(deleteIdEntryThunk(props.entry_id))}>Удалить</button></li>

                </ul>
            </div>
            <NoteModal
                title="Изменение активности"
                onSubmitHandler={(data) => dispatch(changeIdEntryThunk({idEntry: props.entry_id, changesNoteObj: data}))}
                onCloseHandler={() => changeNote(false)}
                selectOptions={null} // Здесь передаем значение null, так как в EditNote компоненте нет блока select с option
                buttonText="Отправить"
            />
        </div>

    );
}

export default NoteModify;
