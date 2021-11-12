
1. Please Use MySQlWorkBench --> Data Import utility. Just point it to "TA_DemoScehma_07172021" folder and import. This will work;

Hi All,
I loaded TA demo schema. It was not easy and it took me a day and half to load. Please note below:
1.	schema.sql  I have to adjust schema a bit to load the data. Please feel free to ask for details. Below is summary:

a)	Please refer inline comments for schema changes
b)	There is no need of “DiscountDate” table and hence dropped. 
c)	Incorrect Table “SroreProductXref” was dropped. 
d)	We do not need to populate “StoreProductXref” table as Sales table has denormalized data. 
e)	I was able to load all table with constraints enables. The only constraint which I disabled is “fk_Sales_pid_Product_pid” . We will discuss it tomorrow. I strongly believe that no one has to change their query for these changes

2.	It was not easy to prepare dump and load script. If interested, I will discuss with you guys tomorrow. Please take a look “DemoDataLoadScript.pdf” for python code.
3.	For loading the data, just refer readme document.
Please let me know – in case of any question.
Regards
Krishna Kumar



