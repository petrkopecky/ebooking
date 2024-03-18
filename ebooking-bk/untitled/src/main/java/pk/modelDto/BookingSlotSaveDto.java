package pk.modelDto;

import java.util.List;

public class BookingSlotSaveDto {
    Long bookingSlotId;
    String bookingSlotKey;
    List<Long> bookingUsersId;

    Long bookedByBookingUserId;

    String note;

    String bookingSlotValue;

    public Long getBookingSlotId() {
        return bookingSlotId;
    }

    public void setBookingSlotId(Long bookingSlotId) {
        this.bookingSlotId = bookingSlotId;
    }

    public String getBookingSlotKey() {
        return bookingSlotKey;
    }

    public void setBookingSlotKey(String bookingSlotKey) {
        this.bookingSlotKey = bookingSlotKey;
    }

    public List<Long> getBookingUsersId() {
        return bookingUsersId;
    }

    public void setBookingUsersId(List<Long> bookingUsersId) {
        this.bookingUsersId = bookingUsersId;
    }

    public Long getBookedByBookingUserId() {
        return bookedByBookingUserId;
    }

    public void setBookedByBookingUserId(Long bookedByBookingUserId) {
        this.bookedByBookingUserId = bookedByBookingUserId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getBookingSlotValue() {
        return bookingSlotValue;
    }

    public void setBookingSlotValue(String bookingSlotValue) {
        this.bookingSlotValue = bookingSlotValue;
    }
}
