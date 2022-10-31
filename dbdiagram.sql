//// -- LEVEL 1
//// -- Schemas, Tables and References
// These are fixed tables

Table countries_ship_to{
  id int
  country_name varchar
  country_code varchar
  created_at timestamp
  updated_at timestamp
}

Table allowed_payment_providers{
  id int
  provider_name varchar
  provider_code varchar
  created_at timestamp
  updated_at timestamp
}

// Creating tables
// You can define the tables with full schema names
Table merchants {
  id int
  merchant_name varchar
  
  created_at timestamp
  updated_at timestamp
 
}

Table product_category {
  id int
  category_name varchar
  created_at timestamp
  updated_at timestamp
}


Table products {
  id int
  name varchar
  description varchar
  regular_price integer
  
  merchants_id int
  product_category_id int
  
  created_at timestamp
  updated_at timestamp
}

 Ref: products.merchants_id > merchants.id 
 Ref: products.product_category_id > product_category.id 
 
// If schema name is omitted, it will default to "public" schema.
Table users as U {
  id int [pk, increment] // auto-increment
  full_name varchar
  email varchar
  phone varchar
  created_at timestamp
  updated_at timestamp
}

Table shipping_addresses {
  id int [pk, increment] // auto-increment
  user_id int pk
  address_line1 varchar
  
  city varchar
  pincode varchar
  country_code int 
  created_at timestamp
  updated_at timestamp
}

Table user_payments {
  id int [pk, increment] // auto-increment
  user_id int pk
  card_no varchar
  expiry_date date
  provider_id int // only supported provider
  created_at timestamp
}

 Ref: shipping_addresses.user_id > U.id 
 Ref: user_payments.user_id > U.id 
 Ref: user_payments.provider_id > allowed_payment_providers.id 
 
 Ref: shipping_addresses.country_code > countries_ship_to.id 


// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one; <> many-to-many
// Ref: U.country_code > countries.code  

Table orders{
  id int
  user_id int
  shipping_address int
  payment_methoid int
  order_total int
  quantity int
  order_date datetime
  created_at timestamp
  updated_at timestamp
}

Table order_products{
  id int
  product_id int
  order_id int
}

Ref: order_products.product_id > products.id
Ref: order_products.order_id > orders.id

 Ref: orders.user_id > U.id
 Ref: orders.shipping_address > shipping_addresses.id
 Ref: orders.payment_methoid > user_payments.id
 
 