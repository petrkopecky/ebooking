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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingSlotServiceImpl implements  BookingSlotService{
    @Autowired
    public BookingSlotServiceImpl(BookingSlotJpaRepository bookingSlotJpaRepository,BookingArticleSlotJpaRepository bookingArticleSlotJpaRepository){
        this.bookingSlotJpaRepository=bookingSlotJpaRepository;
        this.bookingArticleSlotJpaRepository=bookingArticleSlotJpaRepository;
    }

    private final BookingSlotJpaRepository bookingSlotJpaRepository;
    private final BookingArticleSlotJpaRepository bookingArticleSlotJpaRepository;
    private final BookingSlotMapper bookingSlotMapper= Mappers.getMapper(BookingSlotMapper.class);


   /* public List<BookingSlotDto> getBookingSlots(Date bookingDate) {
        Optional<BookingSlot> bookingSlot=bookingSlotJpaRepository.findById(1L);
        log.info("getBookingSlots:"+bookingSlotJpaRepository.findAll()==null?"null":"neco");
        return bookingSlotMapper.bookingSlotsToBookingSlotsDto(bookingSlotJpaRepository.findAll());
    }*/
    //</editor-fold>


    @Override
    public List<BookingTableSlot> getBookingSlots(String bookingDate) {

        List<BookingTableSlot> bookingTableSlots =bookingSlotJpaRepository.findByBookingDate(bookingDate).stream().map(
                bookingSlot->{
                    BookingTableSlot bookingTableSlot=new BookingTableSlot();
                    bookingTableSlot.setSlotKey("k1-20240217-1030-1100");
                    bookingTableSlot.setSlotValue("BOOKED");
                    return bookingTableSlot;
                }
        ).collect(Collectors.toList());
        return bookingTableSlots;
    }

    @Override
    public List<BookingTableSlot> getBookingArticleSlots(String bookingDate){
        LocalDate bookingDateParam=LocalDate.parse("2024-01-01");
        List<BookingArticleSlot> bookingArticleSlots=bookingArticleSlotJpaRepository.getAllBetweenDates(bookingDateParam);
        List<BookingTableSlot> bookingTableSlots=new ArrayList<BookingTableSlot>();
        bookingArticleSlots.forEach(bookingArticleSlot -> {
            String[] timeSlots=bookingArticleSlot.getTimeSlot().split("-",2);
            String bookingArticleStartTimeSlot=timeSlots[0];
            String bookingArticleEndTimeSlot=timeSlots[1];
            String iStartTimeSlot=bookingArticleStartTimeSlot;
            //kontrola na den v tydnu
            //pred vlozeni kontrola zda neexituje s vetsi prioritou
            while(compareTimeStols(iStartTimeSlot,bookingArticleEndTimeSlot)<0){
                String iEndTimeSlot=getEndTimeSlot2pH(iStartTimeSlot);
                log.info("gen. time slot, next value:"+iStartTimeSlot);
                BookingTableSlot bookingTableSlot=new BookingTableSlot();
                bookingTableSlot.setSlotValue(bookingArticleSlot.getStatus());
                bookingTableSlot.setSlotKey(bookingArticleSlot.getBookingArticle().getKey()+"-"+bookingDate+"-"+iStartTimeSlot+"-"+iEndTimeSlot);
                bookingTableSlots.add(bookingTableSlot);
                iStartTimeSlot=iEndTimeSlot;
            }
        });

        


        if(bookingArticleSlots==null){
            log.info("nullll");
        }else{
            log.info("necooo");
        }
        return null;
    }

    String getEndTimeSlot2pH(String timeSlot){
      String hour=timeSlot.substring(0,2);
      String minutes=timeSlot.substring(2,4);
      String newHour;
      String newMinutes;
      if(minutes.equals("00")){
          newMinutes="30";
          newHour=hour;
      } else if (minutes.equals("30")) {
          newMinutes="00";
          newHour=String.format("%02d",Integer.parseInt(hour)+1);

      }else{
          throw new RuntimeException("timeSlot error, wrong value:"+timeSlot);
      }
      return newHour+newMinutes;
    }

    int compareTimeStols(String timeSlot1,String timeSlot2){
        return timeSlot1.compareTo(timeSlot2);
    }

}
