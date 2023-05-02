create table se_project_user(
    id int auto_increment primary key,
    username varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null
);

Insert into se_project_user(username, email, password)
values('rehan','rehan@gmail.com','dsghjss');

select * from se_project_user;

-- Addresses
create table se_project_user_addresses(
    id int auto_increment primary key,
    userId int not null,
    mobile_number char(10) not null,
    pin_code char(6) not null,
    city varchar(255) not null,
    state varchar(255) not null,
    landmark varchar(255) not null,

    FOREIGN KEY(userId) 
    REFERENCES se_project_user(id) 
    ON DELETE CASCADE
);

Insert into se_project_user_addresses
(userId, mobile_number, pin_code, city, state, landmark)
values(1,'9957911397','765675','Aizawl','Mizoram','Mizoram University');

select * from se_project_user_addresses where userId=1;

-- User product cart
create table se_project_user_cart(
    userId int not null,
    productId int not null,

    FOREIGN KEY(userId) 
    REFERENCES se_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(productId) 
    REFERENCES se_project_products(id) 
    ON DELETE CASCADE,

    PRIMARY KEY(userId, productId)
);

Insert into se_project_user_cart
(userId, productId)
values("1", "1");

delete from se_project_user_cart where userId = 1 AND productId= 1;

select se_project_products.id ,
       se_project_products.name,
       se_project_products.description,
       se_project_products.inventory,
       se_project_products.price,
       se_project_products.discount_percent,
       se_project_products.image_link
 from se_project_user_cart

 inner join se_project_products 
 on se_project_user_cart.productId = se_project_products.id
 and se_project_user_cart.userId = 1;

-- Products

create table se_project_products(
    id int auto_increment primary key,
    name varchar(255) not null,
    description varchar(1080) not null,
    inventory int not null,
    price int not null,
    discount_percent int not null,
    image_link varchar(1080) 
);

drop table se_project_products;

Insert into se_project_products(name, description, inventory, price, discount_percent)
values('Air Jordhan','Air jordhan shoes', 10, 1500, 13);

Insert into se_project_products(name, description, inventory, price, discount_percent)
values('Nike shoes','top quality shoes', 10, 1500, 13);

Insert into se_project_products(name, description, inventory, price, discount_percent)
values('adidas originals','advance quality adidas shoes', 10, 1500, 13);

select * from se_project_products;



-- Orders


create table se_project_orders (
    id varchar(255) primary key,
    userId int not null,
    addressId int not null,
    total_amount int not null,

    FOREIGN KEY(userId) 
    REFERENCES se_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(addressId) 
    REFERENCES se_project_user_addresses(id) 
    ON DELETE CASCADE
);
select * from se_project_orders;

select 
     se_project_orders.id,
     se_project_orders.total_amount,
     se_project_user_addresses.mobile_number,
     se_project_user_addresses.pin_code,
     se_project_user_addresses.city,
     se_project_user_addresses.state,
     se_project_user_addresses.landmark

     from se_project_orders
     inner join se_project_user_addresses
     on se_project_orders.addressId = se_project_user_addresses.id
     and se_project_orders.id = "5b880667-bc4f-49a2-a554-93c8f3350073";


-- Order items

create table se_project_order_items (
    id int auto_increment primary key,
    orderId varchar(255) not null,
    userId int not null,
    productId int not null,

    FOREIGN KEY(userId) 
    REFERENCES se_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(orderId) 
    REFERENCES se_project_orders(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(productId) 
    REFERENCES se_project_products(id) 
    ON DELETE CASCADE
);

select 
       se_project_products.name,
       se_project_products.description,
       se_project_products.price,
       se_project_products.image_link
       from  se_project_order_items 

       inner join se_project_products on
       se_project_order_items.productId = se_project_products.id
       where orderId = "5b880667-bc4f-49a2-a554-93c8f3350073";

-- details of single order item
select      
     se_project_products.name,
     se_project_products.description,
     se_project_products.price,
     se_project_products.image_link,

     se_project_user_addresses.mobile_number,
     se_project_user_addresses.pin_code,
     se_project_user_addresses.city,
     se_project_user_addresses.state,
     se_project_user_addresses.landmark

     from se_project_order_items

     inner join se_project_products on
     se_project_order_items.productId = se_project_products.id

     inner join se_project_orders on
     se_project_order_items.orderId = se_project_orders.id

     inner join se_project_user_addresses
     on se_project_orders.addressId = se_project_user_addresses.id

     and se_project_order_items.id = 5;

-- Single order
START TRANSACTION;

insert into se_project_orders values('ddf-e', 1, 1,3000);
-- for loop
insert into se_project_order_items(orderId, userId, productId)
values('ddf-e', 1, 1);
insert into se_project_order_items(orderId, userId, productId)
values('ddf-e', 1, 2);

COMMIT;
-- Single order end


-- Single order
START TRANSACTION;
  
insert into se_project_orders values('refdf', 1, 1,4343);
-- for loop
insert into se_project_order_items(orderId, userId, productId)
values
('refdf', 1, 3),
('refdf', 1, 2);

COMMIT;


-- get all order items for a user
select se_project_order_items.id, 
       orderId,
       se_project_products.name,
       se_project_products.description,
       se_project_products.price,
       se_project_products.image_link
       from  se_project_order_items 

       inner join se_project_products on
       se_project_order_items.productId = se_project_products.id

       where se_project_order_items.userId = "1" 
       order by orderId asc;



START TRANSACTION; 
insert into se_project_orders values ('5b880667-bc4f-49a2-a554-93c8f3350073', 1,1, 3467); 
insert into se_project_order_items (orderId, userId, productId) 
values 
('5b880667-bc4f-49a2-a554-93c8f3350073', 1, 1),
('5b880667-bc4f-49a2-a554-93c8f3350073', 1, 2),
('5b880667-bc4f-49a2-a554-93c8f3350073', 1, 3); 
COMMIT;

select * from se_project_user where id=1;