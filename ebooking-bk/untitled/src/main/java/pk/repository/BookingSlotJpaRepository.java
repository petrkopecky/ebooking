package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pk.entity.BookingSlot;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface BookingSlotJpaRepository extends JpaRepository<BookingSlot,Long> {
    List<BookingSlot> findByBookingDate(String bookingDate);
    @Query(value = "from BookingSlot t where bookingArticle.key = :bookingArticleKey and bookingDate=:bookingDate and bookingTimeSlot=:bookingTimeSlot  ")
    BookingSlot findByBookingKey(@Param("bookingArticleKey")String bookingArticleKey,@Param("bookingDate") String bookingDate,@Param("bookingTimeSlot") String bookingTimeSlot);


    BookingSlot save(BookingSlot bookingSlot);
}
