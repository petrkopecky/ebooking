package pk.modelDto;

public class LoggedUserDto extends BookingUserDto {
    private String authtoken;

    public String getAuthtoken() {
        return authtoken;
    }

    public void setAuthtoken(String authtoken) {
        this.authtoken = authtoken;
    }
}
