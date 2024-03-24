package pk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.entity.BookingArticle;


@Repository
public interface BookingArticleJpaRepository extends JpaRepository<BookingArticle,Long> {

    public BookingArticle getByKey(String key);
}

