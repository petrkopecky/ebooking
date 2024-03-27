import { BookingUserDto } from "./bookingUserDto";

export type BookingSlotUserDto = {
  id?: number;
  bookingUserDto?: BookingUserDto;
  orderNumber?: number;
};
