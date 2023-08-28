import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getDatasets, getSortedDates} from "./DataSetsFunctions";

export function useUserData(){
    const UserData = useSelector(state=>state.Profile.UserData)
    const userData = useMemo(()=>({

        labels: UserData.date,
        datasets: getDatasets(UserData),
    }), [UserData])
    return userData;
}