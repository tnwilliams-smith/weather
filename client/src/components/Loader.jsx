import { CircularProgress, Stack, Typography } from "@mui/material";

export const Loader = ({ message = 'Loading' }) => {
  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      <CircularProgress size='20px' />
      <Typography variant='body' color='primary'>
        {message}
      </Typography>
    </Stack>
  );
}
