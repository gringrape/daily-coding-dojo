from itertools import combinations
from itertools import permutations
from itertools import product


def solution(word, cards):
    N = len(cards)
    M = len(word)

    answer = sorted(list(word))

    candidates = [
        sorted([cards[r][c] for r, c in zip(row_select, column_select)])
        for row_select, column_select in product(
            combinations(range(N), M), permutations(range(N), M)
        )
    ]

    count = len([candidate for candidate in candidates if candidate == answer])

    return count


def test_sample():
    assert solution("APPLE", ["LLZKE", "LCXEA", "CVPPS", "EAVSR", "FXPFP"]) == 3
