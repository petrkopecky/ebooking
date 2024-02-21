package pk.pk.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingTableSlot;
import pk.modelDto.BookingUserDto;
import pk.service.BookingSlotService;
import pk.service.BookingTableStructureService;

import java.time.LocalDate;
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
    public List<BookingTableSlot> getBookingDateSlots1(@RequestBody String bookingDate) {
        log.info("getBookingDateSlots1.0:"+(bookingDate==null?"":bookingDate.toString()));
        List<BookingTableSlot> BookingTableSlots= bookingSlotService.getBookingSlots(bookingDate);
        //log.info("getBookingDateSlots1.1:"+(BookingTableSlots==null?"":BookingTableSlots.size()));
        if(bookingDate==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bookingDate null");
        }
        if (BookingTableSlots==null ||BookingTableSlots.size()==0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no slot for bookingDate "+bookingDate.toString());
        }
        return BookingTableSlots;
    }

    @GetMapping("/booking-article-date-slots")
    public String getBookingArticleDateStols(){
        bookingSlotService.getBookingArticleSlots("20240221");
        return "ok";
    }

}