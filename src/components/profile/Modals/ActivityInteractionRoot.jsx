import React from 'react';
import AddActivityModal from "./AddActivityModal";
import {
    ActivityModalVisible2AC2,
    ActivityModalVisibleAC,
    createActivityThunk,
    editActivityThunk
} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";

function ActivityInteractionRoot(props) {
    const {ActivityModalVisible, ActivityModalVisible2, SelectedActivity} = useSelector(state => state.Profile)
    const dispatch = useDispatch()
    return (
        <div>
            {ActivityModalVisible && <AddActivityModal
                title='Добавление активности'
                onSubmitHandler={(data) => dispatch(createActivityThunk({addActivityObj: data}))}
                CloseModalActivityHanldeClick={ActivityModalVisibleAC(false)}
                OpenModalActivity={ActivityModalVisible}/>}

            {ActivityModalVisible2 && <AddActivityModal
                title='Редактирование активности'
                onSubmitHandler={(data) => dispatch(editActivityThunk({
                    addActivityObj: data,
                    activity_id: SelectedActivity.activity_id
                }))}
                CloseModalActivityHanldeClick={ActivityModalVisible2AC2(false)}
                OpenModalActivity={ActivityModalVisible2}
            />}
        </div>
    );
}

export default ActivityInteractionRoot;