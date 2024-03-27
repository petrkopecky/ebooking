package pk.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
public class BookingSlotUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne
    @JoinColumn(name = "booking_slot_id")
    BookingSlot bookingSlot;

    @ManyToOne
    @JoinColumn(name = "booking_user_id")
    BookingUser bookingUser;

    LocalDateTime bookedAt;

    int orderNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookingSlot getBookingSlot() {
        return bookingSlot;
    }

    public void setBookingSlot(BookingSlot bookingSlot) {
        this.bookingSlot = bookingSlot;
    }

    public BookingUser getBookingUser() {
        return bookingUser;
    }

    public void setBookingUser(BookingUser bookingUser) {
        this.bookingUser = bookingUser;
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
