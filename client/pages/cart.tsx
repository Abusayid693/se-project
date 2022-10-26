import { VStack } from "@chakra-ui/react"
import {Cart} from "../containers/Cart"

const Index = ()=>{
    return (
        <VStack pt="100px" maxW={"1000px"} mx="auto">
        <Cart/>
        </VStack>
    )
}

export default Index