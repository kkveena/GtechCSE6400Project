  
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


-- Can a Composite Foreign  key be created on city_name and state_name
CREATE TABLE Store (
  store_number INT(16) NOT NULL,
  phone_no INT(10) ,
  street_address VARCHAR(250) ,
  is_showcasestore BOOLEAN ,
  state_name VARCHAR(250)NOT NULL ,
  city_name VARCHAR(250) NOT NULL ,
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

CREATE TABLE StoreProductXref (
  pID INT(16) NOT NULL,
  store_number INT(16) NOT NULL,
  PRIMARY KEY (pID, store_number)
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

CREATE TABLE Manufacturer (
	manufacturer_id INT(16) NOT NULL,
	manufacturer_name VARCHAR(250) NOT NULL,
  PRIMARY KEY (manufacturer_id),
  UNIQUE(manufacturer_name)
);

CREATE TABLE Product (
  pID INT(16) NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  retail_price FLOAT(16, 2),
  manufacturer_id INT(16),
  PRIMARY KEY (pID),
  UNIQUE (product_name)
 );

CREATE TABLE Category (
  category_id INT(16) NOT NULL,
  category_name VARCHAR(250) NOT NULL,
  PRIMARY KEY (category_id)
);

CREATE TABLE GenericDate (
  calender_date DATE NOT NULL,
  PRIMARY KEY (calender_date)
);

CREATE TABLE DiscountDate (
  calender_date DATE NOT NULL,
  discount_date DATE NOT NULL,
  PRIMARY KEY (calender_date)
);

CREATE TABLE SalesDate (
  calender_date DATE NOT NULL,
  special_savings_date DATE NULL,
  PRIMARY KEY (calender_date)
);

CREATE TABLE DiscountPrice (
  discountPriceID INT(16) NOT NULL,
  discount_price FLOAT(16, 2) NOT NULL,
  discount_date DATE NOT NULL,
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

CREATE TABLE SroreProductXref (
     pID INT(16) NOT NULL,
     store_number INT(16) NOT NULL,
     PRIMARY KEY (pID, store_number)
);

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
  
ALTER TABLE SroreProductXref
	ADD CONSTRAINT fk_SroreProductXref_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
	ADD CONSTRAINT fk_SroreProductXref_store_number_Store_store_number FOREIGN KEY (pid) REFERENCES Store(store_number);

ALTER TABLE CategoryProductXref
	ADD CONSTRAINT fk_CategoryProductXref_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
	ADD CONSTRAINT fk_CategoryProductXref_category_id_Category_category_id FOREIGN KEY (category_id) REFERENCES Category(category_id);
	
ALTER TABLE DiscountPriceProductXref
	ADD CONSTRAINT fk_DiscountPriceProductXref_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
	ADD CONSTRAINT fk_DiscountPriceProductXref_DiscountPrice_DiscountPrice_discountPriceID FOREIGN KEY (discountPriceID) REFERENCES DiscountPrice(discountPriceID);
	
ALTER TABLE StoreUserXref
	ADD CONSTRAINT fk_StoreUserXref_uID_User_uID FOREIGN KEY (uID) REFERENCES User(uID),
	ADD CONSTRAINT fk_StoreUserXref_store_number_Store_store_number FOREIGN KEY (store_number) REFERENCES Store(store_number);

ALTER TABLE Sales
  ADD CONSTRAINT fk_Sales_store_number_Store_store_number FOREIGN KEY (store_number) REFERENCES Store(store_number),
  ADD CONSTRAINT fk_Sales_pid_Product_pid FOREIGN KEY (pid) REFERENCES Product(pid),
  ADD CONSTRAINT fk_Sales_date_of_sales_SalesDate_calendar_date FOREIGN KEY (date_of_sales) REFERENCES SalesDate(calender_date);
  
ALTER TABLE DiscountDate
  ADD CONSTRAINT fk_DiscountDate_calender_date_GenericDate_calender_date FOREIGN KEY (calender_date) REFERENCES GenericDate(calender_date);

ALTER TABLE SalesDate
  ADD CONSTRAINT fk_SalesDate_calender_date_GenericDate_calender_date FOREIGN KEY (calender_date) REFERENCES GenericDate(calender_date);

ALTER TABLE DiscountPrice
	ADD CONSTRAINT fk_DiscountPrice_discount_date_DiscountDate_calendar_date FOREIGN KEY (discount_date) REFERENCES DiscountDate(calender_date);
    

