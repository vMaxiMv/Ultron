import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Modify from './NoteModal.module.css'

function NoteModal(props) {
    const dispatch = useDispatch();
    const changeNoteBool = useSelector((state) => state.Profile.ChangeNoteBool);
    const SelectedActivity = useSelector(state => state.Profile.SelectedActivity)
    const { register, handleSubmit, reset } = useForm();
    const closeModal = () => {
        reset();
        dispatch(props.onCloseHandler());
       // dispatch(props.resetId_activity())
    };

    const onSubmit = async (data) => {

        (props.onSubmitHandler(data));
        //console.log(data)
        closeModal();
    };

    return (
        <div>
            <Modal
                isOpen={changeNoteBool}
                onRequestClose={closeModal}
                className={Modify.overlay}
                overlayClassName={Modify.content}
            >
                <h3>{props.title}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('amount')} type="number" placeholder="Введите число" />
                    <br />
                    <input {...register('description')} type="text" placeholder="Введите текст" />
                    <br />
                    <input {...register('date_added')} type="date" />
                    <br />
                    {props.selectOptions && (
                        <select {...register('option')} onChange={props.handleSelectChange}>
                            <option value="">{SelectedActivity.value}</option>
                            {Object.entries(props.selectOptions).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {`${value}`}
                                </option>
                            ))}
                        </select>
                    )}
                    <div className={Modify.buttonBlockChangeStyles}>
                        <button className={Modify.buttonChangeStyles} type="submit">
                            {props.buttonText}
                        </button>
                        <button className={Modify.buttonChangeStyles} type="button" onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default NoteModal;