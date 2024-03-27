package pk.mapperDto;

import pk.entity.BookingUser;
import pk.modelDto.BookingUserDto;

import javax.annotation.processing.Generated;
import java.util.ArrayList;
import java.util.List;


public class BookingUserMapperImpl  {


    public BookingUserDto bookingUserToBookingUserDto(BookingUser bookingUser) {
        if ( bookingUser == null ) {
            return null;
        }
        BookingUserDto bookingUserDto = new BookingUserDto();
        bookingUserDto.setId( bookingUser.getId() );
        bookingUserDto.setPin( bookingUser.getPin() );
        bookingUserDto.setUserName( bookingUser.getUserName() );
        bookingUserDto.setFirstName( bookingUser.getFirstName() );
        bookingUserDto.setSecondName( bookingUser.getSecondName() );
        bookingUserDto.setEmail( bookingUser.getEmail() );
        bookingUserDto.setTelefoneNumber( bookingUser.getTelefoneNumber() );
        bookingUserDto.setUserRole( bookingUser.getUserRole() );
        bookingUserDto.setActive( bookingUser.isActive() );
        return bookingUserDto;
    }


    public BookingUser bookingUserDtoToBookingUser(BookingUserDto bookingUserDto) {
        if ( bookingUserDto == null ) {
            return null;
        }
        BookingUser bookingUser = new BookingUser();
        bookingUser.setId( bookingUserDto.getId() );
        bookingUser.setUserName( bookingUserDto.getUserName() );
        bookingUser.setFirstName( bookingUserDto.getFirstName() );
        bookingUser.setSecondName( bookingUserDto.getSecondName() );
        bookingUser.setEmail( bookingUserDto.getEmail() );
        bookingUser.setTelefoneNumber( bookingUserDto.getTelefoneNumber() );
        bookingUser.setUserRole( bookingUserDto.getUserRole() );
        bookingUser.setActive( bookingUserDto.isActive() );
        bookingUser.setPin( bookingUserDto.getPin() );
        return bookingUser;
    }


    public List<BookingUserDto> bookingUsersToBookingUsersDto(List<BookingUser> bookingUsers) {
        if ( bookingUsers == null ) {
            return null;
        }
        List<BookingUserDto> list = new ArrayList<BookingUserDto>( bookingUsers.size() );
        for ( BookingUser bookingUser : bookingUsers ) {
            list.add( bookingUserToBookingUserDto( bookingUser ) );
        }
        return list;
    }

    public List<BookingUser> bookingUsersDtoToBookingUsers(List<BookingUserDto> bookingUsersDto) {
        if ( bookingUsersDto == null ) {
            return null;
        }
        List<BookingUser> list = new ArrayList<BookingUser>( bookingUsersDto.size() );
        for ( BookingUserDto bookingUserDto : bookingUsersDto ) {
            list.add( bookingUserDtoToBookingUser( bookingUserDto ) );
        }
        return list;
    }
}
