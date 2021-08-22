def solution(people, limit):
    people_in_order = sorted(people)

    start = 0
    end = len(people) - 1

    count = 0

    while start <= end:
        if people_in_order[start] + people_in_order[end] <= limit:
            start += 1

        count += 1
        end -= 1

    return count


def test_sample():
    assert solution([70, 50, 80, 50], 100) == 3
    assert solution([70, 80, 50], 100) == 3
    assert solution([50], 100) == 1
    assert solution([40, 50], 100) == 1
    assert solution([50, 90], 100) == 2
    assert solution([50, 100], 100) == 2
