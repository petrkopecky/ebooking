package pk.modelDto;
import pk.entity.BookingUser;

import java.util.List;

public class BookingSlotDto {
    Long id;
    BookingArticleDto bookingArticleDto;
    String slotValue;
    String note;
    String bookingDate; //20240406
    String bookingTimeSlot; //0800-0830
    List<BookingSlotUserDto> bookingSlotUsersDto;

    BookingUserDto bookedByUserDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookingArticleDto getBookingArticleDto() {
        return bookingArticleDto;
    }

    public void setBookingArticleDto(BookingArticleDto bookingArticleDto) {
        this.bookingArticleDto = bookingArticleDto;
    }

    public String getSlotValue() {
        return slotValue;
    }

    public void setSlotValue(String slotValue) {
        this.slotValue = slotValue;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingTimeSlot() {
        return bookingTimeSlot;
    }

    public void setBookingTimeSlot(String bookingTimeSlot) {
        this.bookingTimeSlot = bookingTimeSlot;
    }

    public List<BookingSlotUserDto> getBookingSlotUsersDto() {
        return bookingSlotUsersDto;
    }

    public void setBookingSlotUsersDto(List<BookingSlotUserDto> bookingSlotUsersDto) {
        this.bookingSlotUsersDto = bookingSlotUsersDto;
    }

    public BookingUserDto getBookedByUserDto() {
        return bookedByUserDto;
    }

    public void setBookedByUserDto(BookingUserDto bookedByUserDto) {
        this.bookedByUserDto = bookedByUserDto;
    }


}
