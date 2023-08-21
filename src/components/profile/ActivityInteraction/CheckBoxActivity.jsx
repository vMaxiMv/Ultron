import React, {useState} from 'react';
import {changeStatusView} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import checkbox from './/Checkbox.module.css'
function CheckBoxActivity(props) {
    const dispatch = useDispatch()
    const SelectedActivity = useSelector(state => state.Profile.SelectedActivity)
    const StatusView = useSelector(state => state.Profile.StatusView)
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        dispatch(changeStatusView(!StatusView));
    };
    const leftIconSize = isChecked ? '3em' : '4em';
    const rightIconSize = isChecked ? '4em' : '3em';
    return (
        <div className={checkbox.switchContainer}>
            <div className={checkbox.switch}>
                {SelectedActivity.activity_id !== null ? (
                    <>
                        <img src="/images/aloneRobot.png" alt="Left icon"
                             className={`${checkbox.icon} ${checkbox.left_icon}`}
                             style={{width: leftIconSize, height: leftIconSize}}/>
                        <input checked={isChecked} onChange={handleCheckboxChange} type="checkbox"/>
                        <img src="/images/robotGroup.png" alt="Left icon"
                             className={`${checkbox.icon} ${checkbox.right_icon}`}
                             style={{width: rightIconSize, height: rightIconSize}}/>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default CheckBoxActivity;