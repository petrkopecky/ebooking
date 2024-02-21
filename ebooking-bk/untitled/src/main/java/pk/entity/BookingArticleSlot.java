package pk.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
public class BookingArticleSlot {
    /*
    id
    articleId
    status /OPEN/
    repeatingDay /0,1,2 ....7/
    timeSlot 1100-1200
    fromDate
    toDate
    priority
*/
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne
    BookingArticle bookingArticle;
    String status;
    String repeatDay;
    String timeSlot;

    LocalDate fromDate;
    LocalDate toDate;
    Integer priority;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookingArticle getBookingArticle() {
        return bookingArticle;
    }

    public void setBookingArticle(BookingArticle bookingArticle) {
        this.bookingArticle = bookingArticle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRepeatDay() {
        return repeatDay;
    }

    public void setRepeatDay(String repeatDay) {
        this.repeatDay = repeatDay;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }
}
