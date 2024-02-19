package pk.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity

public class BookingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @ManyToOne
    BookingArticle bookingArticle;
    String slotValue;
    String note;
    String bookingDate; //20240406
    String bookingTimeSlot; //0800-0830
    @ManyToMany
    @JoinTable(
            name = "booking_slot_booking_user",
            joinColumns = @JoinColumn(name = "booking_slot_id"),
            inverseJoinColumns = @JoinColumn(name = "booing_user_id"))

    List<BookingUser> bookingUsers;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public BookingArticle getBookingArticle() {
        return bookingArticle;
    }

    public void setBookingArticle(BookingArticle bookingArticle) {
        this.bookingArticle = bookingArticle;
    }

    public List<BookingUser> getBookingUsers() {
        return bookingUsers;
    }

    public void setBookingUsers(List<BookingUser> bookingUsers) {
        this.bookingUsers = bookingUsers;
    }


}
