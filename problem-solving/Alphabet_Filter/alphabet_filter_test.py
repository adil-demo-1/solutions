import unittest

from alphabet_filter import LetterFilter


class AlphabetFilterTest(unittest.TestCase):
    def test_filter_vowels(self):
        test = LetterFilter()
        test.init("onomatopoeia")
        self.assertEqual(test.filter_vowels(), 'nmtp')

    def test_filter_consonants(self):
        test = LetterFilter()
        test.init("onomatopoeia")
        self.assertEqual(test.filter_consonants(), 'ooaooeia')
