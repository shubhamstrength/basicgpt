import { useState } from 'react'
import axios from 'axios'
import {
  Box, Button, Container, Heading, Textarea, VStack, Spinner, Text, Card, CardBody, useToast
} from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [sources, setSources] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const ask = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResponse('')
    setSources([])
    try {
      // Call your FastAPI backend
      const res = await axios.post('http://127.0.0.1:8000/ask', { question: input })
      setResponse(res.data.answer || '')
      setSources(res.data.sources || [])
    } catch (e: any) {
      console.error(e)
      toast({ status: 'error', title: 'Request failed', description: e?.message ?? 'Check console', isClosable: true })
      setResponse('Something went wrong. Check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Container maxW="3xl" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading size="lg">Ask anything from your knowledge base</Heading>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. What does the H2 FE plan include?"
            resize="vertical"
            minH="120px"
          />

          <Box textAlign="right">
            <Button colorScheme="purple" onClick={ask} isDisabled={loading || !input.trim()}>
              {loading ? <Spinner size="sm" /> : 'Ask'}
            </Button>
          </Box>

          {response && (
            <Card variant="outline" bg="white" _dark={{ bg: 'gray.800' }}>
              <CardBody>
                <Text fontWeight="semibold" mb={2}>Response</Text>
                <Text whiteSpace="pre-wrap">{response}</Text>
                {sources.length > 0 && (
                  <Box mt={4}>
                    <Text fontWeight="semibold" mb={1}>Sources</Text>
                    <VStack align="start" spacing={1}>
                      {sources.map((s, idx) => (
                        <Text key={idx} fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
                          • {s}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>
      <Footer />
    </>
  )
}
