def find_targets(board, target):
    M = len(board)
    N = len(board[0])

    def find_adjacent(i, j):
        out_of_boundary = i < 0 or i >= M or j < 0 or j >= N

        if out_of_boundary or board[i][j] != target:
            return []

        board[i][j] = 2

        return (
            [[i, j]]
            + find_adjacent(i - 1, j)
            + find_adjacent(i, j + 1)
            + find_adjacent(i + 1, j)
            + find_adjacent(i, j - 1)
        )

    return [
        find_adjacent(i, j) for i in range(M) for j in range(N) if board[i][j] == target
    ]


def test_find_targets():
    assert (
        find_targets(
            [
                [1, 1, 0],
                [1, 0, 0],
                [0, 0, 0],
            ],
            1,
        )
        == [[[0, 0], [0, 1], [1, 0]]]
    )

    assert (
        find_targets(
            [
                [1, 1, 0],
                [1, 0, 1],
                [0, 1, 1],
            ],
            1,
        )
        == [[[0, 0], [0, 1], [1, 0]], [[1, 2], [2, 2], [2, 1]]]
    )


def equal(block, frame):
    if len(block) != len(frame):
        return False

    def normalize(pieces):
        min_y = min(i for [_, i] in pieces)
        min_x = min(i for [i, _] in pieces)

        return sorted([[x - min_x, y - min_y] for [x, y] in pieces])

    return all(
        x1 == x2 and y1 == y2
        for [x1, y1], [x2, y2] in zip(normalize(block), normalize(frame))
    )


def test_equal():
    assert equal([[0, 0], [0, 1], [0, 2]], [[1, 1], [1, 2], [1, 3]]) == True


def rotate_90(block):
    M = max(i for piece in block for i in piece)
    return [[y, M - x] for [x, y] in block]


def test_rotate_90():
    assert rotate_90([[0, 0], [1, 0], [0, 1], [0, 2]]) == [
        [0, 2],
        [0, 1],
        [1, 2],
        [2, 2],
    ]


def solution(game_board, table):
    blocks = find_targets(table, 1)
    frames = find_targets(game_board, 0)

    result = 0

    for block in blocks:
        rotates = [block]
        for _ in [0, 90, 180, 270]:
            rotates.append(rotate_90(rotates[-1]))

        found = next(
            (frame for frame in frames for rotated in rotates if equal(rotated, frame)),
            None,
        )

        if found:
            result += len(block)
            frames.remove(found)

    return result


def test_solution():
    assert (
        solution(
            [
                [1, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 1, 0],
                [0, 1, 1, 0, 0, 1],
                [1, 1, 0, 1, 1, 1],
                [1, 0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0, 0],
            ],
            [
                [1, 0, 0, 1, 1, 0],
                [1, 0, 1, 0, 1, 0],
                [0, 1, 1, 0, 1, 1],
                [0, 0, 1, 0, 0, 0],
                [1, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0],
            ],
        )
        == 14
    )
