import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
require('dayjs/locale/de')

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'vài giây trước',
    m: "một phút trước",
    mm: "%d phút trước",
    h: "giờ trước",
    hh: "%d tiếng trước",
    d: "một ngày trước",
    dd: "%d ngày trước",
    M: "một tháng trước",
    MM: "%d tháng trước",
    y: "a year",
    yy: "%d years"
  }
})
const DayJs = {
  from: (date) => {
    return dayjs().from(dayjs(date), true);
  },
};

export default DayJs;