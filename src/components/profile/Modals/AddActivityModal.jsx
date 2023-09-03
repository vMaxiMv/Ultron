import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Modal from "react-modal";
import Modify from "./NoteModal.module.css";

function AddActivityModal(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [checkBoxActivityBoolean, setCheckBoxActivityBoolean] = useState(false)

    const onSubmit = async (data) => {
        try {
            (props.onSubmitHandler(data))

        } catch (error) {
            console.error('Ошибка при создании активности:', error);
            // Обработка ошибок
        }
    };

    const closeModal = ()=>{

        dispatch(props.CloseModalActivityHanldeClick)
    }
    return (
        <Modal
            isOpen={props.OpenModalActivity}
            onRequestClose={closeModal}
            className={Modify.overlay}
            overlayClassName={Modify.content}>
                <h3>{props.title}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={Modify.form_main_block}>
                        <input {...register('name')} type="text" placeholder="Название активности" className={Modify.inputField}/>

                        <input {...register('notification_text')} type="text" placeholder="Уведомление" className={Modify.inputField}/>

                        <input type="checkbox" onChange={() => setCheckBoxActivityBoolean(!checkBoxActivityBoolean)}/>

                    </div>
                    <div className={Modify.buttonBlockChangeStyles}>
                        <button className={Modify.buttonChangeStyles} type="submit">
                            Отправить
                        </button>
                        <button className={Modify.buttonChangeStyles} onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
                </form>

        </Modal>
    );
}

export default AddActivityModal;