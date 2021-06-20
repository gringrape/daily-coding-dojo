def test_is_working():
  assert 1 + 1 == 2

def time_to_sec(time):
  hour, minute, sec = (int(x) for x in time.split(':'))
  return hour * 3600 + minute * 60 + sec

def test_time_to_sec():
  assert time_to_sec("01:00:00") == 3600
  assert time_to_sec("01:20:00") == 4800
  assert time_to_sec("01:20:12") == 4812

def sec_to_time(sec):
  hour = int(sec / 3600)
  minute = int((sec - hour * 3600) / 60)
  second = sec - hour * 3600 - minute * 60

  return ":".join(str(x).rjust(2, '0') for x in (hour, minute, second))

def test_set_to_time():
  assert sec_to_time(3600) == "01:00:00"
  assert sec_to_time(4800) == "01:20:00"
  assert sec_to_time(4812) == "01:20:12"

def find_logs(start, end, logs):
  is_between = lambda x: x >= start and x <= end
  return [log for log in logs 
    if (is_between(log[0]) or is_between(log[1]))
      or (log[0] <= start and log[1] >= end)
  ]

def test_find_logs():
  assert find_logs(0, 5, [
    (1, 3), (2, 6), (3, 7), (7, 9)
  ]) == [(1, 3), (2, 6), (3, 7)]

  assert find_logs(3, 5, [
    (1, 3), (2, 6), (3, 7), (7, 9)
  ]) == [(1, 3), (2, 6), (3, 7)]

def calculate_overlap(start, end, near_logs):
  return sum(
    min(log_end, end) - max(log_start, start) for log_start, log_end in near_logs
  )

def test_calculate_overlap():
  assert calculate_overlap(1, 4, [
    (1, 4),
    (2, 3),
    (2, 5),
  ]) == 3 + 1 + 2

def solution(play_time, adv_time, logs):
  play_time_sec, adv_time_sec = (time_to_sec(x) for x in [play_time, adv_time])
  sec_logs = [
    tuple(time_to_sec(x) for x in log.split("-")) 
    for log in logs
  ]

  def accumulated_time(adv_start, adv_end):    
    if adv_start < 0 or adv_end > play_time_sec:
      return (0, 0)

    near_logs = find_logs(adv_start, adv_end, sec_logs)

    overlap_times = [
      min(e, adv_end) - max(s, adv_start) for s, e in near_logs
    ]

    return (adv_start, sum(overlap_times))

  candidates = []
  candidates.append(accumulated_time(0, adv_time_sec))
  candidates.append(accumulated_time(play_time_sec - adv_time_sec, play_time_sec))
  for log in sec_logs:
    candidates.append(accumulated_time(log[0], log[0] + adv_time_sec))
    candidates.append(accumulated_time(log[1] - adv_time_sec ,log[1]))

  picked_start = sorted(
    sorted(candidates, key=lambda x: x[0]),
    key=lambda x: x[1], reverse=True
  )[0][0]

  return sec_to_time(picked_start)

def test_samples():
  assert solution(
    "02:03:55",
    "00:14:15",
    ["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]
  ) == "01:30:59"
  assert solution(
    "50:00:00",
    "50:00:00",
    ["15:36:51-38:21:49", "10:14:18-15:36:51", "38:21:49-42:51:45"]
  ) == "00:00:00"