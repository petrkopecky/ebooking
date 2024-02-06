package pk.service;
import java.io.File;
import java.io.FileNotFoundException;
import java.net.URL;
import java.nio.file.*;
import java.util.Scanner;

import org.springframework.stereotype.Service;

@Service
public class BookingTableStructureServiceImpl implements BookingTableStructureService{

    private String bookingTableStructureFilePath;
    public String getBookingTableStructure(){
            try {
                String data="";
                File myObj = new File(bookingTableStructureFilePath);
                Scanner myReader = new Scanner(myObj);
                while (myReader.hasNextLine()) {
                    data = myReader.nextLine();
                    System.out.println(data);
                }
                myReader.close();
                return data;
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e.getMessage());
            }
    }
}
