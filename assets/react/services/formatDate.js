export default function formatDate(date) {
    let day = "",
        month = "",
        year = "",
        hour = "",
        minute = "";

    year = date.getFullYear();
    if (date.getDate() < 10) {
        day = "0" + date.getDate();
    } else {
        day = date.getDate();
    }
    if (date.getMonth() < 10) {
        month = "0" + (date.getMonth() + 1);
    } else {
        month = date.getMonth();
    }
    if (date.getHours() < 10) {
        hour = "0" + date.getHours();
    } else {
        hour = date.getHours();
    }
    if (date.getMinutes() < 10) {
        minute = "0" + date.getMinutes();
    } else {
        minute = date.getMinutes();
    }
    const formattedDate =
        day + "-" + month + "-" + year + " " + hour + ":" + minute;

    return formattedDate;
}
