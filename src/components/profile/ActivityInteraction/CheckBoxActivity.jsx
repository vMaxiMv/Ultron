import React from 'react';
import {changeStatusView} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import checkbox from './/Checkbox.module.css'
function CheckBoxActivity(props) {
    const dispatch = useDispatch()
    const SelectedActivity = useSelector(state => state.Profile.SelectedActivity)
    const StatusView = useSelector(state => state.Profile.StatusView)
    return (
        <div className={checkbox.switch}>
            {SelectedActivity.activity_id !== null ? (
                <>
                    <img src="/images/aloneRobot.png" alt="Left icon"
                           className={`${checkbox.icon} ${checkbox.left_icon}`}/>
                    <input onClick={() => dispatch(changeStatusView(!StatusView))} type="checkbox"/>
                    <img src="/images/robotGroup.png" alt="Left icon"
                         className={`${checkbox.icon} ${checkbox.right_icon}`}/>
                </>
        ) : null}
        </div>
    );
}

export default CheckBoxActivity;