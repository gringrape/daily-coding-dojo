package money;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MoneyTest {
    @Test void multiply() {
        Dollar dollar = new Dollar(5);
        dollar.times(2);
        assertThat(dollar.amount).isEqualTo(10);
    }

    @Test void equal() {
        assertThat(new Dollar(5)).isEqualTo(new Dollar(5));
//        assertThat(new Dollar(5)).isNotEqualTo(new Dollar(6));
    }
}
