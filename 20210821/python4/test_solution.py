def solution(arr):
    result = [0, 0]

    def go(array):
        first = array[0][0]

        if all(i == first for row in array for i in row):
            result[first] += 1
            return

        half_row = int(len(array) / 2)
        half_column = int(len(array[0]) / 2)

        go([row[:half_column] for row in array[:half_row]])
        go([row[half_column:] for row in array[:half_row]])
        go([row[:half_column] for row in array[half_row:]])
        go([row[half_column:] for row in array[half_row:]])

    go(arr)

    return result


def test_simple():
    assert solution([[1, 1], [1, 1]]) == [0, 1]
    assert solution([[0, 0], [0, 0]]) == [1, 0]
    assert solution([[1, 1], [1, 0]]) == [1, 3]


def test_sample():
    assert solution([[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 1, 1]]) == [4, 9]
