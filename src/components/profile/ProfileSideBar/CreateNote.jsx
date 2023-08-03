import React from 'react';
import {changeNoteAC, createIdActivityThunk, id_enteryAC, SetId_activityAC} from "../../../redux/ProfileReducer";
import {useForm} from "react-hook-form";
import Modal from 'react-modal'
import {useDispatch, useSelector} from "react-redux";

const buttonBlockChangeStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
const buttonChangeStyles = {
    padding: '8px 12px',
    margin: '5px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
};

function CreateNote(props) {
    const dispatch = useDispatch()
    const ChangeNoteBool = useSelector(state => state.Profile.ChangeNoteBool)
    const {register, handleSubmit, reset} = useForm()
    const Id_activity = useSelector(state=>state.Profile.Id_activity)

    const closeModal = () => {
        reset();
        dispatch(changeNoteAC(false))
        dispatch(SetId_activityAC(null))
    };
    const onSubmit = async (data) => {
        dispatch(createIdActivityThunk(Id_activity, data))
        console.log(Id_activity)
        closeModal()
    }

    const handleSelectChange = (event) => {
        dispatch(SetId_activityAC(event.target.value))
        //console.log(event.target.value)
    }

    return (
        <div>
            <Modal
                isOpen={ChangeNoteBool}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        background: 'rgba(20, 20, 20, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#499eb4',
                        border: 'none',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        padding: '20px',
                        color: 'white',
                        width: '25%', // Подберите подходящую ширину для вашего окна
                    },
                }}
            >
                <h3>Изменение активности</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('amount')} type="number" placeholder="Введите число"/>
                    <br/>
                    <input {...register('description')} type="text" placeholder="Введите текст"/>
                    <br/>
                    <input {...register('date_added')} type="date"/>
                    <br/>
                    <select {...register('option')} onChange={handleSelectChange}>
                        <option value="">Выберите активность...</option>
                        {Object.entries(props.ActivityButtons).map(([key, value]) => (
                            <option  key={key} value={key} >
                                {`${value}`}
                            </option>
                        ))}
                    </select>
                    <div style={buttonBlockChangeStyles}>
                        <button style={buttonChangeStyles} type="submit">
                            Отправить
                        </button>
                        <button style={buttonChangeStyles} type="button" onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default CreateNote