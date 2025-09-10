---
title: "Part 2 - Understanding Inheritance in Python: A Comprehensive Guide"
date: "2025-07-02"
author: "Tarun"
readTime: "10 min"
tags: ["interview", "python", "coding", "oops", "inheritance", "object-oriented-programming", "interview-questions"]
difficulty: "Beginner"
excerpt: "Prepare for interviews with advanced coding questions on inheritance in Python. Includes practical exercises and sample solutions"
---
In [**Part 1**](https://tapstechie.hashnode.dev/part-1-understanding-inheritance-in-python-a-comprehensive-guide) of our series on [inheritance in Python](https://tapstechie.hashnode.dev/part-1-understanding-inheritance-in-python-a-comprehensive-guide), we explored the foundational concepts and detailed workings of inheritance. If you haven't read it yet, make sure to check it out to get up to speed on the basics!

In **Part 2**, we shift our focus to **common interview questions** related to inheritance. We’ll tackle a range of coding challenges and provide sample solutions to help you prepare for technical interviews. From practical exercises to complex scenarios, this section will test your understanding and application of inheritance in real-world coding problems.

## Coding Interview Questions on Inheritance

1. **Question**: Given the following class hierarchy, predict the output of the `display` method call.
    
    ```python
    class A:
        def display(self):
            return "Class A"
    
    class B(A):
        def display(self):
            return "Class B"
    
    class C(B):
        def display(self):
            return "Class C"
    
    c = C()
    print(c.display())
    ```
    
    **Solution**: **Output**: `Class C`
    
2. **Question**: Write a class `Person` with a `name` attribute and a method `greet`. Derive a class `Student` that adds a `student_id` attribute and overrides the `greet` method.
    
    **Solution**:
    
    ```python
    class Person:
        def __init__(self, name):
            self.name = name
    
        def greet(self):
            return f"Hello, my name is {self.name}"
    
    class Student(Person):
        def __init__(self, name, student_id):
            super().__init__(name)
            self.student_id = student_id
    
        def greet(self):
            return f"Hello, my name is {self.name} and my student ID is {self.student_id}"
    
    # Test
    student = Student("John", "S001")
    print(student.greet())  # Output: Hello, my name is John and my student ID is S001
    ```
    
3. **Question**: Create a class `Animal` with a method `make_sound`. Derive `Dog` and `Cat` classes that override `make_sound` to produce specific animal sounds.
    
    **Solution**:
    
    ```python
    class Animal:
        def make_sound(self):
            return "Some sound"
    
    class Dog(Animal):
        def make_sound(self):
            return "Woof"
    
    class Cat(Animal):
        def make_sound(self):
            return "Meow"
    
    # Test
    dog = Dog()
    cat = Cat()
    print(dog.make_sound())  # Output: Woof
    print(cat.make_sound())  # Output: Meow
    ```
    
4. **Question**: Implement a base class `BankAccount` with methods for depositing and withdrawing funds. Derive a class `SavingsAccount` that adds interest calculations.
    
    **Solution**:
    
    ```python
    class BankAccount:
        def __init__(self, balance):
            self.balance = balance
    
        def deposit(self, amount):
            self.balance += amount
    
        def withdraw(self, amount):
            if amount <= self.balance:
                self.balance -= amount
            else:
                return "Insufficient funds"
    
    class SavingsAccount(BankAccount):
        def __init__(self, balance, interest_rate):
            super().__init__(balance)
            self.interest_rate = interest_rate
    
        def add_interest(self):
            self.balance += self.balance * self.interest_rate
    
    # Test
    savings = SavingsAccount(1000, 0.05)
    savings.add_interest()
    print(savings.balance)  # Output: 1050.0
    ```
    
5. **Question**: Write a class `Employee` with methods `get_salary` and `get_job_title`. Derive `Manager` and `Developer` classes, each with additional methods or attributes.
    
    **Solution**:
    
    ```python
    class Employee:
        def __init__(self, job_title):
            self.job_title = job_title
    
        def get_salary(self):
            return "Salary details"
    
        def get_job_title(self):
            return self.job_title
    
    class Manager(Employee):
        def __init__(self, job_title, team_size):
            super().__init__(job_title)
            self.team_size = team_size
    
        def get_team_size(self):
            return self.team_size
    
    class Developer(Employee):
        def __init__(self, job_title, programming_languages):
            super().__init__(job_title)
            self.programming_languages = programming_languages
    
        def get_programming_languages(self):
            return self.programming_languages
    
    # Test
    manager = Manager("Team Lead", 10)
    developer = Developer("Software Engineer", ["Python", "Java"])
    print(manager.get_team_size())             # Output: 10
    print(developer.get_programming_languages())  # Output: ['Python', 'Java']
    ```
    
6. **Question**: Implement a base class `Shape` with a method `calculate_area`. Derive `Circle` and `Rectangle` classes and override `calculate_area` for each shape.
    
    **Solution**:
    
    ```python
    import math
    
    class Shape:
        def calculate_area(self):
            pass
    
    class Circle(Shape):
        def __init__(self, radius):
            self.radius = radius
    
        def calculate_area(self):
            return math.pi * (self.radius ** 2)
    
    class Rectangle(Shape):
        def __init__(self, width, height):
            self.width = width
            self.height = height
    
        def calculate_area(self):
            return self.width * self.height
    
    # Test
    circle = Circle(3)
    rectangle = Rectangle(4, 5)
    print(circle.calculate_area())    # Output: 28.274333882308138
    print(rectangle.calculate_area()) # Output: 20
    ```
    
7. **Question**: Write a class `Book` with attributes `title` and `author`. Derive a class `EBook` that adds an attribute for file size and overrides the `display` method.
    
    **Solution**:
    
    ```python
    class Book:
        def __init__(self, title, author):
            self.title = title
            self.author = author
    
        def display(self):
    
    
            return f"Title: {self.title}, Author: {self.author}"
    
    class EBook(Book):
        def __init__(self, title, author, file_size):
            super().__init__(title, author)
            self.file_size = file_size
    
        def display(self):
            return f"Title: {self.title}, Author: {self.author}, File Size: {self.file_size}MB"
    
    # Test
    ebook = EBook("Python Programming", "John Doe", 1.5)
    print(ebook.display())  # Output: Title: Python Programming, Author: John Doe, File Size: 1.5MB
    ```
    
8. **Question**: Implement a class `Vehicle` with a method `move`. Derive `Car` and `Bike` classes that override `move` to provide specific vehicle movement behaviors.
    
    **Solution**:
    
    ```python
    class Vehicle:
        def move(self):
            return "Vehicle is moving"
    
    class Car(Vehicle):
        def move(self):
            return "Car is driving"
    
    class Bike(Vehicle):
        def move(self):
            return "Bike is pedaling"
    
    # Test
    car = Car()
    bike = Bike()
    print(car.move())  # Output: Car is driving
    print(bike.move())  # Output: Bike is pedaling
    ```
    
9. **Question**: Write a class `Person` with attributes `name` and `age`. Derive a class `Employee` with additional attributes `employee_id` and `position`.
    
    **Solution**:
    
    ```python
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age
    
    class Employee(Person):
        def __init__(self, name, age, employee_id, position):
            super().__init__(name, age)
            self.employee_id = employee_id
            self.position = position
    
    # Test
    employee = Employee("Alice", 30, "E123", "Manager")
    print(employee.name, employee.age, employee.employee_id, employee.position)
    # Output: Alice 30 E123 Manager
    ```
    
10. **Question**: Create a class `Bird` with a method `fly`. Derive `Sparrow` and `Eagle` classes that override the `fly` method to provide specific flight behaviors.
    
    **Solution**:
    
    ```python
    class Bird:
        def fly(self):
            return "Bird is flying"
    
    class Sparrow(Bird):
        def fly(self):
            return "Sparrow is flying swiftly"
    
    class Eagle(Bird):
        def fly(self):
            return "Eagle is soaring high"
    
    # Test
    sparrow = Sparrow()
    eagle = Eagle()
    print(sparrow.fly())  # Output: Sparrow is flying swiftly
    print(eagle.fly())   # Output: Eagle is soaring high
    ```
    
11. **Question**: Implement a class `Person` with a method `get_details`. Derive `Student` and `Teacher` classes that override `get_details` to provide specific details.
    
    **Solution**:
    
    ```python
    class Person:
        def get_details(self):
            return "Person details"
    
    class Student(Person):
        def get_details(self):
            return "Student details"
    
    class Teacher(Person):
        def get_details(self):
            return "Teacher details"
    
    # Test
    student = Student()
    teacher = Teacher()
    print(student.get_details())  # Output: Student details
    print(teacher.get_details())  # Output: Teacher details
    ```
    
12. **Question**: Write a class `Shape` with a method `calculate_area`. Derive `Square` and `Triangle` classes that override `calculate_area` for their specific shapes.
    
    **Solution**:
    
    ```python
    class Shape:
        def calculate_area(self):
            pass
    
    class Square(Shape):
        def __init__(self, side):
            self.side = side
    
        def calculate_area(self):
            return self.side ** 2
    
    class Triangle(Shape):
        def __init__(self, base, height):
            self.base = base
            self.height = height
    
        def calculate_area(self):
            return 0.5 * self.base * self.height
    
    # Test
    square = Square(4)
    triangle = Triangle(3, 5)
    print(square.calculate_area())   # Output: 16
    print(triangle.calculate_area()) # Output: 7.5
    ```
    
13. **Question**: Implement a class `Employee` with attributes `name` and `salary`. Derive a class `Manager` that adds an attribute `department`.
    
    **Solution**:
    
    ```python
    class Employee:
        def __init__(self, name, salary):
            self.name = name
            self.salary = salary
    
    class Manager(Employee):
        def __init__(self, name, salary, department):
            super().__init__(name, salary)
            self.department = department
    
    # Test
    manager = Manager("Bob", 80000, "HR")
    print(manager.name, manager.salary, manager.department)
    # Output: Bob 80000 HR
    ```
    
14. **Question**: Create a base class `Calculator` with methods `add` and `subtract`. Derive a class `ScientificCalculator` that adds more methods for advanced calculations.
    
    **Solution**:
    
    ```python
    class Calculator:
        def add(self, a, b):
            return a + b
    
        def subtract(self, a, b):
            return a - b
    
    class ScientificCalculator(Calculator):
        def multiply(self, a, b):
            return a * b
    
        def divide(self, a, b):
            return a / b
    
    # Test
    calc = ScientificCalculator()
    print(calc.add(5, 3))       # Output: 8
    print(calc.multiply(5, 3))  # Output: 15
    ```
    
15. **Question**: Write a class `Author` with attributes `name` and `books_written`. Derive a class `Publisher` that adds an attribute for `published_books`.
    
    **Solution**:
    
    ```python
    class Author:
        def __init__(self, name, books_written):
            self.name = name
            self.books_written = books_written
    
    class Publisher(Author):
        def __init__(self, name, books_written, published_books):
            super().__init__(name, books_written)
            self.published_books = published_books
    
    # Test
    publisher = Publisher("J.K. Rowling", 7, 12)
    print(publisher.name, publisher.books_written, publisher.published_books)
    # Output: J.K. Rowling 7 12
    ```
    
16. **Question**: Create a base class `Device` with a method `turn_on`. Derive `Phone` and `Laptop` classes that override `turn_on` to provide device-specific behaviors.
    
    **Solution**:
    
    ```python
    class Device:
        def turn_on(self):
            return "Device is turned on"
    
    class Phone(Device):
        def turn_on(self):
            return "Phone is booting up"
    
    class Laptop(Device):
        def turn_on(self):
            return "Laptop is starting"
    
    # Test
    phone = Phone()
    laptop = Laptop()
    print(phone.turn_on())  # Output: Phone is booting up
    print(laptop.turn_on()) # Output: Laptop is starting
    ```
    
17. **Question**: Write a class `Person` with a method `display_info`. Derive `Student` and `Teacher` classes and add additional methods or attributes.
    
    **Solution**:
    
    ```python
    class Person:
        def display_info(self):
            return "Person information"
    
    class Student(Person):
        def __init__(self, student_id):
            self.student_id = student_id
    
        def display_info(self):
            return f"Student ID: {self.student_id}"
    
    class Teacher(Person):
        def __init__(self, employee_id):
            self.employee_id = employee_id
    
        def display_info(self):
            return f"Teacher ID: {self.employee_id}"
    
    # Test
    student = Student("S123")
    teacher = Teacher("T456")
    print(student.display_info())  # Output: Student ID: S123
    print(teacher.display_info())  # Output: Teacher ID: T456
    ```
    
18. **Question**: Implement a class `Product` with attributes `name` and `price`. Derive `Electronics` and `Furniture` classes and add specific attributes or methods.
    
    **Solution**:
    
    ```python
    class Product:
        def __init__(self, name, price):
            self.name = name
            self.price = price
    
    class Electronics(Product):
        def __init__(self, name, price, warranty):
            super().__init__(name, price)
            self.warranty = warranty
    
    class Furniture(Product):
        def __init__(self, name, price, material):
            super().__init__(name, price)
            self.material = material
    
    # Test
    tv = Electronics("TV", 500, "2 years")
    chair = Furniture("Chair", 100, "Wood")
    print(tv.name, tv.price, tv.warranty)   # Output: TV 500 2 years
    print(chair.name, chair.price, chair.material)  # Output: Chair 100 Wood
    ```
    
19. **Question**: Create a class `Shape` with methods for calculating area and perimeter. Derive `Rectangle` and `Circle` classes that override these methods.
    
    **Solution**:
    

python import math

class Shape: def calculate\_area(self): pass

def calculate\_perimeter(self): pass

class Rectangle(Shape): def **init**(self, width, height): self.width = width self.height = height

def calculate\_area(self): return self.width \* self.height

def calculate\_perimeter(self): return 2 \* (self.width + self.height)

class Circle(Shape): def **init**(self, radius): self.radius = radius

def calculate\_area(self): return math.pi *(self.radius* \* 2)

def calculate\_perimeter(self): return 2 *math.pi* self.radius

\# Test rect = Rectangle(4, 6) circ = Circle(5) print(rect.calculate\_area(), rect.calculate\_perimeter()) # Output: 24 20 print(circ.calculate\_area(), circ.calculate\_perimeter()) # Output: 78.53981633974483 31.41592653589794 \`\`\`

20. **Question**: Implement a class `Book` with attributes `title` and `author`. Derive `EBook` class with an additional attribute `file_size`.
    
    **Solution**:
    
    ```python
    class Book:
        def __init__(self, title, author):
            self.title = title
            self.author = author
    
        def display(self):
            return f"Title: {self.title}, Author: {self.author}"
    
    class EBook(Book):
        def __init__(self, title, author, file_size):
            super().__init__(title, author)
            self.file_size = file_size
    
        def display(self):
            return f"Title: {self.title}, Author: {self.author}, File Size: {self.file_size}MB"
    
    # Test
    ebook = EBook("Python Programming", "John Doe", 1.5)
    print(ebook.display())  # Output: Title: Python Programming, Author: John Doe, File Size: 1.5MB
    ```