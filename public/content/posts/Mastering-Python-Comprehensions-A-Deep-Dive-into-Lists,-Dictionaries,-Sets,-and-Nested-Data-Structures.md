---
title: "Mastering Python Comprehensions: A Deep Dive into Lists, Dictionaries, Sets, and Nested Data Structures"
date: "2025-01-10"
author: "Tarun"
readTime: "5 min"
tags: ["python", "data-structures", "python3", "list-comprehension", "dictionary-comprehension", "set-comprehension", "taps-techie"]
difficulty: "Beginner"
excerpt: "Master Python comprehensions for lists, dictionaries, sets, and nested data structures. Make your code cleaner, efficient, and easier to understand"
---
Python is known for its readability and concise syntax, and one of the most powerful features that contribute to this reputation is comprehensions. Whether you’re dealing with lists, dictionaries, sets, or more complex nested data structures, comprehensions can make your code cleaner, more efficient, and easier to understand.

In this blog, we'll explore how comprehensions work across different data types, provide examples for each, and demonstrate how you can apply them to real-world scenarios.

---

## **1\. List Comprehensions**

### **What are List Comprehensions?**

List comprehensions provide a compact way to create lists. You can generate a new list by applying an expression to each item in an iterable (like a list or range), optionally filtering items using a condition.

### **Basic Example: Creating a List of Squares**

Let's start with a simple task: creating a list of squares for numbers from 0 to 9.

#### Traditional Way:

```python
squares = []
for i in range(10):
    squares.append(i**2)
```

#### List Comprehension Way:

```python
squares = [i**2 for i in range(10)]
```

### **Filtering with List Comprehensions**

You can also filter items directly within the comprehension.

#### Task: Get all even numbers between 0 and 20

#### Traditional Way:

```python
evens = []
for i in range(21):
    if i % 2 == 0:
        evens.append(i)
```

#### List Comprehension Way:

```python
evens = [i for i in range(21) if i % 2 == 0]
```

### **Nested List Comprehensions**

List comprehensions can handle nested structures, too.

#### Task: Flatten a 2D matrix (list of lists) into a single list

#### Matrix:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

#### Flattened List:

```python
flat_list = [num for row in matrix for num in row]
```

---

## **2\. Dictionary Comprehensions**

### **What are Dictionary Comprehensions?**

Dictionary comprehensions allow you to create dictionaries in a similarly concise manner. You can transform and filter data while constructing a dictionary.

### **Example: Filter a Dictionary**

Suppose you have a dictionary of items and their prices, and you want to filter out items that cost more than $10.

#### Original Dictionary:

```python
prices = {
    'apple': 5,
    'banana': 3,
    'cherry': 15,
    'date': 12,
    'elderberry': 9
}
```

#### Filtered Dictionary:

```python
filtered_prices = {key: value for key, value in prices.items() if value <= 10}
```

### **Transforming Data with Dictionary Comprehensions**

You can also transform the data as you filter it. For example, increasing all prices by 10% for items that cost $10 or less:

```python
updated_prices = {key: value * 1.1 for key, value in prices.items() if value <= 10}
```

---

## **3\. Set Comprehensions**

### **What are Set Comprehensions?**

Set comprehensions work similarly to list comprehensions but create a set, a collection of unique elements.

### **Example: Creating a Set of Even Squares**

Let’s create a set of even squares from numbers 0 to 9.

#### Set Comprehension:

```python
even_squares_set = {i**2 for i in range(10) if i**2 % 2 == 0}
```

### **More Complex Example: Filtering and Combining Sets**

Suppose you have two lists of numbers and want to create a set of numbers that are either even or greater than 5.

#### Lists:

```python
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
```

#### Combined Set:

```python
combined_set = {x for x in list1 + list2 if x % 2 == 0 or x > 5}
```

---

## **4\. Comprehensions with Nested Data Structures**

Comprehensions shine when dealing with nested data structures like lists of dictionaries or dictionaries of lists. They allow you to extract and transform data with minimal code.

### **Example 1: List of Dictionaries**

Let’s say you have a list of products, each represented as a dictionary, and you want to extract the names of products priced above $500.

#### Product List:

```python
products = [
    {'name': 'Laptop', 'price': 999, 'stock': 34},
    {'name': 'Smartphone', 'price': 699, 'stock': 120},
    {'name': 'Tablet', 'price': 450, 'stock': 60},
    {'name': 'Smartwatch', 'price': 199, 'stock': 20}
]
```

#### Extracted Names:

```python
expensive_products = [product['name'] for product in products if product['price'] > 500]
```

### **Example 2: Dictionary of Lists**

Consider a dictionary where each key is a subject, and the value is a list of scores. You want to normalize these scores by converting them to a percentage of the highest score in each subject.

#### Dictionary of Scores:

```python
students_scores = {
    'math': [85, 79, 91, 73],
    'science': [92, 72, 85, 78],
    'english': [88, 83, 91, 76]
}
```

#### Normalized Scores:

```python
normalized_scores = {subject: [round((score / max(scores)) * 100, 2) for score in scores]
                     for subject, scores in students_scores.items()}
```

### **Example 3: List of Dictionaries with Nested Structures**

Imagine you have a list of orders, each with its own list of items. You want to extract all the item names across all orders.

#### Orders List:

```python
orders = [
    {'id': 1, 'items': [{'name': 'Laptop', 'quantity': 1}, {'name': 'Mouse', 'quantity': 2}]},
    {'id': 2, 'items': [{'name': 'Smartphone', 'quantity': 1}]},
    {'id': 3, 'items': [{'name': 'Tablet', 'quantity': 2}, {'name': 'Headphones', 'quantity': 1}]}
]
```

#### Extracted Item Names:

```python
all_items = [item['name'] for order in orders for item in order['items']]
```

### **Combining Multiple Conditions and Transformations**

You can also apply conditions and transformations within the same comprehension.

#### Task: Extract item names where the quantity is greater than 1 and convert the names to uppercase

#### Filtered and Transformed Item Names:

```python
items_with_quantity = [item['name'].upper() for order in orders for item in order['items'] if item['quantity'] > 1]
```

---

## **Conclusion**

Python comprehensions are a versatile and powerful tool for simplifying your code, making it more readable and efficient. Whether you’re working with lists, dictionaries, sets, or nested data structures, comprehensions can help you filter, transform, and manage your data with minimal code.

By mastering comprehensions, you’ll write cleaner, more Pythonic code that leverages the full power of the language. Start incorporating these techniques into your projects today, and see the difference they make!

---

*Keep exploring the world of Python and happy coding!* 🔨🤖🔧