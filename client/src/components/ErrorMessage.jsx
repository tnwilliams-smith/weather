import { Alert, Box } from "@mui/material";

export const ErrorMessage = ({ message }) => {
  if (!message) { return null };
  return (
    <Box width="100%">
      <Alert severity="error" variant="outlined">{message}</Alert>
    </Box>
  );
}
