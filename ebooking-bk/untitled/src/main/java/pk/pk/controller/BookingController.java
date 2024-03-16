package pk.pk.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingTableSlot;
import pk.modelDto.BookingUserDto;
import pk.modelDto.LoginUserDto;
import pk.service.BookingSlotService;
import pk.service.BookingTableStructureService;
import pk.service.BookingUserService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
public class BookingController {
    //@GetMapping("/booking-users")
    @Autowired
    public BookingController(BookingTableStructureService bookingTableStructureService,BookingSlotService bookingSlotService,BookingUserService bookingUserService) {
        this.bookingTableStructureService = bookingTableStructureService;
        this.bookingSlotService=bookingSlotService;
        this.bookingUserService=bookingUserService;


    }

    private BookingTableStructureService bookingTableStructureService;
    private BookingSlotService bookingSlotService;

    private BookingUserService bookingUserService;

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
    public List<BookingTableSlot> getBookingDateSlots1(@RequestHeader(value="Authorization", required = false) String authorizationToken,@RequestBody String bookingDate) {
        try {
            log.info("getBookingDateSlots1.0:" + (bookingDate == null ? "" : bookingDate.toString()));
            BookingUserDto bookingUserDto = null;
            if (authorizationToken != null) {
                bookingUserDto = bookingUserService.getBookinUserDtoFromAuthorizationToken(authorizationToken);
            }
            List<BookingTableSlot> bookingTableSlots = bookingSlotService.getBookingTableSlots(bookingDate, bookingUserDto);
            //log.info("getBookingDateSlots1.1:"+(BookingTableSlots==null?"":BookingTableSlots.size()));
            if (bookingDate == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bookingDate null");
            }
        /*
        if (bookingTableSlots==null ||bookingTableSlots.size()==0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no slot for bookingDate "+bookingDate.toString());
        }
        */
            return bookingTableSlots;
        }catch (Exception e){
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());

        }


    }



    @PostMapping("/booking-slot")
    public RestApiResponse<BookingSlotDto> getBookingSlot(@RequestHeader(value="Authorization", required = false)String authorizationToken,@RequestBody String bookingSlotKey){
        RestApiResponse<BookingSlotDto> restApiResponse=new RestApiResponse<BookingSlotDto>();
        restApiResponse.setResponse(bookingSlotService.getBookingSlotDtoBySlotKey(bookingSlotKey));
        restApiResponse.setStatusCode("OK");
        return restApiResponse;

    }



}