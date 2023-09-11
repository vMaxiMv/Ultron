import {useMemo} from "react";
import {getDatasets} from "./DataSetsFunctions";

export function useUserData(NewSlicedData, YourName){
    const userData = useMemo(()=>({

        labels: NewSlicedData.date,
        datasets: getDatasets(NewSlicedData, YourName),
    }), [NewSlicedData])
    return userData;
}