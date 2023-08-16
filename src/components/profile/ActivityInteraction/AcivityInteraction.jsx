import React from 'react';
import AI from './/AcivityInteraction.module.css'
import {useDispatch, useSelector} from "react-redux";
import {deleteActivityThunk} from "../../../redux/ProfileReducer";

function AcivityInteraction(props) {
    const dispatch = useDispatch()
    const SelectedActivity = useSelector(state => state.Profile.SelectedActivity)
    return (
        <div className={AI.button_center_container}>
            {SelectedActivity.activity_id !== null ? (
                <>
                    <button className={AI.center_button}>Изменить</button>
                    <button className={AI.center_button} onClick={() => dispatch(deleteActivityThunk(SelectedActivity.activity_id))}>Удалить</button>
                </>
            ) : null}
        </div>
    );
}

export default AcivityInteraction;