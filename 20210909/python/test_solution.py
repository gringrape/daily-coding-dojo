def win_rate(match_results):
    wins, loses = (match_results.count(i) for i in ("W", "L"))
    total = wins + loses

    return wins / total if total != 0 else 0


def wins_over_heavier(boxer_weight, match_results, weights):
    return sum(
        match_result == "W" and boxer_weight < enemy_weight
        for match_result, enemy_weight in zip(match_results, weights)
    )


def solution(weights, head2head):
    def comparators(boxer):
        match_results = head2head[boxer - 1]
        boxer_weight = weights[boxer - 1]

        return (
            win_rate(match_results),
            wins_over_heavier(boxer_weight, match_results, weights),
            boxer_weight,
        )

    boxers = list(range(1, len(weights) + 1))
    return sorted(boxers, key=lambda boxer: comparators(boxer), reverse=True)


def test_sample():
    assert (
        solution(
            [50, 82, 75, 120],
            ["NLWL", "WNLL", "LWNW", "WWLN"],
        )
    ) == [3, 4, 1, 2]
