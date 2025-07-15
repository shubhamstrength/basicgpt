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

  const askRAG = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/ask', {
        question: input
      });
      setResponse(res.data.answer);
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
            Ask Shubham's Knowledge Assistant
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
              onClick={askRAG}
              disabled={loading || !input.trim()}
            >
              {loading ? <CircularProgress size={24} /> : 'Ask'}
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
