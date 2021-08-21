def solution(gems):
    gem_bag = {}

    def pop(gem):
        if gem_bag.get(gem, 0) > 1:
            gem_bag[gem] -= 1
            return
        gem_bag.pop(gem)

    def push(gem):
        if gem_bag.get(gem, None):
            gem_bag[gem] += 1
            return
        gem_bag[gem] = 1

    ranges = []

    start = 0
    end = 0

    kinds = len(set(gems))

    push(gems[0])

    while True:
        if len(gem_bag) == kinds:
            ranges.append([start + 1, end + 1])
            pop(gems[start])
            start += 1
            continue

        end += 1

        if end == len(gems):
            break
        push(gems[end])

    ranges.sort(key=lambda x: x[0])
    ranges.sort(key=lambda x: x[1] - x[0])

    return ranges[0]


def test_sample():
    assert solution(
        ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]
    ) == [3, 7]
    assert solution(["AA", "AB", "AC", "AA", "AC"]) == [1, 3]
    assert solution(["XYZ", "XYZ", "XYZ"]) == [1, 1]
