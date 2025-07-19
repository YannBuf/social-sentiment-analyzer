// src/pages/Account.tsx
import React from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Account = () => {
  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                johndoe@example.com
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={2}>
            <TextField label="Username" defaultValue="johndoe" fullWidth />
            <TextField label="Email" defaultValue="johndoe@example.com" fullWidth />
            <TextField label="Change Password" type="password" fullWidth />
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Account;
