package pk.modelDto;

public class BookingSlotKey {
    Long bookingArticleId;
    String bookingTimeSlot;
    String bookingDate;

    public Long getBookingArticleId() {
        return bookingArticleId;
    }

    public void setBookingArticleId(Long bookingArticleId) {
        this.bookingArticleId = bookingArticleId;
    }

    public String getBookingTimeSlot() {
        return bookingTimeSlot;
    }

    public void setBookingTimeSlot(String bookingTimeSlot) {
        this.bookingTimeSlot = bookingTimeSlot;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }
}
