package pk.service;


import pk.modelDto.BookingTableSlot;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BookingSlotService {
    List<BookingTableSlot> getBookingSlots(String bookingDate);
}
