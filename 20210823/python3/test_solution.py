import re


def parse(file):
    return re.match(
        r"(?P<head>[^\d]+)(?P<number>\d{1,5})(?P<tail>.*)", file
    ).groupdict()


def test_parse():
    assert parse("img12.png") == {
        "head": "img",
        "number": "12",
        "tail": ".png",
    }


def solution(files):
    return sorted(
        files,
        key=lambda x: ((parsed := parse(x))["head"].upper(), int(parsed["number"])),
    )


def test_solution():
    assert solution(
        ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"]
    ) == ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]
