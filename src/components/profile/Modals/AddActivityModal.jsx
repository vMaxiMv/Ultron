import React, {useState} from 'react';
import M from './/Modals.module.css'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {ActivityModalVisibleAC, createActivityThunk} from "../../../redux/ProfileReducer";
import Modify from "../NoteinteractionFolder/NoteModal.module.css";
function AddActivityModal(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [checkBoxActivityBoolean, setCheckBoxActivityBoolean] = useState(false)

    const onSubmit = async (data) => {
        try {
            // const addActivityObj = {
            //     name: data.name,
            //     notification_text: data.notification_text,
            //     checkBoxValue: checkBoxActivityBoolean ? 1 : 0
            // };

          //  await dispatch(createActivityThunk({ addActivityObj }));
            (props.onSubmitHandler(data))


        } catch (error) {
            console.error('Ошибка при создании активности:', error);
            // Обработка ошибок
        }
    };

    const CloseModalActivityHanldeClick = ()=>{
        // dispatch(ActivityModalVisibleAC(false))
        dispatch(props.CloseModalActivityHanldeClick)
    }
    return (
        <div className={M.modalBackground}>
            <div className={M.modalContainer}>
                <h3>{props.title}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={M.centeredInputs}>
                        <input {...register('name')} type="text" placeholder="Название активности"/>

                        <input {...register('notification_text')} type="text" placeholder="Уведомление"/>

                        <input type="checkbox" onChange={() => setCheckBoxActivityBoolean(!checkBoxActivityBoolean)}/>

                    </div>
                    <div className={M.buttonContainer}>
                        <button className={M.buttonChangeStyles} type="submit">
                            Отправить
                        </button>
                        <button className={M.buttonChangeStyles} onClick={CloseModalActivityHanldeClick}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddActivityModal;