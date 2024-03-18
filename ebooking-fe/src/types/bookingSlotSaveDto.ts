export type BookingSlotSaveDto = {
  bookingSlotId?: number;
  bookingSlotKey?: string;
  bookingUsersIds?: Array<number>;
  bookedByBookingUserId?: number;
  note?: string;
  bookingSlotValue?: string;
};
