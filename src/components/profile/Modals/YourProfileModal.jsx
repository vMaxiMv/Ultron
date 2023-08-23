import React from 'react';
import {LogoutThunk} from "../../../redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import Output from './/YourProfileModal.module.css'
import Modal from "react-modal";
import {OutputWindowIsOpenAC} from "../../../redux/ProfileReducer";

function YourProfileModal(props) {
    const dispatch = useDispatch()
    const OutputWindowIsOpen = useSelector(state => state.Profile.OutputWindowIsOpen)
    const CloseModal = ()=>{
        dispatch(OutputWindowIsOpenAC(false))
    }
    return (
        <>
            <Modal
            isOpen = {OutputWindowIsOpen}
            onRequestClose = {CloseModal}
            shouldCloseOnOverlayClick={true}
            className={Output.overlay}
            overlayClassName={Output.content}
            >
        <div className={Output.modal}>
            <h3>Ваше имя</h3>
            <div className={Output.btn}> <button onClick={() => dispatch(LogoutThunk())}>Выйти</button></div>
        </div>
            </Modal>
        </>
    );
}

export default YourProfileModal;