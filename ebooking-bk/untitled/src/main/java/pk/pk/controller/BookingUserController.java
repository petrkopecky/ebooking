package pk.pk.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pk.modelDto.BookingUserDto;
import pk.service.BookingUserService;

import java.util.List;
@RestController
@Slf4j
public class BookingUserController {

    @Autowired
    public BookingUserController(BookingUserService bookingUserService){
        this.bookinUserService=bookingUserService;
    }
    private BookingUserService bookinUserService;

    @GetMapping("/")
    String home() {
        System.out.println("home");
        return "home";
    }

    @GetMapping("/booking-users")
    List<BookingUserDto> bookingUsers() {
        return bookinUserService.getBookingUsersList();
    }


    @PostMapping("/booking-users")
    public ResponseEntity<BookingUserDto> createBookingUser(@RequestBody BookingUserDto bookingUserDto){
        //log.info(bookingUserDto.getUserName());
        BookingUserDto newBookingUserDto=bookinUserService.addBookingUser(bookingUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newBookingUserDto);
    }
}
