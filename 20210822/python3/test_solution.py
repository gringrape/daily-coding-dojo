def solution(lottos, win_nums):
    count_zeros = len([i for i in lottos if i == 0])
    count_match = len([i for i in lottos if i in win_nums])

    rank = [6, 6, 5, 4, 3, 2, 1]

    return [rank[m] for m in (count_zeros + count_match, count_match)]


def test_sample():
    assert solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]) == [3, 5]
