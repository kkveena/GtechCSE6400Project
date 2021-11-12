
-- ###calculate revenue by year task###
-- #####calculate revenue for each city subtask
--         Fetch each city revenue on an annual basis
SELECT Store.city_name, EXTRACT(YEAR FROM S.date_of_sales) AS YOS, SUM(S.total_sales)
FROM Store
         JOIN Sales S on Store.store_number = S.store_number
GROUP BY Store.city_name, YOS;

-- ###display population category state
-- ##For the selected category, For each city in city within population range
--        City Size broken down:Small (population< 3,700,000),Medium (population >= 3,700,000 and< 6,700,000),Large (population > = 6,700,000 and <9,000,000),Extra Large(population >:9,000,000)
--        Sum revenue sold. Sort by city size ascending, sort ascending year
SELECT Store.city_name,
       (CASE WHEN C2.population < 3700000 THEN 'Small' WHEN C2.population >= 3700000 AND C2.population < 6700000 THEN 'Medium' WHEN C2.population >= 6700000 AND  C2.population < 9000000 THEN 'Large' WHEN C2.population >= 9000000 THEN 'Extra Large' END ) AS SIZE,
       EXTRACT(YEAR FROM S.date_of_sales) AS YOS,
       SUM(S.total_sales)
FROM Store
         JOIN Sales S on Store.store_number = S.store_number
         JOIN Product P on S.pid = P.pID
         JOIN CategoryProductXref CPX on P.pID = CPX.pID
         JOIN Category C on C.category_id = CPX.category_id
         JOIN City C2 on C2.city_name = Store.city_name and C2.state_name = Store.state_name
WHERE C.category_name = '<category_input>'
GROUP BY Store.city_name, YOS
ORDER BY FIELD(SIZE, 'Small', 'Medium', 'Extra Large'), YOS;
