package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pk.entity.BookingArticleSlot;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface BookingArticleSlotJpaRepository extends JpaRepository<BookingArticleSlot,Long> {

    @Query(value = "from BookingArticleSlot t where fromDate <= :bookingDate AND :bookingDate <=toDate")
    public List<BookingArticleSlot> getAllBetweenDates(@Param("bookingDate") LocalDate startDate);

}

