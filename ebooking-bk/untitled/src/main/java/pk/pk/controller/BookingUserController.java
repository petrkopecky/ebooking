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
import pk.modelDto.LoginUserDto;
import pk.service.BookingUserService;
import pk.service.InactiveUserException;
import pk.service.InvalidPasswordException;
import pk.service.UserNotFoundException;

import java.util.List;
@RestController
@Slf4j
public class BookingUserController {

    @Autowired
    public BookingUserController(BookingUserService bookingUserService){
        this.bookingUserService=bookingUserService;
    }
    private BookingUserService bookingUserService;

    @GetMapping("/")
    String home() {
        System.out.println("home");
        return "home";
    }

    @GetMapping("/booking-users")
    List<BookingUserDto> bookingUsers() {
        return bookingUserService.getBookingUsersList();
    }


    @PostMapping("/booking-users")
    public ResponseEntity<BookingUserDto> createBookingUser(@RequestBody BookingUserDto bookingUserDto){
        //log.info(bookingUserDto.getUserName());
        BookingUserDto newBookingUserDto=bookingUserService.addBookingUser(bookingUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newBookingUserDto);
    }

    @PostMapping("/booking-user-login")
    public RestApiResponse<BookingUserDto> bookinkgUserLogin(@RequestBody LoginUserDto loginUserDto) {
        RestApiResponse<BookingUserDto> bookingUserLoginResponse=new RestApiResponse<BookingUserDto>();
        if(loginUserDto==null){
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"xxx");
            bookingUserLoginResponse.setStatusCode("NO_INPUT_PARAMETER");
            bookingUserLoginResponse.setStatusMessage("no login user input parameter");

        }else {
            try {
                bookingUserLoginResponse.setResponse( bookingUserService.loginUser(loginUserDto));
                bookingUserLoginResponse.setStatusCode("OK");
            } catch (UserNotFoundException e) {
                bookingUserLoginResponse.setStatusCode("USERNAME_NOT_FOUND");
                bookingUserLoginResponse.setStatusMessage("user not found");
            }catch (InactiveUserException e){
                bookingUserLoginResponse.setStatusCode("INACTIVE_USER");
                bookingUserLoginResponse.setStatusMessage("inactive user");
            }catch (InvalidPasswordException e){
                bookingUserLoginResponse.setStatusCode("INVALID_PASSWORD");
                bookingUserLoginResponse.setStatusMessage("invalid password");
            }catch(Exception e){
                bookingUserLoginResponse.setStatusCode("OTHER_EXCEPTION");
                bookingUserLoginResponse.setStatusMessage(e.getMessage());
            }
        }
        return bookingUserLoginResponse;
    }

    @PostMapping("/booking-user-by-username")
    public RestApiResponse<BookingUserDto> getBookinkgUser(@RequestBody String userName) {
        RestApiResponse<BookingUserDto> bookingUserLoginResponse=new RestApiResponse<BookingUserDto>();
        if(userName==null){
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"xxx");
            bookingUserLoginResponse.setStatusCode("NO_INPUT_PARAMETER");
            bookingUserLoginResponse.setStatusMessage("no userName input parameter");

        }else {
            try {
                bookingUserLoginResponse.setResponse( bookingUserService.getBookingUserDto(userName));
                bookingUserLoginResponse.setStatusCode("OK");
            } catch (UserNotFoundException e) {
                bookingUserLoginResponse.setStatusCode("USERNAME_NOT_FOUND");
                bookingUserLoginResponse.setStatusMessage("user not found");
            }catch (InactiveUserException e){
                bookingUserLoginResponse.setStatusCode("INACTIVE_USER");
                bookingUserLoginResponse.setStatusMessage("inactive user");
            }catch(Exception e){
                bookingUserLoginResponse.setStatusCode("OTHER_EXCEPTION");
                bookingUserLoginResponse.setStatusMessage(e.getMessage());
            }
        }
        return bookingUserLoginResponse;
    }


}
