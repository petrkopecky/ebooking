package pk.service;

import pk.modelDto.BookingUserDto;

import java.util.List;

public interface BookingUserService {
    public BookingUserDto addBookingUser(BookingUserDto bookingUserDto);
    public List<BookingUserDto> getBookingUsersList();
}
