import { Button, VStack } from "@chakra-ui/react";
import { Cart } from "../containers/Cart";
import { Address } from "../containers/address";
import { AddAddress } from "../containers/addAddress";
import { AddPayment } from "../containers/addPayment";
import { Payments } from "../containers/payments";

import {
  useCheckout,
  CART,
  ADDRESSES,
  ADD_NEW_ADDDRESS,
  ORDER_SUCCESSFULL,
  PAYMENTS,
  ADD_PAYMENT,
} from "../contexts/checkout";

const Index = () => {
  const { navigation } = useCheckout();

  function renderStepContent() {
    if (navigation === CART) return <Cart />;
    if (navigation === ADDRESSES) return <Address />;
    if (navigation === ADD_NEW_ADDDRESS) return <AddAddress />;
    if (navigation === ADD_PAYMENT) return <AddPayment />;
    if (navigation === PAYMENTS) return <Payments />;
  }

  return (
    <VStack pt="100px" maxW={"1000px"} mx="auto">
      {renderStepContent()}
    </VStack>
  );
};

export default Index;
