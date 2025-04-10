import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook that fetches the list of available years
 *
 * @returns {Object} Query result containing:
 *   - data: Array of available years for weather data
 *   - isLoading: Loading state for the query
 *   - error: Error object if the query failed
 *
 * The hook:
 * - Handles timeouts (504 errors) with specific error messages
 * - Parses string responses to JSON when needed
 * - Provides a fallback empty array if data is missing
 */
export const useGetAvailableYears = () => {
  return useQuery({
    queryKey: ['years'],
    queryFn: () => fetch('https://u406ruqhf4.execute-api.eu-west-1.amazonaws.com/WeatherYears/weather/availableyears').then((res) => {
      if (res.status === 504) {
        throw new Error('Request timed out fetching available years (Gateway Timeout)');
      }
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    }),
    select: (data) => {
      if (typeof data === 'string') {
        return JSON.parse(data || "[]");
      }
      return data || [];
    },
    staleTime: Infinity, // Manual refresh only.
  });
};
