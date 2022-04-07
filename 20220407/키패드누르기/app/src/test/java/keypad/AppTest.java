/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package keypad;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

// TODOs
// 왼쪽 버튼들을 누른다.
// 1. 1 을 누르면 L 을 반환한다. -> 완료
// 2. 3 을 누르면 L 을 반환한다. -> 완료
// 3. 왼쪽 혹은 오른쪽 버튼을 연속해서 누른다. -> 완료
// 4. 왼손과 오른손에서 같은 거리에 있는 중간 버튼을 누른다. -> 완료
// 5. 왼손에서 더 가까운 거리에 있는 중간 버튼을 누른다.
//  문제점 - 빨간색인 상태에서 리팩토링을 오래 하게 된다.

class AppTest {
    @Test
    void testPushLeftOrRightNumbers() {
        Hands hands = new Hands("right");

        KeyPad keyPad = new KeyPad(hands);

        keyPad.push(4);
        keyPad.push(3);
        keyPad.push(1);

        assertThat(keyPad.hands()).isEqualTo("LRL");
    }

    @Test
    void testPushMiddleNumbersWithTheSameDistanceFromHands() {
        Hands hands = new Hands("right");

        KeyPad keyPad = new KeyPad(hands);

        keyPad.push(2);

        assertThat(keyPad.hands()).isEqualTo("R");
    }

    @Test
    void testPushMiddleNumbersWithShorterDistanceFromLeftHand() {
        Hands hands = new Hands("right");

        KeyPad keyPad = new KeyPad(hands);

        keyPad.push(2);
        keyPad.push(0);

        assertThat(keyPad.hands()).isEqualTo("RL");
    }

    @Test
    void testPushMiddleNumbersWithShorterDistanceFromRightHand() {
        Hands hands = new Hands("left");

        KeyPad keyPad = new KeyPad(hands);

        keyPad.push(2);
        keyPad.push(0);

        assertThat(keyPad.hands()).isEqualTo("LR");
    }

    @Test
    void testSampleOne() {
        Hands hands = new Hands("right");

        KeyPad keyPad = new KeyPad(hands);

        Stream.of(1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5).forEach(keyPad::push);

        assertThat(keyPad.hands()).isEqualTo("LRLLLRLLRRL");
    }

    @Test
    void testSampleTwo() {
        Hands hands = new Hands("left");

        KeyPad keyPad = new KeyPad(hands);

        Arrays.stream(new int[]{1,2, 3}).sequential()

        Stream.of(7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2).forEach(keyPad::push);

        assertThat(keyPad.hands()).isEqualTo("LRLLRRLLLRR");
    }
}
