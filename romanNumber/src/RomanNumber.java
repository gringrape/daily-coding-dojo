import java.util.Scanner;

// 1. 큰 숫자를 왼쪽에 작은 숫자를 오른쪽에 쓴다.
//  - LX => 50 + 10 = 60 -> o.k.
//  - MLI => 1000 + 50 + 1 => 1051
// 2. 작은 숫자가 큰 숫자의 왼쪽에 오는 경우
//  - XL => -10 + 50

public class RomanNumber {
    public static void main(String[] args) {
        // 0. 준비
        Scanner scanner = new Scanner(System.in);

        // 1. 입력
        System.out.print("roman number: ");
        String romanNumber = scanner.next();

        // 2. 처리
        char[] symbols = romanNumber.toCharArray();
        int[] numbers = new int[symbols.length];
        for (int i = 0; i < symbols.length; i += 1) {
            char symbol = symbols[i];

            if (symbol == 'M') {
                numbers[i] = 1000;
            }

            if (symbol == 'D') {
                numbers[i] = 500;
            }

            if (symbol == 'C') {
                numbers[i] = 100;
            }

            if (symbol == 'L') {
                numbers[i] = 50;
            }

            if (symbol == 'X') {
                numbers[i] = 10;
            }

            if (symbol == 'V') {
                numbers[i] = 5;
            }

            if (symbol == 'I') {
                numbers[i] = 1;
            }
        }

        for (int i = 0; i < numbers.length - 1; i += 1) {
            int number = numbers[i];
            int nextNumber = numbers[i + 1];

            if (number < nextNumber) {
                numbers[i] *= -1;
            }
        }

        int arabicNumber = 0;
        for (int i = 0; i < numbers.length; i += 1) {
            arabicNumber += numbers[i];
        }

        // 3. 출력
        System.out.print("arabic number: " + arabicNumber);
    }
}
