import { Button, Heading, HStack, Avatar, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../../contexts/auth";
import { useCart } from "../../contexts/cart";
import {useCheckout} from "../../contexts/checkout"

export const Navigation = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { cart, restCart } = useCart();
  const {reset} = useCheckout();

  const handleLogout = ()=>{
    logout();
    restCart();
    reset()
  }

  return (
    <HStack
      borderBottom={"1px solid #e8e8e8"}
      position="fixed"
      w={"100vw"}
      py="25px"
      bg="white"
      justifyContent={"space-between"}
      px="15px"
      zIndex={1000}
    >
      <Link href={"/"}>
        <Heading>E-commerce</Heading>
      </Link>
      {isAuthenticated() ? (
        <HStack>
          <Link href={"/login"}>
            {" "}
            <HStack>
              <Avatar src="https://bit.ly/broken-link" />{" "}
              <Text fontSize={"19px"}>{currentUser.username} </Text>
            </HStack>
          </Link>
          <Link href={"/cart"}>
            <Button
              bg="#0c4ff7"
              color="white"
              _hover={{
                opacity: ".8",
              }}
            >
              <Image src="/icons/cart.svg" /> {cart.totalItem}
            </Button>
          </Link>
          <Link href={"/orders"}>
          <Button >orders</Button>
          </Link>
          <Button onClick={handleLogout}>Log out</Button>
        </HStack>
      ) : (
        <HStack>
          <Link href={"/login"}>
            {" "}
            <Button>Log in</Button>
          </Link>
          <Link href={"/signup"}>
          <Button>Sign up</Button>
          </Link>
        </HStack>
      )}
    </HStack>
  );
};
