from itertools import product


def solution(n, s, a, b, fares):
    INFINITY = 1000000000
    min_fares = [[INFINITY] * n for _ in range(n)]

    for i in range(n):
        min_fares[i][i] = 0

    for u, v, fare in fares:
        min_fares[u - 1][v - 1] = min_fares[v - 1][u - 1] = fare

    for k, i, j in product(range(n), repeat=3):
        if min_fares[i][j] > (indirect := min_fares[i][k] + min_fares[k][j]):
            min_fares[i][j] = indirect

    return min(
        [
            min_fares[s - 1][x] + min_fares[x][a - 1] + min_fares[x][b - 1]
            for x in range(n)
        ]
    )


def test_sample():
    assert (
        solution(
            6,
            4,
            6,
            2,
            [
                [4, 1, 10],
                [3, 5, 24],
                [5, 6, 2],
                [3, 1, 41],
                [5, 1, 24],
                [4, 6, 50],
                [2, 4, 66],
                [2, 3, 22],
                [1, 6, 25],
            ],
        )
        == 82
    )
