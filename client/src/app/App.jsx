import { Container, Stack } from "@mui/material";

import { ChartTypeSelector } from "../components/ChartTypeSelector";
import { YearGraph } from "../components/YearGraph";
import { YearSelector } from "../components/YearSelector";
import { WeatherHeader } from "../components/WeatherHeader";
import { WeatherProvider } from '../context/WeatherContext';
import { Providers } from "./Providers";

export const App = () => {
  return (
    <Providers>
      <Container maxWidth="lg" sx={{ minHeight: '100vh' }}>
        <Stack alignItems="center" spacing={3}>
          <WeatherHeader />
          <WeatherProvider>
            <YearSelector />
            <ChartTypeSelector />
            <YearGraph />
          </WeatherProvider>
        </Stack>
      </Container>
    </Providers>
  );
}
