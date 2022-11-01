// import styles from '../styles/Home.module.css'
import {Products} from "../containers/Products"
import { VStack } from "@chakra-ui/react"

export default function Home() {
  return (
    <VStack pt="130px" px="20px">
      <Products/>
    </VStack>
  )
}
