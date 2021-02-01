package money;

public class Money {
    protected double amount;
    protected String currency;

    public Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public static Money of(double amount, String currency) {
        return new Money(amount, currency);
    }

    public static Money dollar(double amount) {
        return new Money(amount, "USD");
    }

    public static Money franc(double amount) {
        return new Money(amount, "CHF");
    }

    public Money times(int factor) {
        return new Money(amount * factor, currency);
    }

    public Money plus(Money other) {
        return new Money(amount + other.amount, currency);
    }

    @Override
    public String toString() {
        return currency + "(" + amount + ")";
    }

    @Override
    public boolean equals(Object other) {
        Money money = (Money) other;
        return amount == money.amount;
    }
}
