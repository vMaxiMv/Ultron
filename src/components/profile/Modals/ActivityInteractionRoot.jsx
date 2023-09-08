import React from 'react';
import AddActivityModal from "./AddActivityModal";
import {
    createActivityThunk,
    editActivityThunk
} from "../../../redux/ProfileReducer";
import {
    ActivityModalVisible2AC2,
    ActivityModalVisibleAC,
} from "../../../redux/FlagsBooleanReducer"
import {useDispatch, useSelector} from "react-redux";

function ActivityInteractionRoot(props) {
    const {SelectedActivity} = useSelector(state => state.Profile)
    const {ActivityModalVisible, ActivityModalVisible2} = useSelector(state=>state.Flags_Reducer)
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