import { BookingArticleDto } from "./bookingArticleDto";
import { BookingUserDto } from "./bookingUserDto";
import { BookingSlotUserDto } from "./bookingSlotUserDto";

export type BookingSlotDto = {
  id: number;
  bookingArticleDto: BookingArticleDto;
  slotValue: string;
  note: string;
  bookingDate: string;
  bookingTimeSlot: string;
  bookingSlotUsersDto: BookingSlotUserDto[];
  bookedByUserDto: BookingUserDto;
};
