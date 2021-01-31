package money;

public class Dollar extends Money {
    public Dollar(double amount) {
        super(amount, "USD");
    }

    public static Dollar of(double amount) {
        return new Dollar(amount);
    }
}
