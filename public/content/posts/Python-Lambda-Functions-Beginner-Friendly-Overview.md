---
title: "Python Lambda Functions: Beginner-Friendly Overview"
date: "2025-01-04"
author: "Tarun"
readTime: "1 min"
tags: ["python", "python-tutorials", "coding-tips", "programming-basics", "map-filter-reduce", "lambda-functions"]
difficulty: "Beginner"
excerpt: "Beginner-friendly guide to Python lambda functions: syntax, examples, use cases, and common tricks with map(), filter(), and reduce()"
---
### Explanation:

A lambda function in Python is a small anonymous function defined using the lambda keyword. It can take any number of arguments but can only have one expression. The expression is evaluated and returned.

### Syntax:

```python
lambda arguments: expression
```

### Example:

```python
# A lambda function that adds 10 to the input
add_ten = lambda x: x + 10
print(add_ten(5))  # Output: 15
```

### Use Cases:

* Short functions that are used once or a few times.
    
* Used with higher-order functions like map(), filter(), and reduce().
    

### Common Tricks:

* Simplifying small functions:
    

```python
def add(a, b):
    return a + b

 # Can be simplified as:
add = lambda a, b: a + b
```

* Using with map():
    

```python
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
# squares will be [1, 4, 9, 16, 25]
```

* Using with filter():
    

```python
numbers = [1, 2, 3, 4, 5]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
# even_numbers will be [2, 4]
```

* Using with reduce() from functools:
    

```python
from functools import reduce
numbers = [1, 2, 3, 4, 5]
product = reduce(lambda x, y: x * y, numbers)
# product will be 120
```