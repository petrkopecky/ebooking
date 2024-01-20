package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.entity.BookingUser;

@Repository
public interface BookingUserJpaRepository extends JpaRepository<BookingUser,Long> {
}

