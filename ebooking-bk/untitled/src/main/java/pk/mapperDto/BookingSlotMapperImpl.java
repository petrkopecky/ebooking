package pk.mapperDto;

import pk.entity.BookingArticle;
import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;
import pk.entity.BookingUser;
import pk.modelDto.BookingArticleDto;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingSlotUserDto;
import pk.modelDto.BookingUserDto;
import java.util.ArrayList;
import java.util.List;



public class BookingSlotMapperImpl  {
    BookingArticleMapperImpl bookingArticleMapper=new BookingArticleMapperImpl();
    BookingUserMapperImpl bookingUserMapper=new BookingUserMapperImpl();

    BookingSlotUserMapperImpl bookingSlotUserMapper= new BookingSlotUserMapperImpl();

    public BookingSlotDto bookingSlotToBookingSlotDto(BookingSlot bookingSlot) {
        if ( bookingSlot == null ) {
            return null;
        }
        BookingSlotDto bookingSlotDto = new BookingSlotDto();
        bookingSlotDto.setBookingArticleDto( bookingArticleMapper.bookingArticleToBookingArticleDto( bookingSlot.getBookingArticle() ) );
        bookingSlotDto.setBookedByUserDto( bookingUserMapper.bookingUserToBookingUserDto( bookingSlot.getBookedByUser() ) );
        bookingSlotDto.setBookingSlotUsersDto( bookingSlotUserMapper.bookingSlotUsersToBookingSlotUsersDto(bookingSlotDto ,bookingSlot.getBookingSlotUsers() ) );
        bookingSlotDto.setId( bookingSlot.getId() );
        bookingSlotDto.setSlotValue( bookingSlot.getSlotValue() );
        bookingSlotDto.setNote( bookingSlot.getNote() );
        bookingSlotDto.setBookingDate( bookingSlot.getBookingDate() );
        bookingSlotDto.setBookingTimeSlot( bookingSlot.getBookingTimeSlot() );
        return bookingSlotDto;
    }

    /*
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
*/









}
