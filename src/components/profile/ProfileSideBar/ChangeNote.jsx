import React from 'react';
import {changeNoteAC, DeletIdEnteryThunk} from "../../../redux/ProfileReducer";
import {useForm} from "react-hook-form";
import {LoginRegisterThunk} from "../../../redux/AuthReducer";
import Modal from 'react-modal'
import {useDispatch, useSelector} from "react-redux";

function ChangeNote(props) {
    const dispatch = useDispatch()
    const ChangeNote = useSelector(state=>state.Profile.ChangeNote)
    const {control, handleSubmit, reset } = useForm()


    const closeModal = () => {
        reset();
        dispatch(changeNoteAC(false))
    };
    const onSubmit = async (data)=>{
        console.log(data)
        closeModal()
    }

    return (
        <div className='Main_ChangeNote'>
            <div className='ChangeNote_title'><h2>Изменение записи</h2></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="number"placeholder="Введите число" />
                <br />
                <input type="text" placeholder="Введите текст" />
                <br />
                <input type="date" />
                <br />
                <button onClick={handleSubmit}>Отправить</button>
                <button >Отмена</button>
            </form>
        </div>
    );
}

export default ChangeNote;