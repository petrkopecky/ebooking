package pk.mapperDto;

import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;
import pk.entity.BookingUser;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingSlotUserDto;
import pk.modelDto.BookingUserDto;

import java.util.ArrayList;
import java.util.List;

public class BookingSlotUserMapperImpl  {
    BookingUserMapperImpl bookingUserMapper=new BookingUserMapperImpl();
    public BookingSlotUserDto bookingSlotUserToBookingSlotUserDto(BookingSlotDto bookingSlotDto,  BookingUserDto bookingUserDto,BookingSlotUser bookingSlotUser) {
        if ( bookingSlotUser == null ) {
            return null;
        }
        BookingSlotUserDto bookingSlotUserDto = new BookingSlotUserDto();
       // bookingSlotUserDto.setBookingSlotDto( bookingSlotDto );
        bookingSlotUserDto.setBookingUserDto( bookingUserDto );
        bookingSlotUserDto.setId( bookingSlotUser.getId() );
        bookingSlotUserDto.setBookedAt( bookingSlotUser.getBookedAt() );
        bookingSlotUserDto.setOrderNumber( bookingSlotUser.getOrderNumber() );
        return bookingSlotUserDto;
    }

    public List<BookingSlotUserDto> bookingSlotUsersToBookingSlotUsersDto(BookingSlotDto bookingSlotDto,List<BookingSlotUser> bookingSlotUsers) {
        if ( bookingSlotUsers == null ) {
            return null;
        }
        List<BookingSlotUserDto> list = new ArrayList<BookingSlotUserDto>(bookingSlotUsers.size());
        for ( BookingSlotUser bookingSlotUser : bookingSlotUsers ) {
            BookingUserDto bookingUserDto= bookingUserMapper.bookingUserToBookingUserDto(bookingSlotUser.getBookingUser());
            list.add( ( bookingSlotUserToBookingSlotUserDto(bookingSlotDto,bookingUserDto,bookingSlotUser) ) );
        }

        return list;
    }



    /*
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
*/

/*
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

 */
}
