import { BookingArticleDto } from "./bookingArticleDto";
import { BookingUserDto } from "./bookingUserDto";

export type BookingSlotDto = {
  id: number;
  bookingArticleDto: BookingArticleDto;
  slotValue: string;
  note: string;
  bookingDate: string;
  bookingTimeSlot: string;
  bookingUsersDto: BookingUserDto[];
  bookedByUserDto: BookingUserDto;
};
