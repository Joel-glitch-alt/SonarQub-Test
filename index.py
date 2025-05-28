def greet(name):
    print(f"Hello, {name}!")

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

if __name__ == "__main__":
    greet("world")
    x = add(5, 3)
    y = multiply(2, 4)
    print(f"Sum: {x}")
    print(f"Product: {y}")