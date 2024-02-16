package pk.service;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pk.entity.BookingSlot;
import pk.mapperDto.BookingSlotMapper;
import pk.mapperDto.BookingUserMapper;
import pk.modelDto.BookingSlotDto;
import pk.modelDto.BookingTableStot;
import pk.repository.BookingSlotJpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    public List<BookingTableStot> getBookingSlots(Date bookingDate) {
        return null;
    }
}
