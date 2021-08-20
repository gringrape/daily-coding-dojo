def solution(numCourses, prerequsites, queries):
    requisites = [[False for _ in range(numCourses)] for _ in range(numCourses)]

    for pre, cur in prerequsites:
        requisites[pre][cur] = True

    for k in range(numCourses):
        for i in range(numCourses):
            for j in range(numCourses):
                if requisites[i][k] and requisites[k][j]:
                    requisites[i][j] = True

    return [requisites[i][j] for [i, j] in queries]


def test_simple():
    assert solution(2, [[1, 0]], [[0, 1], [1, 0]]) == [False, True]
