function transformData(data) {
    const result = {};

    const uniqueSortedDates = getSortedDates(data, 0)
    const ArrayLength = DateArrayLength(data)

    data.forEach(item => {
        const index = uniqueSortedDates.indexOf(item.date_added)
        if(index!==-1) {
            if (!result[item.id_user]) {
                // Создаем массив по умолчанию нужной длины
                result[item.id_user] = new Array(ArrayLength+1).fill(0);
            }
            // Заполняем массив данными
            result[item.id_user][index] = item.amount;
        }
    });
    //console.log(result)
    return result;

}
export function DateArrayLength (data) {
    const dates = data.map(item => item.date_added);
    const dataObject = dates.map((dateString) => new Date(dateString))

    const maxDate = new Date(Math.max.apply(null, dataObject));
    const minDate = new Date(Math.min.apply(null, dataObject));

    const differenceInMilliseconds = maxDate - minDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays
}

export function getSortedDates(data, number) {

    const dates = data.map(item => new Date(item.date_added));

    let minDate = dates[0];
    let maxDate = dates[0];

    for (let i = 1; i < dates.length; i++) {
        if (dates[i] < minDate) {
            minDate = dates[i];
        }
        if (dates[i] > maxDate) {
            maxDate = dates[i];
        }
    }

    const result = [];
    let currentDate = minDate;

    if(minDate !== maxDate){
        while (currentDate <= maxDate) {
            result.push(currentDate.toISOString().slice(number,10));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    else{
        if(currentDate){
            result.push(currentDate.toISOString().slice(number,10));
        }
    }
    return result;

}

/////Функции для формирования списков описания
function getDateFromString(dateString) {
    let date;
    try {
        date = new Date(dateString);
    } catch {
        date = null;
    }
    return date;
}

function convertDatesToObjects(data) {
    const newData = data.map(item => {
        const date = getDateFromString(item.date_added);
        return { ...item, date_added: date };
    });
    return newData;
}


function createEmptyDataObject(data, differenceInDays) {
    const emptyData = {};

    for (const item of data) {
        emptyData[item.id_user] = Array.from({ length: differenceInDays + 1 }, () => "");
    }

    return emptyData;
}

function addDatesToEmptyData(emptyData, data, description=false, entry_id=false) {
    const minDate = new Date(Math.min(...data.map(item => item.date_added)));
    for (const item of data) {
        const date = new Date(item.date_added);
        const differenceInDays = Math.floor((date - minDate) / (1000 * 60 * 60 * 24));

        if(description){emptyData[item.id_user][differenceInDays] = item.description || "";}
        else if (entry_id){emptyData[item.id_user][differenceInDays] = item.id_entery || "";}
    }
}
////конец Функции для формирования списков описания

export function getDatasets(data) {
    const newData = convertDatesToObjects(data);
    const differenceInDays = DateArrayLength(newData);
    const emptyDataObject_description = createEmptyDataObject(data, differenceInDays);
    const emptyDataObject_entry_id = createEmptyDataObject(data, differenceInDays);
    addDatesToEmptyData(emptyDataObject_description, newData, true, false );
    addDatesToEmptyData(emptyDataObject_entry_id, newData, false, true );

    const formattedData = transformData(data)


    const colors = [
        '#e91e1e', '#ffc400', '#000bd4', '#21f344', '#673ab7',
        '#0dbcd2',  '#b508ee', '#08771a'];

    const datasets = Object.keys(formattedData).map((id_user, index) => {
        return {
            label: data.find(item => item.id_user == id_user).name,
            id_user:Array.from(new Set(data.map(item => item.id_user))).sort((a, b) => a - b),
            data: formattedData[id_user],
            backgroundColor: colors[index],
            description:emptyDataObject_description,
            entry_id:emptyDataObject_entry_id,
            borderColor: 'black',
            borderWidth: 2
        };
    })
    return datasets;

}