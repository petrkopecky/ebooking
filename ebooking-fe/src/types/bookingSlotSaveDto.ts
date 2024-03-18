export type BookingSlotSaveDto = {
  bookingSlotId?: number;
  bookingSlotKey?: string;
  bookingUsersId?: Array<number>;
  bookedByBookingUserId?: number;
  note?: string;
  bookingSlotValue?: string;
};
