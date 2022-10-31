create table dbms_project_user(
    id int auto_increment primary key,
    username varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null
);

Insert into dbms_project_user(username, email, password)
values('rehan','rehan@gmail.com','dsghjss');

select * from dbms_project_user;

-- Addresses
create table dbms_project_user_addresses(
    id int auto_increment primary key,
    userId int not null,
    mobile_number char(10) not null,
    pin_code char(6) not null,
    city varchar(255) not null,
    state varchar(255) not null,
    landmark varchar(255) not null,

    FOREIGN KEY(userId) 
    REFERENCES dbms_project_user(id) 
    ON DELETE CASCADE
);

Insert into dbms_project_user_addresses
(userId, mobile_number, pin_code, city, state, landmark)
values(1,'9957911397','765675','Aizawl','Mizoram','Mizoram University');

select * from dbms_project_user_addresses where userId=1;

-- User product cart
create table dbms_project_user_cart(
    userId int not null,
    productId int not null,

    FOREIGN KEY(userId) 
    REFERENCES dbms_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(productId) 
    REFERENCES dbms_project_products(id) 
    ON DELETE CASCADE,

    PRIMARY KEY(userId, productId)
);

Insert into dbms_project_user_cart
(userId, productId)
values("1", "1");

delete from dbms_project_user_cart where userId = 1 AND productId= 1;

select dbms_project_products.id ,
       dbms_project_products.name,
       dbms_project_products.description,
       dbms_project_products.inventory,
       dbms_project_products.price,
       dbms_project_products.discount_percent,
       dbms_project_products.image_link
 from dbms_project_user_cart

 inner join dbms_project_products 
 on dbms_project_user_cart.productId = dbms_project_products.id
 and dbms_project_user_cart.userId = 1;

-- Products

create table dbms_project_products(
    id int auto_increment primary key,
    name varchar(255) not null,
    description varchar(1080) not null,
    inventory int not null,
    price int not null,
    discount_percent int not null,
    image_link varchar(1080) 
);

drop table dbms_project_products;

Insert into dbms_project_products(name, description, inventory, price, discount_percent)
values('Air Jordhan','Air jordhan shoes', 10, 1500, 13);

Insert into dbms_project_products(name, description, inventory, price, discount_percent)
values('Nike shoes','top quality shoes', 10, 1500, 13);

Insert into dbms_project_products(name, description, inventory, price, discount_percent)
values('adidas originals','advance quality adidas shoes', 10, 1500, 13);

select * from dbms_project_products;



-- Orders


create table dbms_project_orders (
    id varchar(255) primary key,
    userId int not null,
    addressId int not null,
    total_amount int not null,

    FOREIGN KEY(userId) 
    REFERENCES dbms_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(addressId) 
    REFERENCES dbms_project_user_addresses(id) 
    ON DELETE CASCADE
);
select * from dbms_project_orders;

select 
     dbms_project_orders.id,
     dbms_project_orders.total_amount,
     dbms_project_user_addresses.mobile_number,
     dbms_project_user_addresses.pin_code,
     dbms_project_user_addresses.city,
     dbms_project_user_addresses.state,
     dbms_project_user_addresses.landmark

     from dbms_project_orders
     inner join dbms_project_user_addresses
     on dbms_project_orders.addressId = dbms_project_user_addresses.id
     and dbms_project_orders.id = "5b880667-bc4f-49a2-a554-93c8f3350073";


-- Order items

create table dbms_project_order_items (
    id int auto_increment primary key,
    orderId varchar(255) not null,
    userId int not null,
    productId int not null,

    FOREIGN KEY(userId) 
    REFERENCES dbms_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(orderId) 
    REFERENCES dbms_project_orders(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(productId) 
    REFERENCES dbms_project_products(id) 
    ON DELETE CASCADE
);

select 
       dbms_project_products.name,
       dbms_project_products.description,
       dbms_project_products.price,
       dbms_project_products.image_link
       from  dbms_project_order_items 

       inner join dbms_project_products on
       dbms_project_order_items.productId = dbms_project_products.id
       where orderId = "5b880667-bc4f-49a2-a554-93c8f3350073";

-- details of single order item
select      
     dbms_project_products.name,
     dbms_project_products.description,
     dbms_project_products.price,
     dbms_project_products.image_link,

     dbms_project_user_addresses.mobile_number,
     dbms_project_user_addresses.pin_code,
     dbms_project_user_addresses.city,
     dbms_project_user_addresses.state,
     dbms_project_user_addresses.landmark

     from dbms_project_order_items

     inner join dbms_project_products on
     dbms_project_order_items.productId = dbms_project_products.id

     inner join dbms_project_orders on
     dbms_project_order_items.orderId = dbms_project_orders.id

     inner join dbms_project_user_addresses
     on dbms_project_orders.addressId = dbms_project_user_addresses.id

     and dbms_project_order_items.id = 5;

-- Single order
START TRANSACTION;

insert into dbms_project_orders values('ddf-e', 1, 1,3000);
-- for loop
insert into dbms_project_order_items(orderId, userId, productId)
values('ddf-e', 1, 1);
insert into dbms_project_order_items(orderId, userId, productId)
values('ddf-e', 1, 2);

COMMIT;
-- Single order end


-- Single order
START TRANSACTION;
  
insert into dbms_project_orders values('refdf', 1, 1,4343);
-- for loop
insert into dbms_project_order_items(orderId, userId, productId)
values
('refdf', 1, 3),
('refdf', 1, 2);

COMMIT;


-- get all order items for a user
select dbms_project_order_items.id, 
       orderId,
       dbms_project_products.name,
       dbms_project_products.description,
       dbms_project_products.price,
       dbms_project_products.image_link
       from  dbms_project_order_items 

       inner join dbms_project_products on
       dbms_project_order_items.productId = dbms_project_products.id

       where dbms_project_order_items.userId = "1" 
       order by orderId asc;



START TRANSACTION; 
insert into dbms_project_orders values ('5b880667-bc4f-49a2-a554-93c8f3350073', 1,1, 3467); 
insert into dbms_project_order_items (orderId, userId, productId) 
values 
('5b880667-bc4f-49a2-a554-93c8f3350073', 1, 1),
('5b880667-bc4f-49a2-a554-93c8f3350073', 1, 2),
('5b880667-bc4f-49a2-a554-93c8f3350073', 1, 3); 
COMMIT;

select * from dbms_project_user where id=1;