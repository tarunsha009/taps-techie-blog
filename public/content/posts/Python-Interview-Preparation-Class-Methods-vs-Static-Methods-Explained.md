---
title: "Python Interview Preparation: Class Methods vs Static Methods Explained"
date: "2025-01-29"
author: "Tarun"
readTime: "4 min"
tags: ["interview", "python", "coding", "oops", "python-tips", "object-oriented-programming", "codinginterview", "python-classmethod", "python-staticmethod", "taps-techie"]
difficulty: "Beginner"
excerpt: "Learn and compare Python's class methods and static methods for interviews, including their purposes, implementations, and common questions"
---
In Python, methods within a class can be categorized into instance methods, class methods, and static methods. Each serves a unique purpose and provides different levels of access to the class and its instances. In this blog, we'll explore class methods and static methods, how to use them, and common interview questions you might encounter.

### Instance Methods

Before diving into class methods and static methods, let's briefly recap instance methods:

* **Instance Methods**: These are the most common methods in a class and are used to access or modify the object's state. They take `self` as the first parameter, which represents the instance of the class.
    

```python
class Car:
    def __init__(self, model, year):
        self.model = model
        self.year = year

    def display_info(self):
        print(f"Car Model: {self.model}, Year: {self.year}")

# Usage
my_car = Car("Toyota", 2020)
my_car.display_info()  # Output: Car Model: Toyota, Year: 2020
```

### Class Methods

Class methods are methods that have access to the class itself, not just instances of the class. They take `cls` as the first parameter, which represents the class. They are defined using the `@classmethod` decorator.

#### Why Use Class Methods?

* To create alternative constructors.
    
* To access or modify class-level attributes.
    

#### Example: Alternative Constructor

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, birth_year):
        current_year = 2024
        age = current_year - birth_year
        return cls(name, age)

# Usage
person1 = Person("Alice", 30)  # Using the primary constructor
person2 = Person.from_birth_year("Bob", 1990)  # Using the alternative constructor

print(person1.name, person1.age)  # Output: Alice 30
print(person2.name, person2.age)  # Output: Bob 34
```

In this example, `from_birth_year` is an alternative constructor that calculates the age from the birth year and creates a `Person` instance.

#### Example: Modifying Class Attributes

```python
class Employee:
    company_name = "TechCorp"

    def __init__(self, name):
        self.name = name

    @classmethod
    def change_company(cls, new_name):
        cls.company_name = new_name

# Usage
Employee.change_company("NewTechCorp")
print(Employee.company_name)  # Output: NewTechCorp
```

In this example, `change_company` is a class method that changes the class attribute `company_name`.

### Static Methods

Static methods do not access or modify class or instance-specific data. They are utility methods that belong to the class and are defined using the `@staticmethod` decorator.

#### Why Use Static Methods?

* To define utility functions that operate independently of class and instance data.
    
* To keep code organized within the class namespace.
    

#### Example: Utility Function

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

# Usage
print(MathUtils.add(5, 7))  # Output: 12
```

In this example, `add` is a static method that performs addition independently of any class or instance data.

### Comparison of Methods

* **Instance Methods**: Operate on an instance of the class (`self`).
    
* **Class Methods**: Operate on the class itself (`cls`).
    
* **Static Methods**: Do not operate on class or instance-specific data.
    

### Interview Questions on Class Methods and Static Methods

#### Question 1: Explain the difference between class methods and static methods.

* **Class Methods**: Operate on the class itself, using `cls` as the first parameter. They can modify class-level data.
    
* **Static Methods**: Are independent of class and instance-specific data. They do not take `cls` or `self` as the first parameter.
    

#### Question 2: Implement a class `Book` with class methods and static methods.

```python
class Book:
    def __init__(self, title, author, publication_year):
        self.title = title
        self.author = author
        self.publication_year = publication_year

    @classmethod
    def from_string(cls, book_str):
        title, author, publication_year = book_str.split(', ')
        return cls(title, author, int(publication_year))

    @staticmethod
    def is_valid_year(year):
        return year > 0

# Usage
book1 = Book("Python Basics", "John Doe", 2020)
book2 = Book.from_string("Advanced Python, Jane Smith, 2018")

print(book1.title, book1.author, book1.publication_year)  # Output: Python Basics John Doe 2020
print(book2.title, book2.author, book2.publication_year)  # Output: Advanced Python Jane Smith 2018
print(Book.is_valid_year(2024))  # Output: True
```

In this example, `from_string` is an alternative constructor (class method) that creates a `Book` object from a string, and `is_valid_year` is a static method that checks if a year is valid.

#### Question 3: Why would you use a class method as an alternative constructor?

Class methods as alternative constructors provide flexibility in creating instances from different kinds of input or scenarios, making code more readable and maintaining a single place for object creation logic.

### Summary

* **Instance Methods**: Operate on class instances and can modify instance-specific data.
    
* **Class Methods**: Operate on the class itself, using `cls` as the first parameter, and can modify class-level data.
    
* **Static Methods**: Do not operate on class or instance-specific data and are used for utility functions.
    

By understanding and utilizing these methods effectively, you can write more organized and flexible object-oriented code in Python.

---