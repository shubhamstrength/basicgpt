import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 6,
        py: 2,
        borderTop: '1px solid #ddd',
        fontSize: '0.9rem',
        color: 'gray',
      }}
    >
      <Typography variant="body2">
        Made with ❤️ by Shubham
      </Typography>
    </Box>
  );
};

export default Footer;
