  
-- Tables

CREATE TABLE User (
  uID INT(16) NOT NULL,
  password VARCHAR(250) NOT NULL,
  PRIMARY KEY (uID)
);

CREATE TABLE City (
  city_name VARCHAR(250) NOT NULL,
  state_name VARCHAR(250) NOT NULL,
  population INT(16),
  PRIMARY KEY (city_name, state_name)
);


-- 
CREATE TABLE Store (
  store_number INT(16) NOT NULL,
  phone_no VARCHAR(20) ,
  street_address VARCHAR(250) ,
  city_name VARCHAR(250) NOT NULL ,
  state_name VARCHAR(250)NOT NULL ,
  is_showcasestore BOOLEAN ,
   PRIMARY KEY (store_number)
 ); 

CREATE TABLE CorporateUser (
  corpUID INT(16) NOT NULL,
  PRIMARY KEY(corpUID)
 );

CREATE TABLE StoreManager (
  storeMUID INT(16) NOT NULL,
  PRIMARY KEY(storeMUID)
  );

CREATE TABLE MarketingUser (
  marketingUID INT(16) NOT NULL,
  PRIMARY KEY(marketingUID)
  );


CREATE TABLE CategoryProductXref (
  pID INT(16) NOT NULL,
  category_id INT(16) NOT NULL,
  PRIMARY KEY (pID, category_id)
);

CREATE TABLE DiscountPriceProductXref (
  pID INT(16) NOT NULL,
  discountPriceID INT(16) NOT NULL,
  PRIMARY KEY (pID, discountPriceID)
);
-- Sequence Created
CREATE TABLE Manufacturer (
	manufacturer_id INT(16) NOT NULL AUTO_INCREMENT,
	manufacturer_name VARCHAR(250) NOT NULL,
  PRIMARY KEY (manufacturer_id),
  UNIQUE(manufacturer_name)
);

-- product_name is not unique and hence commented
CREATE TABLE Product (
  pID INT(16) NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  retail_price FLOAT(16, 2),
  manufacturer_id INT(16),
  PRIMARY KEY (pID)
#   --UNIQUE (product_name)
 );

-- Sequence Created
CREATE TABLE Category (
  category_id INT(16) NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(250) NOT NULL,
  PRIMARY KEY (category_id)
);

-- Sequence Created
CREATE TABLE GenericDate (
  calender_date DATE NOT NULL,
  PRIMARY KEY (calender_date)
);

-- Dropped this table
# --CREATE TABLE DiscountDate (
#   --calender_date DATE NOT NULL,
#   --discount_date DATE NOT NULL,
#   --PRIMARY KEY (calender_date)
# --);

-- Added discount_percent column
CREATE TABLE SalesDate (
  calender_date DATE NOT NULL,
  special_savings_date DATE NULL,
  discount_percent FLOAT(16, 2),
  PRIMARY KEY (calender_date)
);

-- Column Sequence changed
CREATE TABLE DiscountPrice (
  discountPriceID INT(16) NOT NULL ,
  discount_date DATE NOT NULL,
  discount_price FLOAT(16, 2) NOT NULL,
   PRIMARY KEY (discountPriceID)
);

CREATE TABLE Sales (
  store_number INT(16) NOT NULL,
  pid INT(16) NOT NULL,
  date_of_sales DATE NOT NULL,
  quantity INT(16) NOT NULL,
  total_sales FLOAT(16,2) NULL,
  PRIMARY KEY (store_number,pid,date_of_sales)
  );
  
 CREATE TABLE StoreProductXref (
  pID INT(16) NOT NULL,
  store_number INT(16) NOT NULL,
  PRIMARY KEY (pID, store_number)
);

 -- Incorrect Name table - dropped
# --CREATE TABLE SroreProductXref (
#      --pID INT(16) NOT NULL,
#      --store_number INT(16) NOT NULL,
#      --PRIMARY KEY (pID, store_number)
# --);


