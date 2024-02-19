package pk.service;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pk.entity.BookingSlot;
import pk.mapperDto.BookingSlotMapper;
import pk.modelDto.BookingTableSlot;
import pk.repository.BookingSlotJpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingSlotServiceImpl implements  BookingSlotService{
    @Autowired
    public BookingSlotServiceImpl(BookingSlotJpaRepository bookingSlotJpaRepository){
        this.bookingSlotJpaRepository=bookingSlotJpaRepository;
    }

    private final BookingSlotJpaRepository bookingSlotJpaRepository;
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
}
