export const getWidthCol = (arr:string):number => {
    if (arr.includes("wd wd-1")) {
        return 1;
    }
    if (arr.includes("wd wd-2")) {
        return 2;
    }
    if (arr.includes("wd wd-3")) {
        return 3;
    }
    if (arr.includes("wd wd-4")) {
        return 4;
    }
    if (arr.includes("wd wd-5")) {
        return 5;
    }
    if (arr.includes("wd wd-6")) {
        return 6;
    }
    if (arr.includes("wd wd-7")) {
        return 7;
    }
    if (arr.includes("wd wd-8")) {
        return 8;
    }
    if (arr.includes("wd wd-9")) {
        return 9;
    }
    if (arr.includes("wd wd-10")) {
        return 10;
    }
    if (arr.includes("wd wd-11")) {
        return 11;
    }
    if (arr.includes("wd wd-12")) {
        return 12;
    }
    return 0;
}

export const calculateMillisecondsBetweenDates=(date1: Date, date2: Date): number=> {
    // Convert dates to milliseconds and calculate the difference
    const milliseconds1: number = date1.getTime();
    const milliseconds2: number = date2.getTime();
    const differenceMilliseconds: number = Math.abs(milliseconds2 - milliseconds1);

    return differenceMilliseconds;
}
