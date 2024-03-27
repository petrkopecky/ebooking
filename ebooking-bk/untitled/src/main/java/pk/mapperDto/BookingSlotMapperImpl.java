package pk.mapperDto;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import pk.entity.BookingArticle;
import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;
import pk.entity.BookingUser;
import pk.modelDto.BookingArticleDto;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingSlotUserDto;
import pk.modelDto.BookingUserDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-27T15:34:01+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 20.0.1 (Oracle Corporation)"
)
public class BookingSlotMapperImpl implements BookingSlotMapper {

    @Override
    public BookingSlotDto bookingSlotToBookingSlotDto(BookingSlot bookingSlot) {
        if ( bookingSlot == null ) {
            return null;
        }

        BookingSlotDto bookingSlotDto = new BookingSlotDto();

        bookingSlotDto.setBookingArticleDto( bookingArticleToBookingArticleDto( bookingSlot.getBookingArticle() ) );
        bookingSlotDto.setBookedByUserDto( bookingUserToBookingUserDto( bookingSlot.getBookedByUser() ) );
        bookingSlotDto.setBookingSlotUsersDto( bookingSlotUserListToBookingSlotUserDtoList( bookingSlot.getBookingSlotUsers() ) );
        bookingSlotDto.setId( bookingSlot.getId() );
        bookingSlotDto.setSlotValue( bookingSlot.getSlotValue() );
        bookingSlotDto.setNote( bookingSlot.getNote() );
        bookingSlotDto.setBookingDate( bookingSlot.getBookingDate() );
        bookingSlotDto.setBookingTimeSlot( bookingSlot.getBookingTimeSlot() );

        return bookingSlotDto;
    }

    @Override
    public BookingSlot bookingSlotDtoToBookingSlot(BookingSlotDto bookingSlotDto) {
        if ( bookingSlotDto == null ) {
            return null;
        }

        BookingSlot bookingSlot = new BookingSlot();

        bookingSlot.setBookingArticle( bookingArticleDtoToBookingArticle( bookingSlotDto.getBookingArticleDto() ) );
        bookingSlot.setBookedByUser( bookingUserDtoToBookingUser( bookingSlotDto.getBookedByUserDto() ) );
        bookingSlot.setId( bookingSlotDto.getId() );
        bookingSlot.setSlotValue( bookingSlotDto.getSlotValue() );
        bookingSlot.setNote( bookingSlotDto.getNote() );
        bookingSlot.setBookingDate( bookingSlotDto.getBookingDate() );
        bookingSlot.setBookingTimeSlot( bookingSlotDto.getBookingTimeSlot() );

        return bookingSlot;
    }

    protected BookingArticleDto bookingArticleToBookingArticleDto(BookingArticle bookingArticle) {
        if ( bookingArticle == null ) {
            return null;
        }

        BookingArticleDto bookingArticleDto = new BookingArticleDto();

        bookingArticleDto.setId( bookingArticle.getId() );
        bookingArticleDto.setKey( bookingArticle.getKey() );
        bookingArticleDto.setName( bookingArticle.getName() );
        bookingArticleDto.setActive( bookingArticle.getActive() );

        return bookingArticleDto;
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

    protected BookingSlotUserDto bookingSlotUserToBookingSlotUserDto(BookingSlotUser bookingSlotUser) {
        if ( bookingSlotUser == null ) {
            return null;
        }

        BookingSlotUserDto bookingSlotUserDto = new BookingSlotUserDto();

        bookingSlotUserDto.setId( bookingSlotUser.getId() );
        bookingSlotUserDto.setBookedAt( bookingSlotUser.getBookedAt() );
        bookingSlotUserDto.setOrderNumber( bookingSlotUser.getOrderNumber() );

        return bookingSlotUserDto;
    }

    protected List<BookingSlotUserDto> bookingSlotUserListToBookingSlotUserDtoList(List<BookingSlotUser> list) {
        if ( list == null ) {
            return null;
        }

        List<BookingSlotUserDto> list1 = new ArrayList<BookingSlotUserDto>( list.size() );
        for ( BookingSlotUser bookingSlotUser : list ) {
            list1.add( bookingSlotUserToBookingSlotUserDto( bookingSlotUser ) );
        }

        return list1;
    }

    protected BookingArticle bookingArticleDtoToBookingArticle(BookingArticleDto bookingArticleDto) {
        if ( bookingArticleDto == null ) {
            return null;
        }

        BookingArticle bookingArticle = new BookingArticle();

        bookingArticle.setId( bookingArticleDto.getId() );
        bookingArticle.setKey( bookingArticleDto.getKey() );
        bookingArticle.setName( bookingArticleDto.getName() );
        bookingArticle.setActive( bookingArticleDto.getActive() );

        return bookingArticle;
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
