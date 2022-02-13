/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package coding.interview.java;

import org.junit.jupiter.api.Test;

import java.util.stream.LongStream;

import static org.assertj.core.api.Assertions.assertThat;

class AppTest {
    public int parity(long number) {
        return (int) LongStream.iterate(number, n -> n > 0, n -> n >> 1)
                .map(n -> n & 1)
                .sum() % 2;
    }

    @Test
    void testParity() {
        assertThat(parity(11L)).isEqualTo(1);
        assertThat(parity(8L)).isEqualTo(1);
        assertThat(parity(15L)).isEqualTo(0);
    }
}
