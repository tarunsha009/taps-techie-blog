---
title: "Interfaces and Abstract Base Classes in Python: A Complete Overview"
date: "2025-06-08"
author: "Tarun"
readTime: "6 min"
tags: ["python", "python3", "inheritance", "abstraction", "interface", "abstract-class-vs-interface", "abc", "abstract-class", "abstraction-in-oop"]
difficulty: "Beginner"
excerpt: "Learn about Python's abstract base classes and interfaces, including their importance, usage, and examples for all skill levels"
---
In Python, abstract base classes (ABCs) and interfaces play a crucial role in designing robust and maintainable software. They help enforce consistency, promote code reuse, and ensure that your objects behave as expected. Whether you're a beginner or an experienced developer, understanding these concepts is key to writing better Python code. In this blog, we’ll explore ABCs and interfaces in depth, complete with examples and interview questions to solidify your knowledge.

#### **What Are Abstract Base Classes (ABCs)?**

Abstract Base Classes (ABCs) in Python are a way to define common interfaces for a group of related classes. An ABC can define methods that must be implemented by any subclass, thus enforcing a contract. If a subclass doesn’t implement these methods, Python will raise an error, preventing you from instantiating that class.

### **1\. Basic ABCs and Abstract Methods**

Let’s start with the basics. An abstract method is a method that is declared in an ABC but contains no implementation. Subclasses that inherit from the ABC must implement these methods.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass
```

In this example, `Shape` is an abstract base class with two abstract methods: `area()` and `perimeter()`. Any subclass of `Shape` must implement these methods.

### **Example: Implementing Subclasses**

```python
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# Usage
rect = Rectangle(5, 10)
print(f"Area: {rect.area()}")          # Output: Area: 50
print(f"Perimeter: {rect.perimeter()}") # Output: Perimeter: 30
```

### **2\. Abstract Classes Without Abstract Methods**

You can create an abstract class that doesn’t have any abstract methods. This might seem unusual, but it can be useful when you want to prevent a class from being instantiated directly while still allowing it to provide concrete methods or properties that subclasses can use.

```python
from abc import ABC

class CannotInstantiate(ABC):
    def concrete_method(self):
        print("This is a concrete method.")

# Subclass that can be instantiated
class ConcreteSubclass(CannotInstantiate):
    pass

# Usage
# instance = CannotInstantiate()  # Raises TypeError
instance = ConcreteSubclass()
instance.concrete_method()  # Output: This is a concrete method.
```

### **3\. Abstract Properties**

Python allows you to define abstract properties using the `@property` decorator in conjunction with the `@abstractmethod` decorator. Subclasses must implement these properties.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @property
    @abstractmethod
    def name(self):
        pass

class Rectangle(Shape):
    @property
    def name(self):
        return "Rectangle"

# Usage
rect = Rectangle()
print(rect.name)  # Output: Rectangle
```

If a subclass does not implement the `name` property, Python will raise a `TypeError` when you try to instantiate the subclass.

### **4\. Abstract Static Methods and Class Methods**

You can also define abstract static methods and class methods in an abstract base class. Subclasses must implement these methods appropriately.

#### **Abstract Static Method:**

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @staticmethod
    @abstractmethod
    def description():
        pass

class Rectangle(Shape):
    @staticmethod
    def description():
        return "I am a rectangle"

# Usage
print(Rectangle.description())  # Output: I am a rectangle
```

#### **Abstract Class Method:**

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @classmethod
    @abstractmethod
    def create(cls):
        pass

class Circle(Shape):
    @classmethod
    def create(cls):
        return cls()

# Usage
circle = Circle.create()
print(isinstance(circle, Circle))  # Output: True
```

### **5\. Multiple Inheritance with ABCs**

Python supports multiple inheritance, which means a class can inherit from more than one parent class. When combining abstract base classes in multiple inheritance, the resulting subclass must implement all abstract methods from all parent classes.

