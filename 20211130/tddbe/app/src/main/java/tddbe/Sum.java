package tddbe;

public class Sum implements Expression {
    Money augend;
    Money addend;

    Sum(Money augend, Money addend) {
        this.augend = augend;
        this.addend = addend;
    }

    public Money reduce(Bank bank, String currency) {
        int sum = augend.amount + addend.amount;
        return new Money(sum, currency);
    }
}
