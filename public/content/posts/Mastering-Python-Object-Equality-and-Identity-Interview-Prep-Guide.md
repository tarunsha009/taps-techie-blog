---
title: "Mastering Python Object Equality and Identity: Interview Prep Guide"
date: "2024-12-03"
author: "Tarun"
readTime: "6 min"
tags: ["python"]
difficulty: "Beginner"
excerpt: "Master Python object equality and identity, crucial for interviews. Learn to override `__eq__` and `__hash__` methods for custom objects"
---
**Introduction:** In Python, knowing how to compare objects is crucial. This post will cover two main ideas: object equality and identity. We’ll explain what these terms mean, how they differ, and provide examples to help you understand how to use them. If you’re preparing for an interview, these are common topics you might be asked about, so this guide will help you get ready.

### Object Equality and Identity

In Python, we frequently use two concepts to compare objects: equality (`==`) and identity (`is`).

* **Equality (**`==`): Checks if the values of two objects are the same.
    
    ```python
    a = [1, 2, 3]
    b = [1, 2, 3]
    print(a == b)  # True
    ```
    
* **Identity (**`is`): Checks if two references point to the same object in memory.
    
    ```python
    a = [1, 2, 3]
    b = a
    print(a is b)  # True
    ```
    

Now, sometimes in your coding interview, the interviewer may ask how to compare if two objects of a custom class are equal in terms of their values. For example:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p1 = Person("Alice", 30)
p2 = Person("Alice", 30)

print(p1 == p2) # False
```

As these are custom objects, `==` won't check the values inside them. To check the equality of custom objects, we need to override the `__eq__` method.

For custom objects, we can define our own equality logic by overriding the `__eq__` method:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        if isinstance(other, Person):
            return self.name == other.name and self.age == other.age
        return False

p1 = Person("Alice", 30)
p2 = Person("Alice", 30)
p3 = Person("Bob", 25)

print(p1 == p2)  # True
print(p1 == p3)  # False
```

In this example, two `Person` objects are considered equal if their `name` and `age` attributes are equal.

#### Potential Interview Questions

1. **What is the difference between** `==` and `is` in Python?
    
    * `==` checks for value equality, meaning it compares the values of two objects to see if they are the same.
        
    * `is` checks for identity, meaning it compares the memory addresses of two objects to see if they are the same object.
        
2. **How would you implement a custom equality method for a class?**
    
    * By overriding the `__eq__` method, we can define our own logic for comparing the values of custom objects.
        
3. **Why should you override** `__hash__` when you override `__eq__`?
    
    * In Python, objects that compare equal must have the same hash value if they are to be used as dictionary keys or stored in sets. Therefore, when you override `__eq__`, you should also override `__hash__` to maintain consistency.
        
4. **How do you ensure that the** `__eq__` method only compares objects of the same class?
    
    * Use the `isinstance` function to check if the other object is an instance of the same class before comparing attributes.
        

#### Additional Examples and Tips

1. **Comparing Nested Objects**:
    
    * If a class has attributes that are instances of other classes, you need to ensure that their equality methods are also defined.
        
    
    ```python
    class Address:
        def __init__(self, city, state):
            self.city = city
            self.state = state
    
        def __eq__(self, other):
            if isinstance(other, Address):
                return self.city == other.city and self.state == other.state
            return False
    
    class Person:
        def __init__(self, name, age, address):
            self.name = name
            self.age = age
            self.address = address
    
        def __eq__(self, other):
            if isinstance(other, Person):
                return self.name == other.name and self.age == other.age and self.address == other.address
            return False
    
    address1 = Address("New York", "NY")
    address2 = Address("New York", "NY")
    p1 = Person("Alice", 30, address1)
    p2 = Person("Alice", 30, address2)
    
    print(p1 == p2)  # True
    ```
    
2. **Implementing** `__hash__`:
    
    * Ensure objects that compare equal also have the same hash value.
        
    
    ```python
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age
    
        def __eq__(self, other):
            if isinstance(other, Person):
                return self.name == other.name and self.age == other.age
            return False
    
        def __hash__(self):
            return hash((self.name, self.age))
    
    p1 = Person("Alice", 30)
    p2 = Person("Alice", 30)
    people = {p1, p2}
    
    print(len(people))  # 1, because p1 and p2 are considered equal
    ```
    
    You might be wondering why you need to override the **hash** method.
    
    By default, user-defined classes in Python inherit the **eq** and **hash** methods from the base object class. These default methods use the identity of the objects (their memory addresses) for equality and hashing. So, if you don't override these methods, the default behavior is to compare objects based on their memory addresses and to use their memory addresses to compute hash values.
    
3. **Comparing Different Attributes**:
    
    * Customize the comparison to check specific attributes or a combination of attributes based on the requirements.
        
    
    ```python
    class Employee:
        def __init__(self, emp_id, name, company):
            self.emp_id = emp_id
            self.name = name
            self.company = company
    
        def __eq__(self, other):
            if isinstance(other, Employee):
                return (self.emp_id, self.name, self.company) == (other.emp_id, other.name, other.company)
            return False
    
    emp1 = Employee(1, "Alice", "CompanyA")
    emp2 = Employee(1, "Alice", "CompanyA")
    
    print(emp1 == emp2)  # True
    ```
    

## Important Point

Before I end this tutorial, you might be wondering that if I need to compare the object I can do the following as well:

```python
def equalityCheck(p1, p2):
    return p1.name == p2.name and p1.age == p2.age
```

However, there are several reasons why overriding `__eq__` and `__hash__` methods in a class is beneficial:

1\. **Integration with Built-in Data Structures**

When you override `__eq__` and `__hash__`, your objects become compatible with Python's built-in data structures like sets and dictionaries:

* **Sets**: Sets rely on `__hash__` to quickly check if an item already exists. If you don’t override `__hash__`, you can't add your custom objects to a set or will encounter a `TypeError`.
    
* **Dictionaries**: Dictionaries use `__hash__` to index and store keys. Custom objects used as dictionary keys must have consistent hash values and proper equality checks.
    

2\. **Code Simplicity and Readability**

Overriding `__eq__` allows you to use the `==` operator directly for comparisons, which is more readable and idiomatic than calling a custom method. It keeps comparisons intuitive:

```python
if obj1 == obj2:
    print("Objects are equal")
```

vs.

```python
if equalityCheck(obj1, obj2):
    print("Objects are equal")
```

3\. **Consistency and Maintainability**

When you override `__eq__` and `__hash__`, you define equality and hashing rules in a single place within your class. This centralization makes your code easier to maintain and less error-prone, especially when you need to use these objects in various parts of your code.

4\. **Interoperability with Libraries and Frameworks**

Many libraries and frameworks expect classes to implement `__eq__` and `__hash__` for proper operation. For example, many Python libraries use sets or dictionaries internally to manage collections of objects. Implementing these methods ensures your objects interact seamlessly with such libraries.

5\. **Custom Comparison Logic**

By overriding `__eq__`, you can implement custom logic for what it means for two objects to be considered equal, beyond just comparing their attributes. This can be important if you want equality to depend on specific conditions or combinations of attributes.

In summary, overriding `__eq__` and `__hash__` makes your objects more integrated with Python's standard library, more readable, and more maintainable. It aligns with Python's design principles and allows for more idiomatic and flexible code.