#### **Example:**

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

class Circle(Shape, Drawable):
    def area(self):
        return 3.14159 * self.radius * self.radius
    
    def draw(self):
        print("Drawing a circle")

    def __init__(self, radius):
        self.radius = radius

# Usage
circle = Circle(5)
print(circle.area())  # Prints area of the circle
circle.draw()         # Drawing a circle
```

### **6\. Mixing Concrete and Abstract Methods**

ABCs in Python allow you to define both abstract methods and concrete methods. This enables you to provide default behavior while still requiring certain methods to be overridden.

#### **Example:**

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start_engine(self):
        pass
    
    def fuel_up(self):
        print("Filling up the tank!")

class Car(Vehicle):
    def start_engine(self):
        print("Engine started with a key")

# Usage
car = Car()
car.fuel_up()          # Output: Filling up the tank!
car.start_engine()     # Output: Engine started with a key
```

### **7\. Duck Typing in Python (Interfaces Without Inheritance)**

Python’s dynamic nature allows you to implement interfaces through duck typing. Duck typing means that the suitability of an object is determined by the presence of certain methods and properties, rather than the object’s type.

#### **Example:**

```python
class Duck:
    def quack(self):
        print("Quack!")

class Dog:
    def quack(self):
        print("Bark... I mean, quack!")

def make_it_quack(duck):
    duck.quack()

# Usage
duck = Duck()
dog = Dog()

make_it_quack(duck)  # Output: Quack!
make_it_quack(dog)   # Output: Bark... I mean, quack!
```

### **Interview Questions and Coding Exercises**

1. **What happens if you don’t implement all abstract methods in a subclass?**
    
    * *Expected Answer:* The subclass will be considered abstract itself, and Python will raise a `TypeError` if you try to instantiate it.
        
2. **Can you instantiate an abstract class in Python?**
    
    * *Expected Answer:* No, you cannot instantiate an abstract class in Python. Attempting to do so will raise a `TypeError`.
        
3. **What’s the difference between an abstract method and a regular method in an abstract base class?**
    
    * *Expected Answer:* An abstract method must be implemented by any subclass, while a regular method in an abstract base class has an implementation and can be optionally overridden by subclasses.
        
4. **How does Python handle multiple inheritance with abstract base classes?**
    
    * *Expected Answer:* Python requires that a subclass implementing multiple abstract base classes must implement all abstract methods from all parent classes to be instantiated.
        
5. **What is duck typing in Python, and how does it relate to interfaces?**
    
    * *Expected Answer:* Duck typing in Python is a concept where an object's suitability is determined by the presence of certain methods and properties, rather than its inheritance. This allows for a more flexible and dynamic implementation of interfaces.
        
6. **Coding Exercise:**
    
    * **Problem:** Implement a `Shape` abstract base class with an abstract method `area`. Create two subclasses, `Square` and `Triangle`, that implement the `area` method. Write a function that takes a list of `Shape` objects and prints their areas.
        
    * *Solution:*
        
    
    ```python
    from abc import ABC, abstractmethod
    
    class Shape(ABC):
        @abstractmethod
        def area(self):
            pass
    
    class Square(Shape):
        def __init__(self, side):
            self.side = side
    
        def area(self):
            return self.side * self.side
    
    class Triangle(Shape):
        def __init__(self, base, height):
            self.base = base
            self.height = height
    
        def area(self):
            return 0.5 * self.base * self.height
    
    def print_areas(shapes):
        for shape in shapes:
            print(f"Area: {shape.area()}")
    
    # Usage
    shapes = [Square(4), Triangle(3, 6)]
    print_areas(shapes)
    ```
    

### **Conclusion**

Abstract base classes and interfaces in Python provide a powerful way to enforce consistent APIs, promote code reuse, and ensure that your objects conform to specific behaviors. By understanding and using these advanced features like abstract properties, abstract static methods, and duck typing, you can create more robust and flexible software designs.