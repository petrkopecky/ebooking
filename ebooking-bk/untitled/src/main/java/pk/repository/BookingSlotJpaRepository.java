package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pk.entity.BookingSlot;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface BookingSlotJpaRepository extends JpaRepository<BookingSlot,Long> {
    List<BookingSlot> findByBookingDate(String bookingDate);
}
