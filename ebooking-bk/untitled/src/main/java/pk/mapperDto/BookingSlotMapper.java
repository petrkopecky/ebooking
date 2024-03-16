package pk.mapperDto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pk.entity.BookingSlot;
import pk.modelDto.BookingSlotDto;


import java.util.List;

@Mapper
public interface BookingSlotMapper {
    @Mapping(source="bookingArticle", target="bookingArticleDto")
    @Mapping(source="bookedByUser", target="bookedByUserDto")
    @Mapping(source="bookingUsers", target="bookingUsersDto")
    BookingSlotDto bookingSlotToBookingSlotDto( BookingSlot bookingSlot);
    @Mapping(source="bookingArticleDto", target="bookingArticle")
    @Mapping(source="bookedByUserDto", target="bookedByUser")
    BookingSlot bookingSlotDtoToBookingSlot( BookingSlotDto bookingSlotDto);

/*
    List<BookingSlotDto> bookingSlotsToBookingSlotsDto(List<BookingSlot> bookingSlots);
    List<BookingSlot> bookingSlotsDtoToBookingSlots( List<BookingSlotDto> bookingSlotsDto);
*/

}
