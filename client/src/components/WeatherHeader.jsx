import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import cloudyday from "../assets/cloudy-day.svg";

const WeatherLogo = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  width: 'clamp(32px, 10vw, 70px)',
}));

const WeatherTitle = styled(Typography)(({ theme }) => ({
  color: "#777777",
  fontFamily: "'Electrolize', sans-serif",
  fontSize: 'clamp(1.5rem, 8vw, 4rem)',
}));

export const WeatherHeader = () => {
  return (
    <Stack
      alignItems="center"
      component="header"
      direction="row"
      justifyContent="center"
      spacing={{ xs: 1, sm: 2}}
    >
      <WeatherLogo
        alt="weather-logo"
        src={cloudyday}
      />
      <WeatherTitle variant="h1">
        weather
      </WeatherTitle>
    </Stack>
  );
}
