import moment from "moment-timezone";
import { fromUnixTime, format } from 'date-fns';

export const calculateElapsedTimeAsString = (clock, time) => {
    const givenTimeDate = new Date(time);
    // Tính toán khoảng thời gian
    const timeDifference = new Date() - givenTimeDate;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    // Xác định chuỗi hiển thị tương ứng
    if (minutesDifference <= 59) {
        if (minutesDifference === 0) {
            return 'Just now';
        } else {
            return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
        }
    } else if (minutesDifference <= 1440) { // 1440 minutes = 1 day
        const hoursDifference = Math.floor(minutesDifference / 60);
        return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else {
        // Định dạng ngày/tháng/năm và giờ:phút
        return `${givenTimeDate.getDate()}/${givenTimeDate.getMonth() + 1}/${givenTimeDate.getFullYear()} ${givenTimeDate.getHours()}:${givenTimeDate.getMinutes().toString().padStart(2, '0')}`;
    }
};

export const convertLongToDateAsString = (time) => {
    const date = new Date(Number.parseInt(time));

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = date.getDate();
    // Tháng bắt đầu từ 0 (0 là tháng 1), nên phải cộng thêm 1
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Đảm bảo định dạng ngày và tháng luôn có 2 chữ số
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Trả về chuỗi ngày tháng trong định dạng dd/mm/yyyy
    return formattedDay + '/' + formattedMonth + '/' + year
}

export const convertLongToDateWithPattern = (time, pattern) => {
    const today = moment().tz('Asia/Ho_Chi_Minh').startOf('day');
    const targetDate = moment.tz(time, 'Asia/Ho_Chi_Minh');

    if (pattern == "HH:mm") {
        return targetDate.format(pattern);
    } else {
        if (today.isSame(targetDate, 'day')) {
            return 'Today';
        } else {
            return targetDate.format(pattern);
        }
    }
}

export const convertDateStringToLong = (dateString) => {
    const [year, month, day] = dateString.split('-');

    const dateObject = new Date(year, month - 1, day); // Lưu ý: Tháng bắt đầu từ 0, nên trừ đi 1

    return dateObject.getTime();
}

export const formatTimeForChessClock = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Chuyển đổi thời gian từ long (giây từ epoch) thành định dạng theo mẫu
 * @param {number} time - Thời gian dưới dạng long (số giây từ epoch).
 * @param {string} pattern - Mẫu định dạng ngày tháng.
 * @returns {string} - Ngày tháng đã định dạng.
 */
export const formatDatePattern = (time, pattern) => {
    if (time) {
        const date = new Date(time);

        // Định dạng ngày tháng theo mẫu
        return format(date, pattern);
    } else {
        return "";
    }
}