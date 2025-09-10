---
title: "How Do Database Transactions Really Work? I Built a Mini Key-Value Store to Find Out"
date: "2025-02-03"
author: "Tarun"
readTime: "5 min"
tags: ["commit", "python", "databases", "python3", "transactions", "rollback", "key-value-db", "in-memory-database", "inmemorycaching"]
difficulty: "Beginner"
excerpt: "Discover the intricate workings of database transactions by building a mini key-value store with support for commit and rollback operations"
---
I tried implementing a mini in-memory key-value data store that supports transactions, rollback, and commit — just to see how databases handle these operations under the hood. Turns out, it’s a fascinating journey of layers, reversibility, and data integrity.

---

### 🔍 The Curiosity

As developers, we often use databases as a black box. We know we can:

* Start a transaction with `BEGIN`
    
* Do some `INSERT`, `UPDATE`, `DELETE`
    
* Either `COMMIT` to apply changes or `ROLLBACK` to discard them
    

We trust the DB will "do the right thing." But have you ever wondered **how** that actually works?

> What happens under the hood when you `BEGIN` a transaction?
> 
> How does a database know what to roll back?
> 
> Can nested transactions be supported? What happens on partial rollback?

These questions nudged me to experiment. So, I decided to **build a simple in-memory key-value store** that behaves like a mini database with **transactional support**.

---

## 🎯 Goal

Implement a Python-based key-value store that supports:

* `put(key, value)`
    
* `get(key)`
    
* `delete(key)`
    
* `begin()` — start a transaction
    
* `rollback()` — undo changes in the current transaction
    
* `commit()` — persist all changes
    

With **support for nested transactions** — meaning, I should be able to:

```python
db.begin()
db.put("a", 10)

db.begin()
db.put("a", 20)
db.rollback()  # Now a is back to 10

db.commit()  # Now a = 10 is saved to base layer
```

---

## 🧱 Core Idea Behind the Design

To model the transaction stack, I used a **list of dictionaries**, each representing a **"patch" layer**:

```python
self.transactions = [{}]  # top is most recent transaction
```

* If there's no active transaction, writes go to [`self.data`](http://self.data)
    
* If there is an active transaction, writes go to the **top-most patch**
    
* Reads always go from top → bottom → base data
    

To handle `delete()`, I used a sentinel value (`None`) to represent deletion in transaction layers.

---

## 📦 The DataStore Class

Here’s a simplified version of the final `KeyValueDataStore`:

```python
class KeyValueDataStore:

    def __init__(self):
        self.data = {}
        self.transactions = []
        self.begin_transaction = False

    def put(self, key, value):
        if self.begin_transaction:
            transaction = self.transactions[-1]
            transaction[key] = value
        else:
            self.data[key] = value

    def get(self, key):
        if self.begin_transaction:
            for transaction in reversed(self.transactions):
                if key in transaction:
                    if transaction[key] is None:
                        raise KeyError(f"Given Key {key} not found in data store")
                    else:
                        return transaction[key]

            if key in self.data:
                return self.data[key]
            else:
                raise KeyError(f"Given Key {key} not found in data store")
        elif key in self.data:
            return self.data[key]
        else:
            raise KeyError(f"Given Key {key} not found in data store")

    def delete(self, key):
        if self.begin_transaction:
            transaction = self.transactions[-1]
            transaction[key] = None
        elif key in self.data:
            del self.data[key]
        else:
            raise KeyError(f"Given Key {key} not found in data store")

    def begin(self):
        self.begin_transaction = True
        self.transactions.append({})

    def rollback(self):
        if self.begin_transaction:
            self.transactions.pop()
        else:
            raise Exception("There are no transaction to rollback")

    def commit(self):
        if self.begin_transaction:
            for transaction in self.transactions:
                for key, value in transaction.items():
                    if value is None:
                        del self.data[key]
                    else:
                        self.data[key] = value

            self.begin_transaction = False
            self.transactions = []
        else:
            raise Exception("There are no transaction to commit")


```

---

## ✅ Transaction Flow in Action

Let’s walk through a scenario:

```python
db = KeyValueDataStore()

db.put("x", 1)
db.begin()           # Start transaction 1
db.put("x", 2)

db.begin()           # Start transaction 2 (nested)
db.delete("x")

db.rollback()        # Undo delete — x should be 2 again
db.commit()          # Persist x = 2
print(db.get("x"))   # ✅ Output: 2
```

This simple example illustrates:

* How `rollback()` discards changes from the top-most layer
    
* How `commit()` merges all layers down into [`self.data`](http://self.data)
    

---

## 🧪 Testing It Like a Real Database

To validate all behaviors (including edge cases), I wrote comprehensive unit tests using Python's `unittest`.

Some scenarios I tested:

* ✅ Basic get/put/delete
    
* 🔁 Nested `begin()`/`rollback()` sequences
    
* ❌ Commit with no transaction (raises error)
    
* ❌ Rollback with no transaction (raises error)
    
* 🧠 Delete + rollback (ensures key is restored)
    
* 🎯 Transaction interleaving with multiple keys
    

```python
def test_nested_transaction(self):
    db = KeyValueDataStore()

    db.begin()
    db.put("a", 5)
    db.begin()
    db.put("a", 15)
    db.rollback()
    self.assertEqual(db.get("a"), 5)
    db.rollback()
    with self.assertRaises(KeyError):
        db.get("a")
```

---

## 🧠 What I Learned

* Transactions are **just layers of diffs**.
    
* Rolling back means **discarding the most recent patch**.
    
* Committing means **merging all patches** into base.
    
* A simple concept, but surprisingly elegant — and powerful.
    

This small POC helped me move from "knowing" what transactions are to **internalizing how they really work**.

---

## 🏁 Final Thoughts

This project started with a simple question — “what really happens when I run `BEGIN`, `COMMIT`, or `ROLLBACK` in SQL?”

By building my own version, I now truly **understand and appreciate** the layered nature of transactions.

If you're curious about how systems work, don't just read theory — **build something small** and reason through the mechanics.

---

## 📚 Further Reading

If you're curious to explore how real-world databases implement transactions:

* [ACID Properties Explained – GeeksforGeeks](https://www.geeksforgeeks.org/acid-properties-in-dbms/)
    
* [SQLite Transaction Behavior](https://www.sqlite.org/lang_transaction.html)
    
* [Redis Transactions](https://redis.io/docs/manual/transactions/)
    
* [PostgreSQL Transaction Tutorial](https://www.postgresqltutorial.com/postgresql-transaction/)
    

These helped me connect my hands-on implementation with how industrial databases handle things.

---

🧵 *Thanks for reading! If you liked this post, feel free to reach out or share how you’d take this further — I’d love to learn from your approach too.*