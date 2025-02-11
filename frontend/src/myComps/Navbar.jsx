import React from 'react'
import { Button, Container, Flex, Text, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PiPlusSquare } from 'react-icons/pi'
import { IoMdMoon } from "react-icons/io"
import { AiOutlineSun } from "react-icons/ai"
import { useColorMode, useColorModeValue } from '../components/ui/color-mode'

const Navbar = () => {

	const {colorMode, toggleColorMode} = useColorMode();

  return (
		<Container as="nav">
			<Flex
				h={16}
				align={"center"}
				justifyContent={"space-between"}
				flexDir={{ base: "column", md: "row" }}
			>
				<Text 
					fontSize={{ base: "2xl", sm: "3xl" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient= "to-l"
					gradientFrom={"cyan.400"}
					gradientTo={"blue.500"}
					bgClip={"text"}
				>
					<Link to={"/"}>Online Store 🛒</Link>
				</Text>

				<HStack>
					<Link to={"/create"}>
						<Button bg={useColorModeValue("gray.400", "gray.800")}>
							<PiPlusSquare style={{width: 24, color: 'white'}}/>
						</Button>
					</Link>
					<Button bg={useColorModeValue("gray.400", "gray.800")} onClick={toggleColorMode} >
						{colorMode === 'light' ? 
						<IoMdMoon style={{width: 24, color: 'white'}}/> :
						<AiOutlineSun style={{width: 24, color: 'white'}}/>}
					</Button>
				</HStack>
			</Flex>
		</Container>
  )
}

export default Navbar
