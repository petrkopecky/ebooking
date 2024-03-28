package pk.mapperDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;

import java.util.List;

@Repository
public class BookingSlotDao {
    @Autowired
    EntityManager em;
    public void xx(){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<BookingSlot> cq = cb.createQuery(BookingSlot.class);
        Root<BookingSlot> bookingSlotRoot = cq.from(BookingSlot.class);
        TypedQuery<BookingSlot> query = em.createQuery(cq);
        List<BookingSlot> bookingSlotList=query.getResultList();

        return;
    }

    public void x(){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<BookingSlot> cq = cb.createQuery(BookingSlot.class);
        Root<BookingSlot> bookingSlotRoot = cq.from(BookingSlot.class);
        Join<BookingSlot, BookingSlotUser> bookingSlot =bookingSlotRoot.join("bookingSlotUsers");
        Predicate predicate = cb.equal(bookingSlot.get("orderNumber"), 2);
        cq.where(predicate);
        cq.orderBy(cb.asc(bookingSlot.get("orderNumber")));
        TypedQuery<BookingSlot> query = em.createQuery(cq);
        List<BookingSlot> bookingSlotList=query.getResultList();
        return;
    }

}
