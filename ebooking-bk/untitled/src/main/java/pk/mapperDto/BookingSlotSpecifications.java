package pk.mapperDto;

import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import pk.entity.BookingSlot;
import pk.entity.BookingSlotUser;

public class BookingSlotSpecifications {
    public static Specification<BookingSlot> hasNoteLike(String note) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.<String>get("note"), "%" + note + "%");
    }

    public static Specification<BookingSlot> hasOrderNumber(int orderNumber) {
        return (root, query, criteriaBuilder) ->
        {
            Join<BookingSlot, BookingSlotUser> bookingSlot = root.join("bookingSlotUsers");
            return    criteriaBuilder.equal(bookingSlot.get("orderNumber"),orderNumber);
        };
    }

    public static Specification<BookingSlot> orderBy(int orderNumber) {
        return (root, query, criteriaBuilder) ->
        {
            Join<BookingSlot, BookingSlotUser> bookingSlot = root.join("bookingSlotUsers");
            return    criteriaBuilder.equal(bookingSlot.get("orderNumber"),orderNumber);
        };
    }
}
