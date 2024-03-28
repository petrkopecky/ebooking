package pk.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pk.entity.BookingSlot;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingSlotJpaRepository extends JpaRepository<BookingSlot,Long>, JpaSpecificationExecutor<BookingSlot> {
    List<BookingSlot> findByBookingDate(String bookingDate);
    @Query(value = "from BookingSlot t where bookingArticle.key = :bookingArticleKey and bookingDate=:bookingDate and bookingTimeSlot=:bookingTimeSlot  ")
    BookingSlot findByBookingKey(@Param("bookingArticleKey")String bookingArticleKey, @Param("bookingDate") String bookingDate, @Param("bookingTimeSlot") String bookingTimeSlot);
    BookingSlot save(BookingSlot bookingSlot);



    /*
    @Query(
            nativeQuery = true,
            value
                    = "SELECT bs.* FROM booking_slot as bs join booking_slot_user bsu on bs.id=bsu.booking_slot_id where bs.id=:id and bsu.order_number=2 order by bs.id, bsu.order_number" )
    Optional<BookingSlot> findx(@Param("id") int id);
*/


}


