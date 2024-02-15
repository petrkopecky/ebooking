package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.entity.BookingSlot;
@Repository
public interface BookingSlotJpaRepository extends JpaRepository<BookingSlot,Long> {
}
