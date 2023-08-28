import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getDatasets, getSortedDates} from "./DataSetsFunctions";

export function useUserData(NewSlicedData, YourName){
    //const UserData = useSelector(state=>state.Profile.UserData)
    const userData = useMemo(()=>({

        labels: NewSlicedData.date,
        datasets: getDatasets(NewSlicedData, YourName),
    }), [NewSlicedData])
    return userData;
}