package pk.service;

import org.springframework.stereotype.Service;
import pk.modelDto.BookingUserDto;
import pk.modelDto.LoggedUserDto;
import pk.modelDto.LoginUserDto;

import java.util.List;

public interface BookingUserService {
    public BookingUserDto addBookingUser(BookingUserDto bookingUserDto);
    public List<BookingUserDto> getBookingUsersList();

    public LoggedUserDto loginUser(LoginUserDto loginUserDto);
    public BookingUserDto getBookingUserDto(String userName);

    public BookingUserDto getBookinUserDtoFromAuthorizationToken(String authorizationToken);
}
