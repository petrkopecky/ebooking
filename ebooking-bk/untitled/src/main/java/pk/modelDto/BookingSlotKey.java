package pk.modelDto;

public class BookingSlotKey {
    String getBookingArticleKey;
    String bookingTimeSlot;
    String bookingDate;

    public String getBookingArticleKey() {
        return getBookingArticleKey;
    }

    public void setBookingArticleKey(String getBookingArticleKey) {
        this.getBookingArticleKey = getBookingArticleKey;
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
