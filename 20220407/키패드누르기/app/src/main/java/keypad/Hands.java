package keypad;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class Hands {
    private final String handedness;
    private final List<String> history;

    private String leftPosition = "*";
    private String rightPosition = "#";

    public Hands(String handedness) {
        this.history = new ArrayList<>();
        this.handedness = handedness
                .substring(0, 1)
                .toUpperCase(Locale.ROOT); // TODO: 이건 왜 들어가는건지 알아보자!
    }

    public void push(int number, String hand) {
        String pushed = hand.isEmpty() ? handedness : hand;
        String numberString = String.valueOf(number);

        if (pushed.equals("L")) {
            this.leftPosition = numberString;
        }

        if (pushed.equals("R")) {
            this.rightPosition = numberString;
        }

        history.add(pushed);
    }

    public String logs() {
        return String.join("", history);
    }

    public String leftPosition() {
        return this.leftPosition;
    }

    public String rightPosition() {
        return this.rightPosition;
    }
}
