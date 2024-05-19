function padToTwoDigits(num: number) {
    return num.toString().padStart(2, '0');
}

export function formatDateToLocalString(date: Date) {
    const year = date.getFullYear();
    const month = padToTwoDigits(date.getMonth() + 1); // Months are zero-based in JavaScript
    const day = padToTwoDigits(date.getDate());

    const hours = padToTwoDigits(date.getHours());
    const minutes = padToTwoDigits(date.getMinutes());
    const seconds = padToTwoDigits(date.getSeconds());
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}