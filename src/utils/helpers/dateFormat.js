import moment from "moment";

export function changeDateFormat(str, fmt = "LLLL") {
  moment.locale('id');
  return moment(str).format(fmt);
}

export function changeHourFormatForAdvertData(newData) {
  newData.endHour = moment(newData.endHour).format("LTS");
  newData.startHour = moment(newData.startHour).format("LTS");
  return newData;
}

export default changeDateFormat;
