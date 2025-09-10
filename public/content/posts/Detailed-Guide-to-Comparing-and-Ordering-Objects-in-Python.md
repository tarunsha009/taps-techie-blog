---
title: "Detailed Guide to Comparing and Ordering Objects in Python"
date: "2025-05-03"
author: "Tarun"
readTime: "6 min"
tags: ["interview", "python", "sorting", "oops", "coding-best-practices", "custom-comparison"]
difficulty: "Beginner"
excerpt: "Guide to comparing and ordering objects in Python, covering default behaviors, custom methods, practical use cases, and implementation tips"
---
### **What is Ordering?**

**Ordering** refers to the ability to compare objects to determine their relative positions in a sequence. In Python, this involves defining how objects should be compared with each other using operators such as `<`, `<=`, `>`, and `>=`.

#### **Default Behavior:**

1. **Default Comparison:**
    
    * In Python, if you use comparison operators (`<`, `<=`, `>`, `>=`) on objects of a class that doesn’t define its own comparison methods, you’ll get a `TypeError`. This is because Python doesn’t know how to compare these objects by default.
        
    
    **Example:**
    
    ```python
    class Person:
        def __init__(self, name):
            self.name = name
    
    p1 = Person("Alice")
    p2 = Person("Bob")
    
    print(p1 < p2)  # Raises TypeError: '<' not supported between instances of 'Person' and 'Person'
    ```
    
    **Output:**
    
    ```python
    TypeError: '<' not supported between instances of 'Person' and 'Person'
    ```
    
    Here, since `Person` doesn’t define comparison methods, Python doesn’t know how to compare instances of `Person`.
    
2. **Ordering for Built-In Types:**
    
    * For built-in types like integers, strings, and lists, Python has default ordering. For instance, numbers are ordered numerically, and strings are ordered lexicographically (alphabetically).
        
    
    **Example:**
    
    ```python
    numbers = [3, 1, 4, 1, 5, 9]
    sorted_numbers = sorted(numbers)
    print(sorted_numbers)  # [1, 1, 3, 4, 5, 9]
    
    words = ["banana", "apple", "cherry"]
    sorted_words = sorted(words)
    print(sorted_words)  # ['apple', 'banana', 'cherry']
    ```
    
    Here, `sorted()` works because Python knows how to compare integers and strings.
    

### **Practical Use Cases of Default Ordering**

1. **Sorting Lists:**
    
    * Python’s built-in sorting functions (`sorted()` and `list.sort()`) rely on the default ordering of built-in types.
        
    
    **Example:**
    
    ```python
    numbers = [10, 2, 33, 4]
    sorted_numbers = sorted(numbers)
    print(sorted_numbers)  # [2, 4, 10, 33]
    ```
    
2. **Data Structures:**
    
    * Certain data structures like `heapq` and `SortedSet` require elements to be orderable.
        
    
    **Example with**`heapq`:
    
    ```python
    import heapq
    
    nums = [4, 1, 7, 3]
    heapq.heapify(nums)  # Converts list into a heap
    print(heapq.heappop(nums))  # 1 (the smallest element)
    ```
    

### **Custom Comparison Methods**

Python provides several special methods that can be overridden to customize how objects are compared:

* `__eq__(self, other)`: Equality (`==`)
    
* `__ne__(self, other)`: Inequality (`!=`)
    
* `__lt__(self, other)`: Less than (`<`)
    
* `__le__(self, other)`: Less than or equal to (`<=`)
    
* `__gt__(self, other)`: Greater than (`>`)
    
* `__ge__(self, other)`: Greater than or equal to (`>=`)
    

#### **How Ordering Works**

When you implement ordering methods in a class, you define how instances of that class should be compared based on their attributes. This is useful for sorting, organizing, and manipulating collections of objects.

**Key Comparison Methods for Ordering:**

* `__lt__(self, other)`: Less than (`<`)
    
* `__le__(self, other)`: Less than or equal to (`<=`)
    
* `__gt__(self, other)`: Greater than (`>`)
    
* `__ge__(self, other)`: Greater than or equal to (`>=`)
    

Once you define custom comparison methods in your class, you can override the default behavior to suit your needs. This is essential for ordering custom objects and is used when you need to sort or compare instances based on specific attributes.

#### **How to Implement Custom Comparison Methods:**

1. **Define Comparison Methods:**
    
    * Implement methods like `__lt__` (less than), `__le__` (less than or equal to), `__gt__` (greater than), and `__ge__` (greater than or equal to).
        
    
    **Example:**
    
    ```python
    class Rectangle:
        def __init__(self, width, height):
            self.width = width
            self.height = height
    
        def __lt__(self, other):
            if isinstance(other, Rectangle):
                return (self.width * self.height) < (other.width * other.height)
            return NotImplemented
    
    r1 = Rectangle(4, 5)
    r2 = Rectangle(3, 6)
    print(r1 < r2)  # False (20 < 18 is False)
    ```
    
    Here, `__lt__` compares rectangles based on their area.
    
