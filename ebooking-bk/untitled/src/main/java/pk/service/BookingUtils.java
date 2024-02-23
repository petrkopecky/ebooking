package pk.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BookingUtils {
    public static LocalDate parseDate_yyyyMMdd(String dateYYYYMMDD) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            return LocalDate.parse(dateYYYYMMDD, formatter);
        } catch (Exception ex) {
            throw new RuntimeException("error parse date:" + dateYYYYMMDD);
        }

    }

    public static String dateToString_yyyyMMdd(LocalDate date) {
        DateTimeFormatter formatters = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return date.format(formatters);
    }
}
