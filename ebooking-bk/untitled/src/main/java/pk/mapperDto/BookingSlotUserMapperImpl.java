package pk.mapperDto;

import javax.annotation.processing.Generated;
import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;
import pk.entity.BookingUser;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingSlotUserDto;
import pk.modelDto.BookingUserDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-27T15:29:42+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 20.0.1 (Oracle Corporation)"
)
public class BookingSlotUserMapperImpl implements BookingSlotUserMapper {

    @Override
    public BookingSlotUserDto bookingSlotUserToBookingSlotUserDto(BookingSlotUser bookingSlotUser) {
        if ( bookingSlotUser == null ) {
            return null;
        }

        BookingSlotUserDto bookingSlotUserDto = new BookingSlotUserDto();

        bookingSlotUserDto.setBookingSlotDto( bookingSlotToBookingSlotDto( bookingSlotUser.getBookingSlot() ) );
        bookingSlotUserDto.setBookingUserDto( bookingUserToBookingUserDto( bookingSlotUser.getBookingUser() ) );
        bookingSlotUserDto.setId( bookingSlotUser.getId() );
        bookingSlotUserDto.setBookedAt( bookingSlotUser.getBookedAt() );
        bookingSlotUserDto.setOrderNumber( bookingSlotUser.getOrderNumber() );

        return bookingSlotUserDto;
    }

    @Override
    public BookingSlotUser bookingSlotUserDtoToBookingSlot(BookingSlotUserDto bookingSlotUserDto) {
        if ( bookingSlotUserDto == null ) {
            return null;
        }

        BookingSlotUser bookingSlotUser = new BookingSlotUser();

        bookingSlotUser.setBookingSlot( bookingSlotDtoToBookingSlot( bookingSlotUserDto.getBookingSlotDto() ) );
        bookingSlotUser.setBookingUser( bookingUserDtoToBookingUser( bookingSlotUserDto.getBookingUserDto() ) );
        bookingSlotUser.setId( bookingSlotUserDto.getId() );
        bookingSlotUser.setBookedAt( bookingSlotUserDto.getBookedAt() );
        bookingSlotUser.setOrderNumber( bookingSlotUserDto.getOrderNumber() );

        return bookingSlotUser;
    }

    protected BookingSlotDto bookingSlotToBookingSlotDto(BookingSlot bookingSlot) {
        if ( bookingSlot == null ) {
            return null;
        }

        BookingSlotDto bookingSlotDto = new BookingSlotDto();

        bookingSlotDto.setId( bookingSlot.getId() );
        bookingSlotDto.setSlotValue( bookingSlot.getSlotValue() );
        bookingSlotDto.setNote( bookingSlot.getNote() );
        bookingSlotDto.setBookingDate( bookingSlot.getBookingDate() );
        bookingSlotDto.setBookingTimeSlot( bookingSlot.getBookingTimeSlot() );

        return bookingSlotDto;
    }

    protected BookingUserDto bookingUserToBookingUserDto(BookingUser bookingUser) {
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

    protected BookingSlot bookingSlotDtoToBookingSlot(BookingSlotDto bookingSlotDto) {
        if ( bookingSlotDto == null ) {
            return null;
        }

        BookingSlot bookingSlot = new BookingSlot();

        bookingSlot.setId( bookingSlotDto.getId() );
        bookingSlot.setSlotValue( bookingSlotDto.getSlotValue() );
        bookingSlot.setNote( bookingSlotDto.getNote() );
        bookingSlot.setBookingDate( bookingSlotDto.getBookingDate() );
        bookingSlot.setBookingTimeSlot( bookingSlotDto.getBookingTimeSlot() );

        return bookingSlot;
    }

    protected BookingUser bookingUserDtoToBookingUser(BookingUserDto bookingUserDto) {
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
}
