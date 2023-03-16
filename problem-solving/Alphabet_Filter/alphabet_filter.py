import re


class LetterFilter:
    vowels = "aeiou"

    def init(self, s):
        self.s = s

    def filter_vowels(self):
        vowels_dict = dict.fromkeys(self.vowels)
        translate_table = str.maketrans(vowels_dict)
        result = self.s.translate(translate_table)
        return result

    def filter_consonants(self):
        result = re.sub(f"[^{self.vowels}]", "", self.s)
        return result
