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

-- Payments
create table se_project_user_payment_methods(
    id int auto_increment primary key,
    userId int not null,
    cvv char(10) not null,
    card char(20) not null,
    expiry varchar(20) not null,

    FOREIGN KEY(userId) 
    REFERENCES se_project_user(id) 
    ON DELETE CASCADE
);

INSERT into se_project_user_payment_methods(
    userId, cvv, card, expiry
) values('1','121','11131213312','02/05');

select * from se_project_user_payment_methods;

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

Insert into se_project_products(name, description, inventory, price, discount_percent, image_link)
values
('Nike Air Jordan','Nike Air Jordan Retro 5 Blue Bird Master Qualitys', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/60a3a03d-c364-4a07-9dac-e4ffd4484c70?alt=media&token=584af0d9-62d8-4ec5-94d8-dc258428d8ea");

Insert into se_project_products(name, description, inventory, price, discount_percent, image_link)
values
('Air Jordan Retro 1','Air Jordan Retro 1 Low Chichago Blue Reverse Black Toe(Master Quality)', 10, 1200, 13, "https://cdn.bikayi.app/ci/images/aed74676-90b1-4014-8683-2ec978fe663f?alt=media&token=5822780a-28f7-4931-9062-ba68454b2320"),
('Nike Air Jordan Retro 1','Nike Air Jordan Retro 1 High Pine Green (Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/860aacd5-ea01-44c1-a446-7b441f555aa1?alt=media&token=3a327e77-86fb-4e1e-a80f-a5dc336dff60"),
('Air Jordan 36','Air Jordan 36 Black Cat(Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/a2056793-7c8a-4c83-9d7f-fc27a24b4175?alt=media&token=62db4a77-7a12-4f02-a646-0638a9d8306c"),
('Air Jordan 1','Air Jordan 1 Mid Paris(Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/92e22ed5-e77b-4823-94cd-bcaabdd406d0?alt=media&token=191fe4b6-6255-44a8-ba06-3acfc1bebd8c"),
('Travis Scott X AJ','Travis Scott X AJ 1 Black Phantom (Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/be678d1c-52f3-4c6c-88e0-13a911d7a6d9?alt=media&token=c9987e49-a75d-4e75-a3c1-d80e43ead197"),
('Jordan 5 Doernbecher','Jordan 5 Doernbecher DB(Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/3a607421-298c-48a5-8f94-1a91611a465e?alt=media&token=22e35711-e218-4f4c-8e7d-10505159bf22"),
('Air Jordan Retro 6','Air Jordan Retro 6 Mint Foam(Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/6fc85da4-cfc4-4c6a-8200-2432468e57e9?alt=media&token=66a111d8-09ea-4ff5-baa0-9cafcbb6a67d"),
('Air Jordan Retro 4','Air Jordan Retro 4 Motorsport Master Qualitys', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/96864c0f-d581-49f9-9106-83e78a10e98b?alt=media&token=4c8a2d9f-a330-47a6-99e0-b0508d89bf94"),
('Air Jordan Retro 7','Air Jordan Retro 7 Citrus (Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/99c1c6e4-a020-402e-9548-0ad1d2071ecd?alt=media&token=632b64cf-4a87-4d6b-91b0-51451c046d69"),
('Air Jordan 7PSG','Air Jordan 7PSG Paris Saint Germany(Master Quality)', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/a3248889-0fb9-4296-a1c2-c363983ab8d6?alt=media&token=5c3b1c57-5f3f-4c85-9ae9-2d447b4f0113"),
('Nike Airforce 1','Nike Airforce 1 "Reigning Champ"', 10, 1100, 13, "https://cdn.bikayi.app/ci/images/318a1e17-f0e0-4273-b351-efe6bbf281c7?alt=media&token=510878d3-9bdd-4959-81a1-ecfa9bb9e92d");


Insert into se_project_products(name, description, inventory, price, discount_percent, image_link)
values
('Abhishek pandu Nike Air','Nike Air Uptempo Black White Grey(Master Quality)', 10, 1200, 13, "https://cdn.bikayi.app/ci/images/e8ab1c43-2629-4310-941d-010798664f82?alt=media&token=f3f79091-76e1-42f4-958a-430ae52bd966");

Insert into se_project_products(name, description, inventory, price, discount_percent, image_link)
values
('Abhishek pandu Adidas Hoodie','Adidas Hoodie pair (Master Quality)', 10, 1200, 13, "https://cdn.bikayi.app/ci/images/f083b260-57f0-4440-845b-57b68c86bf85?alt=media&token=e27fd7ed-37b7-42b9-ac3b-e6b1513b9ee2");

select * from se_project_products;


-- Orders

create table se_project_orders (
    id varchar(255) primary key,
    userId int not null,
    addressId int not null,
    total_amount int not null,
    paymentMethodId int not null,

    FOREIGN KEY(userId) 
    REFERENCES se_project_user(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(addressId) 
    REFERENCES se_project_user_addresses(id) 
    ON DELETE CASCADE,

    FOREIGN KEY(paymentMethodId) 
    REFERENCES se_project_user_payment_methods(id) 
    ON DELETE CASCADE
);

select * from se_project_orders;

drop table se_project_orders;

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
    buyingPrice int not null,

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

drop table se_project_order_items;


select 
       se_project_products.name,
       se_project_products.description,
       se_project_products.price,
       se_project_products.image_link,
       se_project_order_items.buyingPrice
       from  se_project_order_items 

       inner join se_project_products on
       se_project_order_items.productId = se_project_products.id
       where orderId = "ddf-e";

-- details of single order item
select      
     se_project_products.name,
     se_project_products.description,
     se_project_products.price,
     se_project_products.image_link,
    se_project_order_items.buyingPrice,

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

insert into se_project_orders values('ddfs-e', 1, 1,3000, 1);
-- for loop
insert into se_project_order_items(orderId, userId, productId, buyingPrice)
values('ddfs-e', 1, 1, 400);
insert into se_project_order_items(orderId, userId, productId, buyingPrice)
values('ddfs-e', 1, 2, 500);

COMMIT;
-- Single order end


-- Single order
START TRANSACTION;
  
insert into se_project_orders values('refdfsss12', 1, 1,4343,1);
-- for loop
insert into se_project_order_items(orderId, userId, productId, buyingPrice)
values
('refdfsss12', 1, 3, 500),
('refdfsss12', 1, 2, 500);

COMMIT;


-- get all order items for a user
select se_project_order_items.id, 
       orderId,
       se_project_products.name,
       se_project_products.description,
       se_project_order_items.buyingPrice as price,
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
