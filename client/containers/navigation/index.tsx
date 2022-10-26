import { Button, Heading, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../../contexts/auth";

export const Navigation = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <HStack
      borderBottom={"1px solid #e8e8e8"}
      position="fixed"
      w={"100vw"}
      py="25px"
      bg="white"
      justifyContent={"space-between"}
      px="15px"
    >
      <Link href={"/"}>
        <Heading>E-commerce</Heading>
      </Link>
      {isAuthenticated() ? (
        <HStack>
          <Link href={"/login"}>
            {" "}
            <Button>{currentUser.username}</Button>
          </Link>
          <Button>Log out</Button>
        </HStack>
      ) : (
        <HStack>
          <Link href={"/login"}>
            {" "}
            <Button>Log in</Button>
          </Link>
          <Button>Sign up</Button>
        </HStack>
      )}
    </HStack>
  );
};
