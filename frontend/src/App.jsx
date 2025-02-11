import React from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import Navbar from './myComps/Navbar.jsx'
import HomePage from './pages/homePage.jsx'
import CreatePage from './pages/createPage.jsx'
import { Routes, Route } from 'react-router-dom'
import { useColorModeValue } from './components/ui/color-mode.jsx'

function App() {

  return (
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
  )
}

export default App
