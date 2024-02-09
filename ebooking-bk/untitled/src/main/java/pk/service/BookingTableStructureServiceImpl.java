package pk.service;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.nio.file.*;
import java.util.Scanner;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BookingTableStructureServiceImpl implements BookingTableStructureService{
    @Value("${booking.bookingTableStructureFilePath}")
    private String bookingTableStructureFilePath;
    //="C:/_tmp/ebooking/ebooking-bk/untitled/config/bookingTableStructure.json";
    public String getBookingTableStructure(){
            log.debug("bookingTableStructureFilePath:"+bookingTableStructureFilePath);
            try {
                Path filePath = Path.of(bookingTableStructureFilePath);
                return  Files.readString(filePath);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
    }
}
