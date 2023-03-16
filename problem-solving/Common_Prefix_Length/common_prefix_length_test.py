import unittest

from common_prefix_length import commonPrefix


class CommonPrefixTest(unittest.TestCase):
    def test_common_prefix(self):
        result = commonPrefix(["abcabcd"])
        self.assertEqual(result, [7, 0, 0, 3, 0, 0, 0])
