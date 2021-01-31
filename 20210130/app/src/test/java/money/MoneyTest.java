package money;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MoneyTest {
    @Test void multiply() {
        assertThat(Dollar.of(5).times(2)).isEqualTo(Dollar.of(10));

        assertThat(Franc.of(5).times(2)).isEqualTo(Franc.of(10));
    }

    @Test void equal() {
        assertThat(Dollar.of(5)).isEqualTo(Dollar.of(5));
        assertThat(Dollar.of(5)).isNotEqualTo(Dollar.of(6));

        assertThat(Franc.of(5)).isEqualTo(Franc.of(5));
        assertThat(Franc.of(5)).isNotEqualTo(Franc.of(6));
    }

    @Test void string() {
        assertThat(Dollar.of(10).toString()).isEqualTo("USD(10.0)");

        assertThat(Franc.of(10).toString()).isEqualTo("CHF(10.0)");
    }

    @Test void plusDollar() {
        Dollar five = Dollar.of(5);
        Dollar ten = Dollar.of(10);
        assertThat(five.plus(five)).isEqualTo(ten);
    }

    @Test void plusFranc() {
        Franc five = Franc.of(5);
        Franc ten = Franc.of(10);
        assertThat(five.plus(five)).isEqualTo(ten);
    }
}
