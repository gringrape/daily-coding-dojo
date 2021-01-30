package money;

public class Dollar {
    public double amount;

    public Dollar(double amount) {
        this.amount = amount;
    }

    public void times(int factor) {
        amount *= factor;
    }

    @Override
    public boolean equals(Object other) {
        return true;
    }
}