CREATE TABLE StoreUserXref (
      uID INT(16) NOT NULL,
      store_number INT(16) NOT NULL,
      PRIMARY KEY (uID, store_number)
);

-- Constraints 

ALTER TABLE Store
  ADD CONSTRAINT fk_Store_city_name_state_name_City_city_name_state_name FOREIGN KEY (city_name, state_name) REFERENCES City(city_name, state_name);
     
ALTER TABLE CorporateUser
  ADD CONSTRAINT fk_CorporateUser_uID_User_uID FOREIGN KEY (corpUID) REFERENCES User(uID);

ALTER TABLE MarketingUser
  ADD CONSTRAINT fk_MarketingUser_uID_User_uID FOREIGN KEY (marketingUID) REFERENCES User(uID);
  
ALTER TABLE StoreManager
  ADD CONSTRAINT fk_StoreManager_uID_User_uID FOREIGN KEY (storeMUID) REFERENCES User(uID);

ALTER TABLE Product
  ADD CONSTRAINT fk_Product_manufacturer_id_Manufacturer_manufacturer_id FOREIGN KEY (manufacturer_id) REFERENCES Manufacturer(manufacturer_id);

-- Table Name changed and hence FK name changed
ALTER TABLE StoreProductXref
	ADD CONSTRAINT fk_StoreProductXref_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
	ADD CONSTRAINT fk_StoreProductXref_store_number_Store_store_number FOREIGN KEY (store_number) REFERENCES Store(store_number);

-- Earlier fk_CategoryProductXref_category_id_Category_category_id was incorrect - it was on pID than category_id
ALTER TABLE CategoryProductXref
	ADD CONSTRAINT fk_CategoryProductXref_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
	ADD CONSTRAINT fk_CategoryProductXref_category_id_Category_category_id FOREIGN KEY (category_id) REFERENCES Category(category_id);
	
ALTER TABLE DiscountPriceProductXref
	ADD CONSTRAINT fk_DiscountPriceProductXref_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
	ADD CONSTRAINT fk_DiscountPriceProductXref_DiscountPrice_DiscountPrice_dPID FOREIGN KEY (discountPriceID) REFERENCES DiscountPrice(discountPriceID);
	
ALTER TABLE StoreUserXref
	ADD CONSTRAINT fk_StoreUserXref_uID_User_uID FOREIGN KEY (uID) REFERENCES User(uID),
	ADD CONSTRAINT fk_StoreUserXref_store_number_Store_store_number FOREIGN KEY (store_number) REFERENCES Store(store_number);

-- fk_Sales_pid_Product_pid is dropped as enabling this will result in 125K (126526) records loss; We will take a decision on 18th July 2021
-- fixed it on 18th July 2021
ALTER TABLE Sales
  ADD CONSTRAINT fk_Sales_store_number_Store_store_number FOREIGN KEY (store_number) REFERENCES Store(store_number),
  ADD CONSTRAINT fk_Sales_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
  ADD CONSTRAINT fk_Sales_date_of_sales_SalesDate_calendar_date FOREIGN KEY (date_of_sales) REFERENCES SalesDate(calender_date);
  
# --ALTER TABLE DiscountDate
#   --ADD CONSTRAINT fk_DiscountDate_calender_date_GenericDate_calender_date FOREIGN KEY (calender_date) REFERENCES GenericDate(calender_date);

ALTER TABLE SalesDate
  ADD CONSTRAINT fk_SalesDate_calender_date_GenericDate_calender_date FOREIGN KEY (calender_date) REFERENCES GenericDate(calender_date);

-- Discount Date dropped and hence referring to GenericDate now
ALTER TABLE DiscountPrice
	ADD CONSTRAINT fk_DiscountPrice_discount_date_GenericDate_calendar_date FOREIGN KEY (discount_date) REFERENCES GenericDate(calender_date);
    

