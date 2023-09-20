import React from 'react';
import Modal from "react-modal";
import SelectAction from "./selectActionModal.module.css";
import {useDispatch, useSelector} from "react-redux";
import { RemoveActivityModalAC} from "../../../redux/FlagsBooleanReducer";
import {deleteActivityThunk, deleteIdEntryThunk, editActivityBar} from "../../../redux/ProfileReducer";
import Modify from "./NoteModal.module.css";

function RemoveActivityModalComponent(props) {
    const {RemoveActivityModal,StatusView} = useSelector(state => state.Flags_Reducer)
    const {SelectedActivity } = useSelector(state => state.Profile)
    const dispatch = useDispatch()

    const deleteActivity = ()=>{
        dispatch(deleteActivityThunk(SelectedActivity.activity_id))
    }
    const closeModal = () => {
        dispatch(RemoveActivityModalAC(false));
    };
    return (
        <div>
            <Modal
                isOpen={RemoveActivityModal}
                onRequestClose={closeModal}
                className={SelectAction.overlay}
                overlayClassName={SelectAction.content}
            >
                <div>
                    <div className={Modify.activity_bar_title}><h2>Вы действитейльно хотите удалить активность?</h2></div>
                    <div className={Modify.activity_bar_menu}>
                        <ul>
                            <li><button onClick={deleteActivity}>Удалить</button></li>
                            <li><button onClick={closeModal}>Отмена</button></li>

                        </ul>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default RemoveActivityModalComponent;