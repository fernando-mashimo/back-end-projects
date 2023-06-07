# Welcome to the All For One project repository

# Deliverables

<details>
  <summary><strong>👨‍💻 What needs to be developed</strong></summary><br />

You will work on a project codenamed _All For One_ where you will practice all the SQL concepts taught so far. You will the database `Northwind`, developed by `Microsoft` for learning purposes.
</details>

<details>
  <summary><strong>👨‍💻 Development</strong></summary><br />

In this project, you have a series of challenges with different levels of complexity that must be solved in separate files.

1. Read the question and create a file called `desafioN.sql` in the root of the project, where N is the challenge number.

2. The file should only contain the SQL code for the solved challenge. **Do not forget to include the semicolon (";")** at the end of your queries and **do not include the database name in the query**. The following example shows the correct format:

```sql
SELECT * FROM orders;
```

3. Do this for each challenge until you finish all of them.

 </details>
 
 
 ## Initial Challenges

1 - Display only the product names in the `products` table.

---

2 - Display the data from all columns of the `products` table.

---

3 - Write a query that displays the values of the column representing the primary key of the `products` table.

---

4 - Count how many records exist in the `product_name` column of the `products` table.

---

5 - Write a query that displays the data from the `products` table starting from the fourth record to the thirteenth.

<details>
  <summary>&nbsp;&nbsp;<strong>👀 Technical notes</strong></summary>

- Both the fourth and thirteenth records need to appear in the query result.

- Do not use `where` or `order by`.

  <br />

</details>

---

6 - Display the data from the `product_name` and `id` columns of the `products` table in alphabetical order by names.

---

7 - Show only the ids of the last 5 records in the `products` table (the ordering should be based on the `id` column).

---

8 - Perform a query on the `employees` table that returns the full name of the employee (columns `first_name` and `last_name`) as `full_name` and also the complete location (columns `city`, `state_province`, and `address`) as `location`.

<details>
  <summary>&nbsp;&nbsp;<strong>👀 Technical notes</strong></summary>

- In the first column, display the concatenation of `first_name` and `last_name` with the name `full_name`, separated by a space.

- In the second column, display the concatenation of `city`, `state_province`, and `address` with the name `location`.

- The concatenation of `city` and `state_province` should be separated by a hyphen, and the `address` column should be separated by a comma and a space. Example:

    ```text
      "Seattle-WA, 123 1st Avenue"
    ```

  <br />

</details>

## Challenges on Data Filtering

9 - Show all the values of `notes` from the `purchase_orders` table that are not null.

---

10 - Show all the data from the `purchase_orders` table in descending order, sorted by `created_by` where `created_by` is greater than or equal to 3.

- Also, order the results by `id` in ascending order as a tiebreaker for the sorting.

---

11 - Display the data from the `notes` column of the `purchase_orders` table where the value of `Purchase generated based on Order` is greater than or equal to 30 and less than or equal to 39.

- ✨ Tip: `Purchase generated based on Order` is a value assigned to the `notes` column, not a separate column.

---

12 - Show the `submitted_date` from `purchase_orders` where the `submitted_date` is April 26, 2006.

---

13 - Show the `supplier_id` from `purchase_orders` where the `supplier_id` is 1 or 3.

---

14 - Show the results of the `supplier_id` column from the `purchase_orders` table where the `supplier_id` is greater than or equal to 1 and less than or equal to 3.

---

15 - Show only the hours (without minutes and seconds) from the `submitted_date` column of all records in the `purchase_orders` table.

- In the result, the hour extracted from the `submitted_date` column should be named `submitted_hour`.

---

16 - Display the `submitted_date` from the `purchase_orders` table that falls between

 `2006-01-26 00:00:00` and `2006-03-31 23:59:59`.

---

17 - Show the records from the `id` and `supplier_id` columns of the `purchase_orders` table where the `supplier_id` is either 1, 3, 5, or 7.

---

18 - Show all the records from `purchase_orders` where the `supplier_id` is equal to 3 and `status_id` is equal to 2.

---

19 - Show the count of orders made in the `orders` table by `employee_id` equal to 5 or 6, and that were shipped using the method (column) `shipper_id` equal to 2.

- In the result, the column containing the count of orders should be named `orders_count`.

---

## Table Manipulation Challenges

20 - Add a record to the `order_details` table with `order_id`: 69, `product_id`: 80, `quantity`: 15.0000, `unit_price`: 15.0000, `discount`: 0, `status_id`: 2, `date_allocated`: NULL, `purchase_order_id`: NULL, and `inventory_id`: 129.

- ✨ Tip: The `id` should be incremented automatically. To better understand this, you can check the table creation file (./northwind.sql, at line 439) [here](northwind.sql).

---

21 - Add two rows to the `order_details` table with the same data as in requirement 20 using a single `INSERT` statement.

<details>
  <summary>&nbsp;&nbsp;<strong>👀 Technical notes</strong></summary>
  
- The data for these rows is again `order_id`: 69, `product_id`: 80, `quantity`: 15.0000, `unit_price`: 15.0000, `discount`: 0, `status_id`: 2, `date_allocated`: NULL, `purchase_order_id`: NULL, and `inventory_id`: 129;

- The `id` should be incremented automatically.

  <br />

</details>

---

22 - Update all the data in the `discount` column of the `order_details` table to 15.

⚠️ To test locally, you may need to use SAFE UPDATE, but **you do not need to add the SAFE UPDATE statement in the `challenge22.sql` file along with the query**, as the evaluator itself will adjust it.

---

23 - Update the data in the `discount` column of the `order_details` table to 30, where the value in the `unit_price` column is less than 10.0000.

- ✨ Tip: You don't need to use SAFE UPDATE in your query.

---

24 - Update the data in the `discount` column of the `order_details` table to 45, where the value in the `unit_price` column is greater than 10.0000 and the id is a number between 30 and 40.

- ✨ Tip: You don't need to use SAFE UPDATE in your query.

---

25 - Delete all the data where the `unit_price` in the `order_details` table is less than 10.0000.

---

26 - Delete all the data where the `unit_price` in the `order_details` table is greater than 10.0000.

---

27 - Delete all the data from the `order_details` table.

---
