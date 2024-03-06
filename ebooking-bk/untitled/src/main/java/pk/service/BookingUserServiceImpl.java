package pk.service;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pk.entity.BookingUser;
import pk.mapperDto.BookingUserMapper;
import pk.modelDto.BookingUserDto;
import pk.modelDto.LoginUserDto;
import pk.repository.BookingUserJpaRepository;

import java.util.List;

@Service
public class BookingUserServiceImpl implements BookingUserService {

    @Autowired
    public BookingUserServiceImpl(BookingUserJpaRepository bookingUserJpaRepository) {
        this.bookingUserJpaRepository = bookingUserJpaRepository;


    }

    private final BookingUserJpaRepository bookingUserJpaRepository;
    private final BookingUserMapper bookingUserMapper = Mappers.getMapper(BookingUserMapper.class);


    @Override
    public BookingUserDto addBookingUser(BookingUserDto bookingUserDto) {

        return bookingUserMapper.bookingUserToBookingUserDto(bookingUserJpaRepository.save(bookingUserMapper.bookingUserDtoToBookingUser(bookingUserDto)));
    }

    @Override
    public List<BookingUserDto> getBookingUsersList() {
        return null;
    }

    @Override
    public BookingUserDto loginUser(LoginUserDto loginUserDto) {
        BookingUser bookingUser = bookingUserJpaRepository.findByUserName(loginUserDto.getUserName());
        BookingUserDto bookingUserDto = null;
        if (bookingUser == null) {
            throw new UserNotFoundException();
        }
        if (!verifyUserPassword(bookingUser.getPasswordHash(), loginUserDto.getUserPassword())) {
            throw new InvalidPasswordException();
        } else if (bookingUser.isActive() == null || !bookingUser.isActive()) {
            throw new InactiveUserException();
        }
        bookingUserDto = new BookingUserDto();
        bookingUserDto.setUserName(bookingUser.getUserName());
        bookingUserDto.setFirstName(bookingUser.getFirstName());
        bookingUserDto.setSecondName(bookingUser.getSecondName());
        bookingUserDto.setEmail(bookingUser.getEmail());
        //bookingUserDto.setPasswordHash(bookingUser.getPasswordHash());
        bookingUserDto.setTelefoneNumber(bookingUser.getTelefoneNumber());
        bookingUserDto.setUserRole(bookingUser.getUserRole());
        bookingUserDto.setActive(bookingUser.isActive());
        bookingUserDto.setPin(bookingUser.getPin());
        bookingUserDto.setAuthtoken(bookingUser.getUserName());


        return bookingUserDto;
    }

    boolean verifyUserPassword(String passwordHash, String password) {
        return passwordHash.equals(password);
    }
}
