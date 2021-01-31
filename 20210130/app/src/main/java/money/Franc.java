package money;

public class Franc extends Money {
    public Franc(double amount) {
        super(amount, "CHF");
    }

    public static Franc of(double amount) {
        return new Franc(amount);
    }
}
