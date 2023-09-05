import React from 'react';
import {
    changeIdEntryThunk,
    changeNote,
    deleteIdEntryThunk,
    editActivityBar, fillActivityThunk,
} from '../../../redux/ProfileReducer';
import {useDispatch, useSelector} from 'react-redux';
import NoteModal from './NoteModal';
import Modify from "./NoteModal.module.css";

function NoteModify(props) {
    const dispatch = useDispatch();
    const { valueOfEntryAmount, valueOfEntryDescription } = useSelector(state => state.Chart_Modals);
    const {FlagChangeNote, LastId, StatusView} = useSelector(state => state.Profile)

    const deleteNoteFunction = ()=>{
        dispatch(deleteIdEntryThunk({idEntry: props.entry_id, LastId, StatusView}))
    }

    return (
        <div className={Modify.Main_activity_bar}>
            <div onClick={()=>dispatch(editActivityBar(false))} className={Modify.CrossBlock}><img src="/images/cross.png" alt="Cross" className={Modify.close_modify_img}/></div>
            <div className={Modify.activity_bar_title}><h2>Редактирование записи</h2></div>
            <div className={Modify.activity_bar_menu}>
                <ul>
                    <li><button onClick={()=>dispatch(changeNote(true))}>Изменить</button></li>
                    <li><button onClick={deleteNoteFunction}>Удалить</button></li>

                </ul>
            </div>
            <NoteModal
                statusVisibleWindow={FlagChangeNote}
                title="Изменение записи"
                onSubmitHandler={(data) => dispatch(changeIdEntryThunk({idEntry: props.entry_id, changesNoteObj: data,LastId, StatusView}))}
                onCloseHandler={() => changeNote(false)}
                selectOptions={null} // Здесь передаем значение null, так как в EditNote компоненте нет блока select с option
                buttonText="Изменить"
                valueOfEntryDescription = {valueOfEntryDescription}
                valueOfEntryAmount = {valueOfEntryAmount}
            />
        </div>

    );
}

export default NoteModify;
