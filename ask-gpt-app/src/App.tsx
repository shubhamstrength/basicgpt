import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Paper
} from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askGPT = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setResponse(res.data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setResponse('Something went wrong. Check console for details.');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Ask GPT Anything
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ask a question"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={askGPT}
              disabled={loading || !input.trim()}
            >
              {loading ? <CircularProgress size={24} /> : 'Ask GPT'}
            </Button>
          </Box>
          {response && (
            <Box mt={2}>
              <Typography variant="h6">Response:</Typography>
              <Paper elevation={1} sx={{ p: 2, mt: 1, backgroundColor: '#f9f9f9' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {response}
                </Typography>
              </Paper>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default App;
