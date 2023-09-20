import React from 'react';
import AI from './/AcivityInteraction.module.css'
import {useDispatch, useSelector} from "react-redux";
import {deleteActivityThunk} from "../../../redux/ProfileReducer";
import {ActivityModalVisible2AC2, RemoveActivityModalAC} from "../../../redux/FlagsBooleanReducer"
function AcivityInteraction(props) {
    const dispatch = useDispatch()
    const SelectedActivity = useSelector(state => state.Profile.SelectedActivity)
    const ModalActivityHanldeClick = ()=>{
        dispatch(ActivityModalVisible2AC2(true))
    }
    return (
        <div className={AI.button_center_container}>
            {SelectedActivity.activity_id !== null ? (
                <>
                    <button className={AI.center_button} onClick={ModalActivityHanldeClick}>Изменить</button>
                    <button className={AI.center_button} onClick={() => dispatch(RemoveActivityModalAC(true))}>Удалить</button>
                </>
            ) : null}
        </div>
    );
}

export default AcivityInteraction;