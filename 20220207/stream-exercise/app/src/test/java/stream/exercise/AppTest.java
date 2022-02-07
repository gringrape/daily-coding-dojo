/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package stream.exercise;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AppTest {
    private List<List<Integer>> getPiboNumbers(int amount) {
        return Stream
                .iterate(List.of(0, 1), last -> List.of(last.get(1), last.get(0) + last.get(1)))
                .limit(amount)
                .toList();
    }

    @Test
    void testEquals() {
        assertEquals(List.of(1, 2), List.of(1, 2));
    }

    @Test
    void testPibo() {
        List<List<Integer>> numbers = getPiboNumbers(5);
        assertEquals(List.of(0, 1), numbers.get(0));
        assertEquals(List.of(1, 1), numbers.get(1));
        assertEquals(List.of(1, 2), numbers.get(2));
        assertEquals(List.of(2, 3), numbers.get(3));
    }
}