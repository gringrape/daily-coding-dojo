def reverse(string):
  characters = [c for c in string]
  characters.reverse()
  return ''.join(characters)

def test_reverse():
  assert reverse('hi') == 'ih'
  assert reverse('hello') == 'olleh'
  assert reverse('nicetomeet') == 'teemotecin'
