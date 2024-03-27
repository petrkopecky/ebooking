package pk.mapperDto;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import pk.entity.BookingUser;
import pk.modelDto.BookingUserDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-27T15:29:42+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 20.0.1 (Oracle Corporation)"
)
public class BookingUserMapperImpl implements BookingUserMapper {

    @Override
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

    @Override
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

    @Override
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

    @Override
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
