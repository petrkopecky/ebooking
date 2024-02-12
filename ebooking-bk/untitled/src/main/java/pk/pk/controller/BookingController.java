package pk.pk.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import pk.modelDto.BookingUserDto;
import pk.service.BookingTableStructureService;

import java.util.List;

@RestController
@Slf4j
public class BookingController {
    //@GetMapping("/booking-users")
    @Autowired
    public BookingController(BookingTableStructureService bookingTableStructureService){
        this.bookingTableStructureService=bookingTableStructureService;
    }
    private BookingTableStructureService bookingTableStructureService;
    @PostMapping("/booking-table-structure")
    public String getBookingTableStructure(){
        return bookingTableStructureService.getBookingTableStructure();
    };
}