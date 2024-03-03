package pk.pk.controller;

import pk.modelDto.BookingUserDto;

public class BookingUserLoginResponse {
    String statusCode;
    String statusMessage;
    BookingUserDto bookingUser;

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    public BookingUserDto getBookingUser() {
        return bookingUser;
    }

    public void setBookingUser(BookingUserDto bookingUser) {
        this.bookingUser = bookingUser;
    }
}
