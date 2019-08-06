export const parseDate = (date) => {

    let dateSplit = date.split("-");
    let parsedDate = dateSplit[1] + "-" + dateSplit[0] + "-" + dateSplit[2];

    return new Date (parsedDate);
}
