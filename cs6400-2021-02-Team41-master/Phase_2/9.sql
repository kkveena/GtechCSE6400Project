-- ####Grand Showcase Store Category Comparison
-- For each product: Display Product ID,Display Product Name,Count the number of each product sold by Grand Showcase stores
-- Count the number of each product sold by Will-Mart stores
--  Subtract the numbers of each product sold by Grand Showcase stores from the numbers of each product sold by Will-Mart stores to obtain the differences
SELECT P.product_name, P.pid, SUM(Sales.quantity) AS ALL_SALES,
       SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END ) AS SHOWCASE_STORE_SALES,
       SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS DIFF_IN_SALES
FROM Sales
         JOIN Product P on P.pID = Sales.pid
         JOIN Store S on S.store_number = Sales.store_number
GROUP BY pid;

-- ##how Grand Showcase Store Category Comparison drill down subtask:
-- ##Display top five of Product ID, Product Name, Grand Showcase Qty, Regular Qty and Difference
SELECT P.product_name, P.pid, SUM(Sales.quantity) AS ALL_SALES,
       SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END ) AS SHOWCASE_STORE_SALES,
       SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS DIFF_IN_SALES
FROM Sales
         JOIN Product P on P.pID = Sales.pid
         JOIN Store S on S.store_number = Sales.store_number
GROUP BY P.pid
ORDER BY DIFF_IN_SALES DESC, P.pID ASC
LIMIT 5;

-- ## Display bottom five of of Product ID, Product Name, Grand Showcase Qty, Regular Qty and Difference
SELECT P.product_name, P.pid, SUM(Sales.quantity) AS ALL_SALES,
       SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END ) AS SHOWCASE_STORE_SALES,
       SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS DIFF_IN_SALES
FROM Sales
         JOIN Product P on P.pID = Sales.pid
         JOIN Store S on S.store_number = Sales.store_number
GROUP BY P.pid
ORDER BY DIFF_IN_SALES DESC, P.pID DESC
LIMIT 5;

-- ##Sort by difference in descending order, product ID in ascending order
SELECT P.product_name, P.pid, SUM(Sales.quantity) AS ALL_SALES,
       SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END ) AS SHOWCASE_STORE_SALES,
       SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS DIFF_IN_SALES
FROM Sales
         JOIN Product P on P.pID = Sales.pid
         JOIN Store S on S.store_number = Sales.store_number
GROUP BY P.pid
ORDER BY DIFF_IN_SALES DESC, P.pID ASC;
