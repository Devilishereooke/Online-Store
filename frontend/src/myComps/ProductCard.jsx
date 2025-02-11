import { useColorModeValue } from "../components/ui/color-mode";
import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "../components/ui/toaster";
import { Button } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "@chakra-ui/react";

function ProductCard({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("grey.700", "grey.100");
  const bgColor = useColorModeValue("white", "gray.800");
  const { deleteProduct, setNewProduct, products, updateProduct } = useProductStore();

  const handleDeleteClick = async () => {
    const { success, message } = await deleteProduct(product._id);
    if (!success) {
      toaster.create({
        title: "Error Occurred",
        description: message,
        type: "error",
        duration: 2000,
      });
    } else {
      toaster.create({
        title: "Product Deleted Successfully",
        description: message,
        type: "success",
        duration: 2000,
      });
    }
  };

  const handleUpdateClick = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (!success) {
      toaster.create({
        title: "Error Occurred",
        description: message,
        type: "error",
        duration: 2000,
      });
    } else {
      toaster.create({
        title: "Product Updated Successfully",
        description: message,
        type: "success",
        duration: 2000,
      });
    }
  }


  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all .3s"}
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={"h2"} size={"xl"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"md"} color={textColor} mb={4}>
          {product.price}$
        </Text>

        <HStack gap={3}>
          <IconButton
            aria-label="Edit Product"
            size={"xs"}
            colorPalette={"cyan"}
          >
            {/* <LiaEdit /> */}
            <DialogRoot>
              <DialogTrigger asChild>
                <LiaEdit />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                  >
                    <Input
                      value={updatedProduct.name}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                      name="name"
                      variant="outline"
                      borderColor={"gray.400"}
                      mb={3}
                    />
                    <Input
                      value={updatedProduct.price}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                      name="price"
                      variant="outline"
                      borderColor={"gray.400"}
                      mb={3}
                    />
                    <Input
                      value={updatedProduct.imageUrl}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
                      name="image"
                      variant="outline"
                      borderColor={"gray.400"}
                      mb={3}
                    />
                  </Box>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <DialogActionTrigger asChild>
                    <Button onClick={handleUpdateClick}>Update</Button>
                  </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </IconButton>

          <IconButton
            aria-label="Delete Product"
            size={"xs"}
            colorPalette={"red"}
            onClick={handleDeleteClick}
          >
            <RiDeleteBin6Line />
          </IconButton>
        </HStack>
        <Toaster />
      </Box>
    </Box>
  );
}

export default ProductCard;
