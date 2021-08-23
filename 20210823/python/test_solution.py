import re

from collections import Counter

import math


def solution(str1, str2):
    def into_pieces(string):
        pieces = [string[i : i + 2] for i in range(len(string) - 1)]

        return [piece.upper() for piece in pieces if re.fullmatch("[A-Za-z]{2}", piece)]

    pieces1, pieces2 = (into_pieces(s) for s in (str1, str2))
    keys = set(pieces1) | set(pieces2)

    union = sum((max(pieces1.count(key), pieces2.count(key)) for key in keys))
    cross = sum((min(pieces1.count(key), pieces2.count(key)) for key in keys))

    factor = cross / union if union != 0 else 1

    return math.floor(factor * 65536)


def test_sample():
    assert solution("FRANCE", "french") == 16384
    assert solution("handshake", "shake hands") == 65536
    assert solution("aa1+aa2", "AAAA12") == 43690
    assert solution("E=M*C^2", "e=m*c^2") == 65536
