package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pk.entity.BookingSlot;

public interface BookingSlotJpaRepository extends JpaRepository<BookingSlot,Long> {
}
