package tddbe;

class Money implements Expression {
    protected int amount;
    protected String currency;

    Money(int amount, String currency) {
        this.currency = currency;
        this.amount = amount;
    }

    String currency() {
        return this.currency;
    }

    public boolean equals(Object object) {
        Money other = (Money) object;

        return this.currency.equals(other.currency) && this.amount == other.amount;
    }

    public Expression plus(Money addend) {
        return new Sum(this, addend);
    }

    public String toString() {
        return currency + " " + amount;
    }

    static Money dollar(int amount) {
        return new Money(amount, "USD");
    }

    static Money franc(int amount) {
        return new Money(amount, "CHF");
    }

    Money times(int multiplier) {
        return new Money(amount * multiplier, currency);
    }
}
