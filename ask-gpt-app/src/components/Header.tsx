import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Ask GPT – Your AI Assistant
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
