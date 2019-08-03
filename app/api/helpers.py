import random


# generate a registration random code to send by mail
def generate_code(length=8):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for i in range(length))
