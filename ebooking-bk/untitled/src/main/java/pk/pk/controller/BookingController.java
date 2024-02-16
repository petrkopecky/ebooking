package pk.pk.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingUserDto;
import pk.service.BookingSlotService;
import pk.service.BookingTableStructureService;

import java.util.Date;
import java.util.List;

@RestController
@Slf4j
public class BookingController {
    //@GetMapping("/booking-users")
    @Autowired
    public BookingController(BookingTableStructureService bookingTableStructureService,BookingSlotService bookingSlotService) {
        this.bookingTableStructureService = bookingTableStructureService;
        this.bookingSlotService=bookingSlotService;
    }

    private BookingTableStructureService bookingTableStructureService;
    private BookingSlotService bookingSlotService;

    @PostMapping("/booking-table-structure")
    public String getBookingTableStructure() {
        return bookingTableStructureService.getBookingTableStructure();
    }

    ;

    @PostMapping("/booking-date-slots")
    public String getBookingDateSlots(@RequestBody Date bookingDate) {
        log.info("getBookingDateSlots:"+(bookingDate==null?"":bookingDate.toString()));
        return "[{\"articleKey\":\"k1\",\"slotKey\":\"k1-20240216-0930-1000\",\"slotValue\":\"R\",\"info\":\"30,31\",\"userPins\":[\"30\",\"31\"]},{\"articleKey\":\"k2\",\"slotKey\":\"k1-20240216-1230-1300\",\"slotValue\":\"R\",\"info\":\"30,31\",\"userPins\":[\"30\",\"31\"]}]";
    }

    @PostMapping("/booking-date-slots1")
    public List<BookingSlotDto> getBookingDateSlots1(@RequestBody Date bookingDate) {
        log.info("getBookingDateSlots1.0:"+(bookingDate==null?"":bookingDate.toString()));
        List<BookingSlotDto> bookingSlotDtos= bookingSlotService.getBookingSlots(bookingDate);
        log.info("getBookingDateSlots1.1:"+(bookingSlotDtos==null?"":bookingSlotDtos.size()));
        return bookingSlotDtos;
    }


}