package pk.pk.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class ResponseExceptionEx extends ResponseStatusException {

    public ResponseExceptionEx(HttpStatusCode status) {
        super(status);
    }

    public ResponseExceptionEx(HttpStatusCode status, String reason) {
        super(status, reason);
    }

    public ResponseExceptionEx(int rawStatusCode, String reason, Throwable cause) {
        super(rawStatusCode, reason, cause);
    }

    public ResponseExceptionEx(HttpStatusCode status, String reason, Throwable cause) {
        super(status, reason, cause);
    }

    public ResponseExceptionEx(HttpStatusCode status, String reason, Throwable cause, String messageDetailCode, Object[] messageDetailArguments) {
        super(status, reason, cause, messageDetailCode, messageDetailArguments);
    }
}
