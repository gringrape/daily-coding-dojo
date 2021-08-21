def solution(n):
    data = [[0] * i for i in range(1, n + 1)]
    current = [-1, 0]
    k = 1

    def down():
        current[0] += 1

    def right():
        current[1] += 1

    def diagonal():
        current[0] -= 1
        current[1] -= 1

    for i in range(n):
        update = {0: down, 1: right, 2: diagonal}[i % 3]
        for _ in range(n - i):
            update()
            x, y = current
            data[x][y] = k
            k += 1

    return [i for row in data for i in row]


def test_sample():
    assert solution(1) == [1]
    assert solution(4) == [1, 2, 9, 3, 10, 8, 4, 5, 6, 7]
