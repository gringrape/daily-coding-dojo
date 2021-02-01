package money;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MoneyTest {
    @Test void multiply() {
        assertThat(Money.dollar(5).times(2)).isEqualTo(Money.dollar(10));

        assertThat(Money.franc(5).times(2)).isEqualTo(Money.franc(10));
    }

    @Test void equal() {
        assertThat(Money.dollar(5)).isEqualTo(Money.dollar(5));
        assertThat(Money.dollar(5)).isNotEqualTo(Money.dollar(6));

        assertThat(Money.franc(5)).isEqualTo(Money.franc(5));
        assertThat(Money.franc(5)).isNotEqualTo(Money.franc(6));
    }

    @Test void string() {
        assertThat(Money.dollar(10).toString()).isEqualTo("USD(10.0)");

        assertThat(Money.franc(10).toString()).isEqualTo("CHF(10.0)");
    }

    @Test void plusDollar() {
        Money five = Money.dollar(5);
        Money ten = Money.dollar(10);
        assertThat(five.plus(five)).isEqualTo(ten);
    }

    @Test void plusFranc() {
        Money five = Money.franc(5);
        Money ten = Money.franc(10);
        assertThat(five.plus(five)).isEqualTo(ten);
    }
}
