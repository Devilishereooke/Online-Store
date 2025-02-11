import { Button, Container, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../myComps/ProductCard.jsx'

const homePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])
  
  return (
    <Container maxW={'3xl'} py={12} >
      <VStack gap={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={10}
          w={'full'}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>
        
        {products.length === 0 && (
          <Text
            fontSize={20}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            No Products Found 😢 {" "}
            <Link to={'/create'} >
              <Text
                as={'span'}
                fontSize={20}
                fontWeight={'bold'}
                color={'blue.500'}
                display={'inline'}
                _hover={{ textDecoration: 'underline' }}
              >
                Add a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default homePage