2. **Use in Sorting and Data Structures:**
    
    **Sorting Custom Objects:**
    
    ```python
    rectangles = [Rectangle(4, 5), Rectangle(3, 6), Rectangle(2, 7)]
    sorted_rectangles = sorted(rectangles)
    ```
    
    **Heap Operations:**
    
    ```python
    import heapq
    
    class Task:
        def __init__(self, name, priority):
            self.name = name
            self.priority = priority
    
        def __lt__(self, other):
            return self.priority < other.priority
    
    tasks = [Task("Task1", 3), Task("Task2", 1), Task("Task3", 2)]
    heapq.heapify(tasks)  # Builds a priority queue based on __lt__
    while tasks:
        task = heapq.heappop(tasks)
        print(task.name)
    
    Output:
    Task2
    Task3
    Task1
    ```
    

### Extra Tips

* **Type Checking:** Use `isinstance()` to ensure you're comparing objects of the same type.
    
* **NotImplemented:** Use `NotImplemented` for unsupported type comparisons to allow proper handling by Python’s default mechanisms.
    
* When you override comparison methods in a custom class, Python's built-in functions like `sorted()` and `list.sort()` will use those custom methods to determine the order of the objects.
    
    * **Using**`sorted()` with Custom Objects:
        
        * When you use the `sorted()` function on a list of objects of your class, Python will use the `__lt__` method to compare the objects and determine their order.
            
        
        **Example:**
        
        ```python
        rectangles = [Rectangle(4, 5), Rectangle(3, 6), Rectangle(2, 7)]
        sorted_rectangles = sorted(rectangles)
        ```
        
        * Python calls the `__lt__` method for comparisons between the `Rectangle` objects in the list to sort them by their area.
            
    * **Using**`list.sort()` with Custom Objects:
        
        * Similarly, if you use the `list.sort()` method on a list of custom objects, it will also use the `__lt__` method (or other comparison methods if defined) to sort the list.
            
        
        **Example:**
        
        ```python
        rectangles = [Rectangle(4, 5), Rectangle(3, 6), Rectangle(2, 7)]
        rectangles.sort()
        ```
        
        * This will sort the `rectangles` list in place using the `__lt__` method.
            

**Working Code:**

#### Example: Custom Comparison in a `Rectangle` Class

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __eq__(self, other):
        if isinstance(other, Rectangle):
            return (self.width == other.width) and (self.height == other.height)
        return False

    def __lt__(self, other):
        if isinstance(other, Rectangle):
            return (self.width * self.height) < (other.width * other.height)
        return NotImplemented

    def __le__(self, other):
        if isinstance(other, Rectangle):
            return (self.width * self.height) <= (other.width * other.height)
        return NotImplemented

    def __gt__(self, other):
        if isinstance(other, Rectangle):
            return (self.width * self.height) > (other.width * other.height)
        return NotImplemented

    def __ge__(self, other):
        if isinstance(other, Rectangle):
            return (self.width * self.height) >= (other.width * other.height)
        return NotImplemented

# Testing the Rectangle class
r1 = Rectangle(4, 5)
r2 = Rectangle(3, 6)
r3 = Rectangle(4, 5)

print(r1 == r3)  # True
print(r1 < r2)   # False
print(r1 <= r2)  # False
print(r1 > r2)   # True
print(r1 >= r2)  # True
```

### **Why Implement Custom Comparison Methods?**

* **Ordering Objects**: Custom comparison methods allow you to define ordering for objects, which is useful for sorting, comparisons, and data structure operations.
    
* **Custom Logic**: You can embed custom logic into comparisons, such as comparing based on a derived attribute or custom criteria.
    
* **Compatibility with Built-ins**: Implementing these methods makes your objects compatible with Python's built-in functions and libraries that rely on comparisons.
    

### Practice Questions

1. **Implement a**`Book` class where books are compared based on their `title` and `author`. Include all comparison methods.
    
2. **Define a**`Person` class where persons are compared based on their `age`. Implement comparison methods for equality, less than, and greater than.
    
3. **Implement a**`Point3D` class for 3D points and include methods to compare points based on their distance from the origin.
    

### **Summary**

* **Default Behavior:** Built-in types have default ordering; custom classes do not unless defined.
    
* **Default Ordering:** Supported for built-in types like numbers and strings. Custom objects need defined comparison methods.
    
* **Practical Use Cases:** Sorting lists, managing data structures that rely on ordering.
    

Understanding the default behavior helps you recognize when and why you need to implement custom comparison methods in your classes.