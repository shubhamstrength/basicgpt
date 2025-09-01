import { Flex, Heading, Spacer, IconButton, useColorMode, Tooltip } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex as="header" align="center" py={4} px={6} boxShadow="sm" bg="white" _dark={{ bg: 'gray.800' }}>
      <Heading size="md">Ask GPT (RAG)</Heading>
      <Spacer />
      <Tooltip label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}>
        <IconButton
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
        />
      </Tooltip>
    </Flex>
  )
}
