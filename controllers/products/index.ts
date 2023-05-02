import { Request, Response, NextFunction } from "express";
import db from "../../db.config";
import { v4 as uuidv4 } from "uuid";
import * as errorResponse from "../../utils/errorResponse";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query(
      `select * from se_project_products;
       `
    );

    let mutatedResult: any[] = []
    
    result.forEach((item:any)=>{
      item["buyingPrice"] = Math.round(item.price * ( (100-item.discount_percent) / 100 ));
      mutatedResult.push(item);
    })

    res.status(200).json({
      success: true,
      data: mutatedResult,
    });
  } catch (error) {
    next(error);
  }
};

export const order = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  @ts-ignore
  const userId = req.user.id;
  const { totalAmount, items, addressId, paymentMethodId } = req.body;

  if (!totalAmount || !items || !addressId || !paymentMethodId) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }

  const orderId = uuidv4().toString();

  let command_1 = `insert into se_project_orders values ("${orderId}", ${Number(
    userId
  )}, ${Number(addressId)}, ${Number(totalAmount)}, ${Number(paymentMethodId)});`;
  let command_2 = `insert into se_project_order_items (orderId, userId, productId, buyingPrice) values `;

  items.forEach(
    (item: any) =>
      (command_2 += `("${orderId}", ${Number(userId)}, ${Number(item.id)}, ${Number(item.buyingPrice)}),`)
  );

  command_2 = command_2.substring(0, command_2.length - 1) + ";";

  try {
    await db.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.query(command_1);
      await transactionalEntityManager.query(command_2);
    });
    res.status(200).json({
      success: true,
      data: {
        message: `Order with id:${orderId} successfully placed `,
        orderId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const orderedItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  @ts-ignore
  const userId = req.user.id;

  try {
    let result = await db.query(
      `select se_project_order_items.id, 
      orderId,
      se_project_products.name,
      se_project_products.description,
      se_project_order_items.buyingPrice as price,
      se_project_products.image_link
      from  se_project_order_items 

      inner join se_project_products on
      se_project_order_items.productId = se_project_products.id

      where se_project_order_items.userId = "${userId}" 
      order by orderId asc;`
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const getOrderedItemDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  const {orderItemId} = req.body;

  if (!orderItemId) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }

  try {
    const details = await db.query(`select      
    se_project_products.name,
    se_project_products.description,
    se_project_order_items.buyingPrice as price,
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

    and se_project_order_items.id = ${orderItemId};`)

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    next(error);
  }
}

export const getOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orderId } = req.body;

  if (!orderId) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }

  try {
    const order = await db.query(`
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
    and se_project_orders.id = "${orderId}";`);

    const items = await db.query(`select 
      se_project_products.name,
      se_project_products.description,
      se_project_order_items.buyingPrice as price,
      se_project_products.image_link
       from  se_project_order_items 

      inner join se_project_products on
      se_project_order_items.productId = se_project_products.id
      where orderId = "${orderId}";`);

    res.status(200).json({
      success: true,
      data: {
        order,
        items
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;
  const { itemId } = req.body;

  if (!itemId) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }

  try {
    await db.query(
      `Insert into se_project_user_cart(userId, productId)
        values('${userId}','${itemId}');
          `
    );

    res.status(200).json({
      success: true,
      data: `Item with id: ${itemId} successfully added to cart`,
    });
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;
  const { itemId } = req.body;

  if (!itemId) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }

  try {
    await db.query(
      `delete from se_project_user_cart where userId = ${userId} AND productId= ${itemId};`
    );

    res.status(200).json({
      success: true,
      data: `Item with id: ${itemId} successfully removed from cart`,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;

  try { 
    const result = await db.query(`select se_project_products.id,
        se_project_products.name,
        se_project_products.description,
        se_project_products.inventory,
        se_project_products.price,
        se_project_products.discount_percent,
        se_project_products.image_link
    from se_project_user_cart

    inner join se_project_products 
    on se_project_user_cart.productId = se_project_products.id
    and se_project_user_cart.userId = ${userId};`);


    let mutatedResult: any[] = []
    result.forEach((item:any)=>{
      item["buyingPrice"] = Math.round(item.price * ( (100-item.discount_percent) / 100 ));
      mutatedResult.push(item);
    })

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
