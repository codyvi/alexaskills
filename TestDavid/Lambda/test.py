import random

compliments = [line for line in open('compliments.txt')]
compliment = compliments[random.randint(0, len(compliments)-1)]
speak_output = compliment
print(speak_output)