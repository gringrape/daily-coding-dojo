package tddbe;

interface Expression {
    Money reduce(Bank bank, String currency);
}
