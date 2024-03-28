package pk.service;


import pk.entity.BookingSlot;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingSlotSaveDto;
import pk.modelDto.BookingTableSlot;
import pk.modelDto.BookingUserDto;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BookingSlotService {


    List<BookingTableSlot> getBookingSlots(String bookingDate, BookingUserDto bookingUserDto);

    List<BookingTableSlot> getBookingArticleSlots(String bookingDate);

    List<BookingTableSlot> getBookingTableSlots(String bookingDate, BookingUserDto bookingUserDto);

    BookingSlotDto getBookingSlotDtoBySlotKey(String slotKey);

    BookingSlotDto saveBookingSlot(BookingSlotSaveDto bookingSlotSaveDto);

    public BookingSlot findx();
}
