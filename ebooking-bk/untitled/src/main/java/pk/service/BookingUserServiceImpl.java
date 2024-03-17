package pk.service;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pk.entity.BookingUser;
import pk.mapperDto.BookingUserMapper;
import pk.modelDto.BookingUserDto;
import pk.modelDto.LoggedUserDto;
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
        Sort sort = Sort.by(
                Sort.Order.asc("secondName"),
                Sort.Order.asc("firstName"));
        return bookingUserMapper.bookingUsersToBookingUsersDto(bookingUserJpaRepository.findAllActive(sort));
    }

    @Override
    public LoggedUserDto loginUser(LoginUserDto loginUserDto) {
        BookingUser bookingUser = bookingUserJpaRepository.findByUserName(loginUserDto.getUserName());
        LoggedUserDto loggedUserDto = null;
        if (bookingUser == null) {
            throw new UserNotFoundException();
        }
        if (!verifyUserPassword(bookingUser.getPasswordHash(), loginUserDto.getUserPassword())) {
            throw new InvalidPasswordException();
        } else if (bookingUser.isActive() == null || !bookingUser.isActive()) {
            throw new InactiveUserException();
        }
        loggedUserDto = new LoggedUserDto();
        loggedUserDto.setUserName(bookingUser.getUserName());
        loggedUserDto.setFirstName(bookingUser.getFirstName());
        loggedUserDto.setSecondName(bookingUser.getSecondName());
        loggedUserDto.setEmail(bookingUser.getEmail());
        //bookingUserDto.setPasswordHash(bookingUser.getPasswordHash());
        loggedUserDto.setTelefoneNumber(bookingUser.getTelefoneNumber());
        loggedUserDto.setUserRole(bookingUser.getUserRole());
        loggedUserDto.setActive(bookingUser.isActive());
        loggedUserDto.setPin(bookingUser.getPin());
        loggedUserDto.setAuthtoken(bookingUser.getUserName());


        return loggedUserDto;
    }

    @Override
    public BookingUserDto getBookingUserDto(String userName) {
        BookingUser bookingUser = bookingUserJpaRepository.findByUserName(userName);
        BookingUserDto bookingUserDto = null;
        if (bookingUser == null) {
            throw new UserNotFoundException();
        }
        else if (bookingUser.isActive() == null || !bookingUser.isActive()) {
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
        //bookingUserDto.setAuthtoken(bookingUser.getUserName());


        return bookingUserDto;
    }

    @Override
    public BookingUserDto getBookinUserDtoFromAuthorizationToken(String authorizationToken) {
        return getBookingUserDto(authorizationToken);
    }

    boolean verifyUserPassword(String passwordHash, String password) {
        return passwordHash.equals(password);
    }
}
