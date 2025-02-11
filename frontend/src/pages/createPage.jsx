import React from 'react'
import { Container, VStack , Heading, Box, Input, Button} from '@chakra-ui/react'
import { useColorModeValue } from '../components/ui/color-mode'
import {useProductStore} from '../store/product.js'
import {Toaster, toaster} from '../components/ui/toaster'

const createPage = () => {

  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    imageUrl: ""
  })  

  const {createProduct} = useProductStore()
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct)  
    if(!success){
      toaster.create({
        title: "Error Occurred",
        description: message,
        type: "error",
        duration: 2000
      })
    }else{
      toaster.create({
        title: "Product Added Successfully",
        description: message,
        type: "success",
        duration: 2000
      })
    }
  }

  return (
    <Container maxW={"lvh"} mt={10}>
      <VStack>
        <Heading fontSize={'4xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box w={'full'} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"}>
          <Input 
            placeholder="Product Name"  
            name='name'
            value={newProduct.name}
            variant="outline" 
            borderColor={"gray.400"}
            mb={3}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input 
            placeholder="Price"  
            name='price'
            value={newProduct.price}
            variant="outline" 
            borderColor={"gray.400"}
            mb={3}
            onChange={(e) => setNewProduct({...newProduct, price:e.target.value})}
          />
          <Input 
            placeholder="Image URL"  
            name='image'
            value={newProduct.imageUrl}
            variant="outline" 
            borderColor={"gray.400"}
            mb={3}
            onChange={(e) => setNewProduct({...newProduct, imageUrl:e.target.value})}
          />
          <Button w={'full'} colorPalette={"cyan"} onClick={handleAddProduct}>
            Add Product
            <Toaster />
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default createPage