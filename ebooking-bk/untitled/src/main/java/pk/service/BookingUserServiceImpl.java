package pk.service;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pk.mapperDto.BookingUserMapper;
import pk.modelDto.BookingUserDto;
import pk.modelDto.LoginUserDto;
import pk.repository.BookingUserJpaRepository;

import java.util.List;

@Service
public class BookingUserServiceImpl implements  BookingUserService{

    @Autowired
    public BookingUserServiceImpl(BookingUserJpaRepository bookingUserJpaRepository){
        this.bookingUserJpaRepository=bookingUserJpaRepository;


    }
    private final BookingUserJpaRepository bookingUserJpaRepository;
    private final BookingUserMapper bookingUserMapper=Mappers.getMapper(BookingUserMapper.class);



    @Override
    public BookingUserDto addBookingUser(BookingUserDto bookingUserDto) {

       return bookingUserMapper.bookingUserToBookingUserDto( bookingUserJpaRepository.save(bookingUserMapper.bookingUserDtoToBookingUser(bookingUserDto)));
    }

    @Override
    public List<BookingUserDto> getBookingUsersList() {
        return null;
    }
    @Override
    public BookingUserDto loginUser(LoginUserDto loginUserDto){
        BookingUserDto bookingUserDto=new BookingUserDto();
        bookingUserDto.setUserName("john");
        bookingUserDto.setPin(7);
        bookingUserDto.setAuthtoken("auth-john");
        return bookingUserDto;
    }
}
