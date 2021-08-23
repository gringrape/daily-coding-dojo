def solution(prices):
    stack = []

    def pop_and_record(current_time):
        stored_time, _ = stack.pop()
        prices[stored_time] = current_time - stored_time

    for time, price in enumerate(prices):
        while stack and stack[-1][1] > price:
            pop_and_record(time)
        stack.append((time, price))

    while stack:
        pop_and_record(len(prices) - 1)

    return prices


def test_solution():
    assert solution([1, 2, 3, 2, 3]) == [4, 3, 1, 1, 0]
