import { VStack } from "@chakra-ui/react"
import {Orders} from "../containers/orders"

const Index  = ()=>{
    return (
        <VStack pt="100px" maxW={"1000px"} mx="auto">
         <Orders/>
      </VStack>
    )
}

export default Index