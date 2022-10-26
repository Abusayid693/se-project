import { Button, VStack } from "@chakra-ui/react";
import { Cart } from "../containers/Cart";
import { Address } from "../containers/address";
import { AddAddress } from "../containers/addAddress";

import {
  useCheckout,
  CART,
  ADDRESSES,
  ADD_NEW_ADDDRESS,
  ORDER_SUCCESSFULL
} from "../contexts/checkout";

const Index = () => {
  const { navigation } = useCheckout();

  function renderStepContent() {
    if (navigation === CART) return <Cart />;
    if (navigation === ADDRESSES) return <Address />;
    if (navigation === ADD_NEW_ADDDRESS) return <AddAddress />;
  }

  return (
    <VStack pt="100px" maxW={"1000px"} mx="auto">
      {renderStepContent()}
    </VStack>
  );
};

export default Index;
