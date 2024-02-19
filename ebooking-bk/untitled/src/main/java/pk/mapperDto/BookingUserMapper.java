package pk.mapperDto;

import org.mapstruct.Mapper;
import pk.entity.BookingUser;
import pk.modelDto.BookingUserDto;

import java.util.List;

@Mapper
public interface BookingUserMapper {

    BookingUserDto bookingUserToBookingUserDto( BookingUser bookingUser);
    BookingUser bookingUserDtoToBookingUser( BookingUserDto bookingUserDto);


    List<BookingUserDto> bookingUsersToBookingUsersDto(List<BookingUser> bookingUsers);
    List<BookingUser> bookingUsersDtoToBookingUsers( List<BookingUserDto> bookingUsersDto);


}
