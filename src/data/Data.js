
// data.js
import {useEffect, useState} from 'react';
import {getDatasets, getSortedDates} from "../components/charts/CommonCharts";

export const UserData = [];

export function updateUserData(data) {
    UserData.length = 0; // Clear the array
    UserData.push(...data); // Add new data to the array
}

export function useUserData() {
    const [userData, setUserData] = useState({
        labels: getSortedDates(UserData,5),
        datasets: getDatasets(UserData),
    });

    useEffect(() => {
        setUserData({
            labels: getSortedDates(UserData,5),
            datasets: getDatasets(UserData),
        });
    }, [UserData]);

    return userData;
}

// Your existing transformData, getSortedDates, and getDatasets functions
// ...

