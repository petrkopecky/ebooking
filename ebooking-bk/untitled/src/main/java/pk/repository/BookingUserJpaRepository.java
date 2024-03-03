package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pk.entity.BookingUser;

@Repository
public interface BookingUserJpaRepository extends JpaRepository<BookingUser,Long> {


    public BookingUser findByUserName( String userName);
}

