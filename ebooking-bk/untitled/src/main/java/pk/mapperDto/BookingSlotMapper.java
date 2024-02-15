package pk.mapperDto;

import org.mapstruct.Mapper;
import pk.entity.BookingSlot;
import pk.modelDto.BookingSlotDto;


import java.util.List;

@Mapper
public interface BookingSlotMapper {
    BookingSlotDto bookingSlotToBookingSlotDto( BookingSlot bookingSlot);
    BookingSlot bookingSlotDtoToBookingSlot( BookingSlotDto bookingSlotDto);


    List<BookingSlotDto> bookingSlotsToBookingSlotsDto(List<BookingSlot> bookingSlots);
    List<BookingSlot> bookingSlotsDtoToBookingSlots( List<BookingSlotDto> bookingSlotsDto);


}
