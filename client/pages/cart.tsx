import { Button, VStack } from "@chakra-ui/react";
import { Cart } from "../containers/Cart";
import { Address } from "../containers/address";
import { useCheckout } from "../contexts/checkout";

const Index = () => {
  const { navigation, backNavigation } = useCheckout();

  function renderStepContent() {
    if (navigation === 0) return <Cart />;
    if (navigation === 1) return <Address />;
  }

  return (
    <VStack pt="100px" maxW={"1000px"} mx="auto">
      {navigation !== 0 && <Button onClick={backNavigation}>Back</Button>}
      {renderStepContent()}
    </VStack>
  );
};

export default Index;
