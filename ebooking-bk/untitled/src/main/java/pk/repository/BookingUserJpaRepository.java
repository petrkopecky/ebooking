package pk.repository;


import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pk.entity.BookingUser;

import java.util.List;

@Repository
public interface BookingUserJpaRepository extends JpaRepository<BookingUser,Long> {


    public BookingUser findByUserName(String userName);

    public BookingUser getById(Long id);
    @Query(value = "from BookingUser t where isActive=true")
    List<BookingUser> findAllActive(Sort sort);
}

