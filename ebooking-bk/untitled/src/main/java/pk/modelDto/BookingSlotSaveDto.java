package pk.modelDto;

import java.util.List;

public class BookingSlotSaveDto {
    Long bookingSlotId;
    String bookingSlotKey;
    Long[] bookingUsersIds;

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

    public Long[] getBookingUsersIds() {
        return bookingUsersIds;
    }

    public void setBookingUsersIds(Long[] bookingUsersIds) {
        this.bookingUsersIds = bookingUsersIds;
    }
}
