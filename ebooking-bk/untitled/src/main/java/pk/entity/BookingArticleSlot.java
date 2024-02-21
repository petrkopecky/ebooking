package pk.entity;

import java.time.LocalDate;

public class ArticleSlot {
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
    Long id;
    BookingArticle bookingArticle;
    String status;
    String repeatDay;
    String timeSlot;

    LocalDate fromDate;
    LocalDate toDate;
    Integer priority;

}
