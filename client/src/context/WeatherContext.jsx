import { createContext, useContext, useState, useMemo } from "react";

import graphChartTypes from "../configs/graph-chart-types";

export const WeatherContext = createContext(null);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [chartType, setChartType] = useState(graphChartTypes.AVERAGE_MAX.key);
  const [selectedYears, setSelectedYears] = useState([]);

  const weatherContextValue = useMemo(() => ({
    chartType,
    setChartType,
    selectedYears,
    setSelectedYears,
  }), [chartType, selectedYears]);

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
