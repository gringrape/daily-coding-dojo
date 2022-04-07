package keypad;

import java.util.List;
import java.util.Map;

public class KeyPad {
    private final Hands hands;

    KeyPad(Hands hands) {
        this.hands = hands;
    }

    public void push(int number) {
        List<Integer> leftNumbers = List.of(1, 4, 7);
        List<Integer> rightNumbers = List.of(3, 6, 9);
        List<Integer> middleNumbers = List.of(2, 5, 8, 0);

        if (leftNumbers.contains(number)) {
            this.hands.push(number, "L");
        }

        if (rightNumbers.contains(number)) {
            this.hands.push(number, "R");
        }

        if (middleNumbers.contains(number)) {
            this.hands.push(number, nearHand(number));
        }
    }

    private String nearHand(int number) {
        int distanceFromLeft = distance(hands.leftPosition(), String.valueOf(number));
        int distanceFromRight = distance(hands.rightPosition(), String.valueOf(number));

        if (distanceFromLeft < distanceFromRight) {
            return "L";
        }

        if (distanceFromLeft > distanceFromRight) {
            return "R";
        }

        return "";
    }

    private int distance(String positionA, String positionB) {
        Map<String, List<Integer>> coordinates = Map.ofEntries(
                Map.entry("*", List.of(0, 0)),
                Map.entry("0", List.of(1, 0)),
                Map.entry("#", List.of(2, 0)),

                Map.entry("7", List.of(0, 1)),
                Map.entry("8", List.of(1, 1)),
                Map.entry("9", List.of(2, 1)),

                Map.entry("4", List.of(0, 2)),
                Map.entry("5", List.of(1, 2)),
                Map.entry("6", List.of(2, 2)),

                Map.entry("1", List.of(0, 3)),
                Map.entry("2", List.of(1, 3)),
                Map.entry("3", List.of(2, 3))
        );

        int x1 = coordinates.get(positionA).get(0);
        int y1 = coordinates.get(positionA).get(1);
        int x2 = coordinates.get(positionB).get(0);
        int y2 = coordinates.get(positionB).get(1);

        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    }

    public String hands() {
        return this.hands.logs();
    }
}
