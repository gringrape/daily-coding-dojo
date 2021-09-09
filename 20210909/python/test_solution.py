def win_rate(head2head, boxer):
    results = head2head[boxer - 1]
    wins, loses = (results.count(i) for i in ("W", "L"))

    return wins / total if (total := (wins + loses)) else 0


def wins_over_heavier(weights, head2head, boxer):
    return sum(
        r == "W" and weights[i] > weights[boxer - 1]
        for i, r in enumerate(head2head[boxer - 1])
    )


def solution(weights, head2head):
    boxers = list(range(1, len(weights) + 1))

    return sorted(
        boxers,
        key=lambda boxer: (
            win_rate(head2head, boxer),
            wins_over_heavier(weights, head2head, boxer),
            weights[boxer - 1],
        ),
        reverse=True,
    )


def test_win_rate():
    assert win_rate(["NL", "WN"], 2) == 1
    assert win_rate(["NLW", "WNL", "LWN"], 1) == 0.5


def test_rate_no_match():
    assert (
        wins_over_heavier(
            [50, 82, 64, 120],
            ["NLWL", "WNLL", "LWNW", "WWLN"],
            3,
        )
        == 2
    )
    assert (
        wins_over_heavier(
            [50, 82, 64, 120],
            ["NLWL", "WNLL", "LWNW", "WWLN"],
            4,
        )
        == 0
    )


def test_sample():
    assert (
        solution(
            [50, 82, 75, 120],
            ["NLWL", "WNLL", "LWNW", "WWLN"],
        )
    ) == [3, 4, 1, 2]
