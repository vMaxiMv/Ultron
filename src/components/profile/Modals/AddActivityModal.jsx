import React from 'react';
import M from './/Modals.module.css'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {createActivityThunk} from "../../../redux/ProfileReducer";
import Modify from "../NoteinteractionFolder/NoteModal.module.css";
function AddActivityModal(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const addActivityObj = {
                name: data.name,
                notification_text: data.notification_text,
            };

            await dispatch(createActivityThunk({ addActivityObj }));


        } catch (error) {
            console.error('Ошибка при создании активности:', error);
            // Обработка ошибок
        }
    };

    return (
        <div className={M.modalBackground}>
            <div className={M.modalContainer}>
                <h3>Добавление активности</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('name')} type="text" placeholder="Введите число" />
                    <br />
                    <input {...register('notification_text')} type="text" placeholder="Введите текст" />
                    <br />
                    <button className={M.buttonChangeStyles} type="submit">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddActivityModal;