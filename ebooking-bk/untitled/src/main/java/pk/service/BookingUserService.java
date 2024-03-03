package pk.service;

import org.springframework.stereotype.Service;
import pk.modelDto.BookingUserDto;
import pk.modelDto.LoginUserDto;

import java.util.List;

public interface BookingUserService {
    public BookingUserDto addBookingUser(BookingUserDto bookingUserDto);
    public List<BookingUserDto> getBookingUsersList();

    public BookingUserDto loginUser(LoginUserDto loginUserDto);
}
