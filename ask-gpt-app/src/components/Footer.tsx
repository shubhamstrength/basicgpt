import { Box, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" py={6} textAlign="center" color="gray.500" _dark={{ color: 'gray.400' }}>
      <Text>Made with ❤️ by Shubham</Text>
    </Box>
  )
}
