import { VStack, Image, HStack, Text, Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useCheckout, ADDRESSES, ADD_PAYMENT} from "../../contexts/checkout";
import { useRouter } from "next/router";
import {useCart} from "../../contexts/cart"

export const Payments = () => {
  const { fetchUserpayments, payments } = useAuth();
  const [loading, setLoading] = useState(false);

  const { setNavigation } = useCheckout();
  const {setPaymentMethodId} = useCart()

  const [selectedPayment, setSelectedPayment] = useState();

  useEffect(() => {
    (async () => {
      if (!payments.isFetched) {
        setLoading(true);
        await fetchUserpayments();
        setLoading(false);
      }
    })();
  }, []);

  const navigateToAddPayments = () => setNavigation(ADD_PAYMENT);

  const navigateToAddresses = ()=>{
    setNavigation(ADDRESSES)
    setPaymentMethodId(selectedPayment)
  }

  return (
    <VStack border={"1px solid #e8e8e8"} p={"32px"}>
      <VStack w={"536px"} alignItems={"flex-start"} justifyContent={"center"}>
        {payments.data?.map((payment: any) => (
          <HStack
            cursor={"pointer"}
            bg={payment.id === selectedPayment ? "#0c4ff7" : "#e8e8e8"}
            p={"10px"}
            borderRadius={"12px"}
            onClick={() => setSelectedPayment(payment.id)}
            w={"100%"}
          >
            <Image src="/icons/radio.svg" />
            <Image src="/icons/visa.svg" />
            <HStack>
              <Box
                width={"10px"}
                height={"10px"}
                borderRadius={"50%"}
                bg={"black"}
              />
              <Box
                width={"10px"}
                height={"10px"}
                borderRadius={"50%"}
                bg={"black"}
              />
              <Box
                width={"10px"}
                height={"10px"}
                borderRadius={"50%"}
                bg={"black"}
              />
              <Box
                width={"10px"}
                height={"10px"}
                borderRadius={"50%"}
                bg={"black"}
              />
            </HStack>
            <Text fontWeight={600}>{payment.card.substr(-4)}</Text>
          </HStack>
        ))}
        <HStack cursor={"pointer"}>
          <Image src="/icons/plus.svg" />
          <Text
            color={"#257CB5"}
            fontWeight={600}
            onClick={navigateToAddPayments}
          >
            Add New Card
          </Text>
        </HStack>

        {selectedPayment && (
          <Button
            onClick={navigateToAddresses}
            bg={"#0c4ff7"}
            color={"white"}
            fontSize={"22px"}
            w="100%"
          >
            Continue
          </Button>
        )}
      </VStack>
    </VStack>
  );
};
