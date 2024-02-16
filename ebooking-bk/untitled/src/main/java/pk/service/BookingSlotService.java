package pk.service;


import pk.modelDto.BookingTableStot;

import java.util.Date;
import java.util.List;

public interface BookingSlotService {
    List<BookingTableStot> getBookingSlots(Date bookingDate);
}
