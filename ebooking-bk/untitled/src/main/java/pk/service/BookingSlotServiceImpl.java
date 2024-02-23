package pk.service;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pk.entity.BookingArticleSlot;
import pk.entity.BookingSlot;
import pk.mapperDto.BookingSlotMapper;
import pk.modelDto.BookingTableSlot;
import pk.repository.BookingArticleSlotJpaRepository;
import pk.repository.BookingSlotJpaRepository;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingSlotServiceImpl implements BookingSlotService {


    @Autowired
    public BookingSlotServiceImpl(BookingSlotJpaRepository bookingSlotJpaRepository, BookingArticleSlotJpaRepository bookingArticleSlotJpaRepository) {
        this.bookingSlotJpaRepository = bookingSlotJpaRepository;
        this.bookingArticleSlotJpaRepository = bookingArticleSlotJpaRepository;
    }

    private final BookingSlotJpaRepository bookingSlotJpaRepository;
    private final BookingArticleSlotJpaRepository bookingArticleSlotJpaRepository;
    private final BookingSlotMapper bookingSlotMapper = Mappers.getMapper(BookingSlotMapper.class);


   /* public List<BookingSlotDto> getBookingSlots(Date bookingDate) {
        Optional<BookingSlot> bookingSlot=bookingSlotJpaRepository.findById(1L);
        log.info("getBookingSlots:"+bookingSlotJpaRepository.findAll()==null?"null":"neco");
        return bookingSlotMapper.bookingSlotsToBookingSlotsDto(bookingSlotJpaRepository.findAll());
    }*/
    //</editor-fold>

    @Override
    public List<BookingTableSlot> getBookingTableSlots(String bookingDate) {
        List<BookingTableSlot> bookingArticleTableSlots = getBookingArticleSlots(bookingDate);
        List<BookingTableSlot> bookingTableSlots = getBookingSlots(bookingDate);
        return combineBookingAndArticleSlots(bookingTableSlots,bookingArticleTableSlots);
    }
    public List<BookingTableSlot> combineBookingAndArticleSlots(List<BookingTableSlot> bookingTableSlots,List<BookingTableSlot> bookingArticleTableSlots) {
        List<BookingTableSlot> cBookingTableSlots=null;
        if(bookingTableSlots==null || bookingTableSlots.size()==0){
            cBookingTableSlots=bookingArticleTableSlots;
        }else{

        }
        return cBookingTableSlots;
    }

    @Override
    public List<BookingTableSlot> getBookingSlots(String bookingDate) {

        List<BookingTableSlot> bookingTableSlots = bookingSlotJpaRepository.findByBookingDate(bookingDate).stream().map(
                bookingSlot -> {
                    BookingTableSlot bookingTableSlot = new BookingTableSlot();
                    bookingTableSlot.setSlotKey("k1-2024-02-17-1030-1100");
                    bookingTableSlot.setSlotValue("BOOKED");
                    bookingTableSlot.setPriority(10);
                    return bookingTableSlot;
                }
        ).collect(Collectors.toList());
        return bookingTableSlots;
    }

    @Override
    public List<BookingTableSlot> getBookingArticleSlots(String bookingDateString) {
        LocalDate bookingDate = LocalDate.parse(bookingDateString);
        List<BookingTableSlot> bookingTableSlots = new ArrayList<BookingTableSlot>();
        List<BookingArticleSlot> bookingArticleSlots = bookingArticleSlotJpaRepository.getAllBetweenDates(bookingDate);
        bookingArticleSlots.forEach(bookingArticleSlot -> {
            String[] timeSlots = bookingArticleSlot.getTimeSlot().split("-", 2);
            String bookingArticleStartTimeSlot = timeSlots[0];
            String bookingArticleEndTimeSlot = timeSlots[1];
            String iStartTimeSlot = bookingArticleStartTimeSlot;
            DayOfWeek bookingDayOfWeek = bookingDate.getDayOfWeek();
            if ((bookingArticleSlot.getRepeatDay().equals(bookingDayOfWeek.name()) || bookingArticleSlot.getRepeatDay().equals("ONCE-" + bookingDateString))) {
                while (compareTimeStols(iStartTimeSlot, bookingArticleEndTimeSlot) < 0) {
                    String iEndTimeSlot = getEndTimeSlot2pH(iStartTimeSlot);
                    String slotKey = bookingArticleSlot.getBookingArticle().getKey() + "-" + bookingDate + "-" + iStartTimeSlot + "-" + iEndTimeSlot;
                    log.info("gen. time slot, next value:" + slotKey);
                    BookingTableSlot bookingTableSlot = new BookingTableSlot();
                    bookingTableSlot.setSlotValue(bookingArticleSlot.getStatus());
                    bookingTableSlot.setSlotKey(slotKey);
                    bookingTableSlot.setPriority(bookingArticleSlot.getPriority());
                    addBookingTableSlot(bookingTableSlot, bookingTableSlots);
                    iStartTimeSlot = iEndTimeSlot;
                }
            }
        });
        return bookingTableSlots;

    }

    void addBookingTableSlot(BookingTableSlot bookingTableSlot, List<BookingTableSlot> bookingTableSlots) {
        Optional<BookingTableSlot> bookingTableSlotF = bookingTableSlots.stream().filter(iBookingTableSlot -> (iBookingTableSlot.getSlotKey().equals(bookingTableSlot.getSlotKey()))).findFirst();
        if (!bookingTableSlotF.isPresent()) {
            log.info("add slot :" + bookingTableSlot.getSlotKey());
            bookingTableSlots.add(bookingTableSlot);
        } else if (bookingTableSlotF.isPresent() && bookingTableSlotF.get().getPriority() < bookingTableSlot.getPriority()) {
            bookingTableSlots.remove(bookingTableSlotF);
            bookingTableSlots.add(bookingTableSlot);
            log.info("remove slot and add:" + bookingTableSlot.getSlotKey());
        } else {
            log.info("do nothing:" + bookingTableSlot.getSlotKey());
        }
    }

    String getEndTimeSlot2pH(String timeSlot) {
        String hour = timeSlot.substring(0, 2);
        String minutes = timeSlot.substring(2, 4);
        String newHour;
        String newMinutes;
        if (minutes.equals("00")) {
            newMinutes = "30";
            newHour = hour;
        } else if (minutes.equals("30")) {
            newMinutes = "00";
            newHour = String.format("%02d", Integer.parseInt(hour) + 1);

        } else {
            throw new RuntimeException("timeSlot error, wrong value:" + timeSlot);
        }
        return newHour + newMinutes;
    }

    int compareTimeStols(String timeSlot1, String timeSlot2) {
        return timeSlot1.compareTo(timeSlot2);
    }


}
