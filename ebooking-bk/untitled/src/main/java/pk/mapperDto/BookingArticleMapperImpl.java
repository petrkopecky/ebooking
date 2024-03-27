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


public class BookingArticleMapperImpl {

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

    public BookingArticle bookingArticleDtoToBookingArticle(BookingArticleDto bookingArticleDto) {
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


}
