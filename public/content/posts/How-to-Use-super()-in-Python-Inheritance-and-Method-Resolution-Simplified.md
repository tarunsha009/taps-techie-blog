---
title: "How to Use super() in Python: Inheritance and Method Resolution Simplified"
date: "2025-05-13"
author: "Tarun"
readTime: "6 min"
tags: ["python", "python3", "oops", "inheritance", "object-oriented-programming", "python-beginner", "python-tips-and-tricks", "basics-of-python", "Super", "mro", "taps-techie"]
difficulty: "Beginner"
excerpt: "Learn how to effectively use Python's `super()` for inheritance and method resolution, enhancing code reusability and maintainability"
---
### **Introduction**

In Python, the `super()` function is an essential tool when working with object-oriented programming (OOP). It allows you to call methods from a parent class within a child class, which can be particularly useful in complex inheritance hierarchies. This article will guide you through the concept of `super()`, why it’s useful, and how to effectively use it in your code.

### **What is** `super()`?

The `super()` function returns a temporary object of the superclass that allows you to call its methods. In simple terms, `super()` enables you to access methods and properties from a parent class, without needing to know the parent class's name. This is particularly useful when a child class overrides a method from the parent class but still wants to use the functionality provided by the parent class.

### **Why Use** `super()`?

Using `super()` provides several benefits:

* **Code Reusability**: Allows you to reuse the code from parent classes without rewriting it in the child class.
    
* **Maintainability**: Makes your code easier to maintain and extend. If the parent class changes, those changes automatically reflect in child classes that use `super()`.
    
* **Multiple Inheritance**: Helps ensure that methods are called in the correct order (following the Method Resolution Order, or MRO) when dealing with multiple inheritance.
    

### **Basic Usage of** `super()`

Let’s start with a simple example to demonstrate the basic usage of `super()` in a single inheritance scenario.

#### **Example 1: Initializing Parent Class Attributes**

**Without** `super()`

```python
class Parent:
    def __init__(self, name):
        self.name = name
        print(f"Parent initialized with name: {self.name}")

class Child(Parent):
    def __init__(self, name, age):
        Parent.__init__(self, name)  # Directly calling the parent class's __init__ method
        self.age = age
        print(f"Child initialized with name: {self.name} and age: {self.age}")

child = Child("Alice", 10)
```

**Output:**

```python
Parent initialized with name: Alice
Child initialized with name: Alice and age: 10
```

**With** `super()`

```python
class Parent:
    def __init__(self, name):
        self.name = name
        print(f"Parent initialized with name: {self.name}")

class Child(Parent):
    def __init__(self, name, age):
        super().__init__(name)  # Using super() to call the parent class's __init__ method
        self.age = age
        print(f"Child initialized with name: {self.name} and age: {self.age}")

child = Child("Alice", 10)
```

**Output:**

```python
Parent initialized with name: Alice
Child initialized with name: Alice and age: 10
```

**Explanation**: In both examples, the `Parent` class's `__init__` method initializes the `name` attribute. However, using `super()` is more flexible and easier to maintain because it automatically adapts to changes in the class hierarchy.

### **Overriding Methods with** `super()`

When a child class overrides a method from the parent class, `super()` allows the child class to extend or modify the parent class’s behavior rather than replacing it entirely.

#### **Example 2: Overriding Methods**

**Without** `super()`

```python
class Parent:
    def speak(self):
        print("Parent speaking")

class Child(Parent):
    def speak(self):
        print("Child speaking")  # This overrides the Parent's speak method entirely

child = Child()
child.speak()
```

**Output:**

```python
Child speaking
```

**With** `super()`

```python
class Parent:
    def speak(self):
        print("Parent speaking")

class Child(Parent):
    def speak(self):
        super().speak()  # Calls the Parent's speak method
        print("Child speaking")

child = Child()
child.speak()
```

**Output:**

```python
Parent speaking
Child speaking
```

**Explanation**: In the first example, the `Child` class completely overrides the `speak` method, so the `Parent` class’s `speak` method is never called. In the second example, `super().speak()` is used to call the `Parent` class’s `speak` method, allowing the `Child` class to build upon the parent’s behavior rather than replacing it.

### **Using** `super()` in Multiple Inheritance

In Python, a class can inherit from multiple parent classes. `super()` plays a crucial role in multiple inheritance by ensuring that methods are called in the correct order, known as the Method Resolution Order (MRO).

#### **Example 3: Multiple Inheritance**

**Without** `super()`

```python
class A:
    def action(self):
        print("Action in A")

class B(A):
    def action(self):
        print("Action in B")
        A.action(self)  # Manually calling the method from A

class C(A):
    def action(self):
        print("Action in C")
        A.action(self)  # Manually calling the method from A

class D(B, C):
    def action(self):
        print("Action in D")
        B.action(self)  # Manually calling the method from B
        C.action(self)  # Manually calling the method from C

d = D()
d.action()
```

**Output:**

```python
Action in D
Action in B
Action in A
Action in C
Action in A
```

**With** `super()`

```python
class A:
    def action(self):
        print("Action in A")

class B(A):
    def action(self):
        print("Action in B")
        super().action()  # Using super() to call the next class's action method

class C(A):
    def action(self):
        print("Action in C")
        super().action()  # Using super() to call the next class's action method

class D(B, C):
    def action(self):
        print("Action in D")
        super().action()  # Using super() to call the next class's action method

d = D()
d.action()
```

**Output:**

```python
Action in D
Action in B
Action in C
Action in A
```

**Explanation**: Using `super()` in the context of multiple inheritance ensures that each method is called in the correct order and only once, following the MRO. This avoids issues like duplicate method calls that can occur when manually calling parent methods.

### **Best Practices for Using** `super()`

* **Always use** `super()` instead of directly calling parent methods: This makes your code more flexible, maintainable, and easier to extend, especially in complex inheritance structures.
    
* **Understand the MRO**: When using multiple inheritance, it’s crucial to understand the Method Resolution Order to predict how `super()` will resolve method calls. You can inspect the MRO using `ClassName.mro()` or `ClassName.__mro__`.
    
* **Use** `super()` in constructors (`__init__`): This is a common practice to ensure that parent class attributes are properly initialized.
    

### **Conclusion**

The `super()` function is an indispensable tool in Python, especially when working with inheritance. It promotes code reuse, maintainability, and helps manage complex class hierarchies with ease. By using `super()`, you can create flexible and robust code that adapts well to changes and extensions.

Whether you are working with single inheritance or complex multiple inheritance, mastering `super()` will significantly improve the quality and readability of your code.

---