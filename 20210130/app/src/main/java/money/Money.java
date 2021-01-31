package money;

public abstract class Money {
    protected double amount;
    protected String currency;

    public Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public Money times(int factor) {
        if (currency.equals("USD")) {
            return new Dollar(amount * factor);
        }

        if (currency.equals("CHF")) {
            return new Franc(amount * factor);
        }

        return null;
    }

    public Money plus(Money other) {
        if (currency.equals("USD")) {
            return new Dollar(amount + other.amount);
        }

        if (currency.equals("CHF")) {
            return new Franc(amount + other.amount);
        }

        return null;
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
