export function getDatasets(data, YourName) {

    const username = YourName

    const colors = [
        '#ffc400', '#000bd4', '#21f344', '#673ab7',
        '#0dbcd2',  '#b508ee', '#08771a'];

    const datasets = Object.keys(data.amount).map((userId, index) => {
        const isUsername = data.name[userId] === username;

        let userColor = null
        if (isUsername){
            userColor = '#e91e1e'
        }
        else {
            userColor = colors[index]
        }

        return {
            label: data.name[userId],
            userId: data.user_id,
            data: data.amount[userId],
            backgroundColor: userColor,
            borderColor: 'black',
            borderWidth: 1,
            description: data.description[userId],
            entry_id: data.entry_id[userId]
        }

    });

    return datasets;

}
