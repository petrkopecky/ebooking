package pk.modelDto;


import java.time.LocalDateTime;

public class BookingSlotUserDto {

    Long id;

    //BookingSlotDto bookingSlotDto;

    BookingUserDto bookingUserDto;

    LocalDateTime bookedAt;

    int orderNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public BookingUserDto getBookingUserDto() {
        return bookingUserDto;
    }

    public void setBookingUserDto(BookingUserDto bookingUserDto) {
        this.bookingUserDto = bookingUserDto;
    }

    public LocalDateTime getBookedAt() {
        return bookedAt;
    }

    public void setBookedAt(LocalDateTime bookedAt) {
        this.bookedAt = bookedAt;
    }

    public int getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }
}
