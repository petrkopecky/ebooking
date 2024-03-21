function dateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

function dateToYYYY_MM_DD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateFromBookingSlotKey(bookingSlotKey: string): string {
  //dodelat;
  return "dodelat";
}
const UtilsService = {
  dateToYYYYMMDD,
  dateToYYYY_MM_DD,
  getDateFromBookingSlotKey,
};
export default UtilsService;
