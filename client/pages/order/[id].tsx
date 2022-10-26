import { useRouter } from "next/router";
import { Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <VStack pt="100px" maxW={"1000px"} mx="auto">
      <Heading>wdshu</Heading>
      <VStack>
        <Heading>Order placed</Heading>
        <Heading>Order id: {id}</Heading>
        <Link href={"/orders"}>
          <Button
            type="submit"
            w="100%"
            fontSize={"22px"}
            _hover={{
              opacity: ".8",
            }}
            py={"30px"}
            mt={"80px"}
          >
            See Orders
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};

export default Post;
