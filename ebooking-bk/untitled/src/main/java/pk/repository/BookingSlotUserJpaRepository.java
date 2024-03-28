package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;

@Repository
public interface BookingSlotUserJpaRepository extends JpaRepository<BookingSlotUser,Long> {
    BookingSlotUser save(BookingSlotUser bookingSlotUser);
    long deleteByBookingSlot(BookingSlot bookingSlot);
}
