import React from 'react';
import {
    changeIdEntryThunk,
    deleteIdEntryThunk,
    editActivityBar
} from '../../../redux/ProfileReducer';
import {
    changeNote
} from '../../../redux/FlagsBooleanReducer'
import {useDispatch, useSelector} from 'react-redux';
import NoteModal from './NoteModal';
import Modify from "./NoteModal.module.css";
import SelectAction from "./selectActionModal.module.css"
import Modal from "react-modal";


function NoteModify(props) {
    const dispatch = useDispatch();
    const { valueOfEntryAmount, valueOfEntryDescription } = useSelector(state => state.Chart_Reducer);
    const { LastId, SelectedActivity } = useSelector(state => state.Profile)
    const {FlagChangeNote,StatusView} = useSelector(state=>state.Flags_Reducer)
    const {IsEditActivityBarVisible} = useSelector(state => state.Profile)
    const deleteNoteFunction = ()=>{
        dispatch(deleteIdEntryThunk({idEntry: props.entry_id, ActivitySendingId: SelectedActivity.activity_id , StatusView}))
    }
    const closeModal = () => {
        dispatch(editActivityBar(false));
    };
    return (
        <div>

            <Modal
                isOpen={IsEditActivityBarVisible}
                onRequestClose={closeModal}
                className={SelectAction.overlay}
                overlayClassName={SelectAction.content}
            >
                <div>
                    <div onClick={()=>dispatch(editActivityBar(false))} className={Modify.CrossBlock}><img src="/images/cross.png" alt="Cross" className={Modify.close_modify_img}/></div>
                    <div className={Modify.activity_bar_title}><h2>Редактирование записи</h2></div>
                    <div className={Modify.activity_bar_menu}>
                        <ul>
                            <li><button onClick={()=>dispatch(changeNote(true))}>Изменить</button></li>
                            <li><button onClick={deleteNoteFunction}>Удалить</button></li>

                        </ul>
                    </div>
                </div>
            </Modal>

            <NoteModal
                statusVisibleWindow={FlagChangeNote}
                title="Изменение записи"
                onSubmitHandler={(data) => dispatch(changeIdEntryThunk({idEntry: props.entry_id, changesNoteObj: data,ActivitySendingId: SelectedActivity.activity_id, StatusView}))}
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
