/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { getWeatherApi } from '../api/weatherApi';
import { WeatherResponse } from '../../shared/typings';

const getCoordApiUrl='http://localhost:8000/weather'

const useWeatherQuery = (searchTerm: string) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const query = useQuery({
    queryKey: ['searchTerm', searchTerm],
    queryFn: async () => {
      setIsLoading(true);
      try {
        // const result = await getWeatherApi(searchTerm);
        const result = await fetch(`${getCoordApiUrl}/${searchTerm}`)
        const data:WeatherResponse = await result.json(); // Wait for JSON parsing
        setData(data);
        return data;
      } catch (err:any) {
        console.log('Error caught in useWeatherQuery: ', err)
        setError(err);
        // console.error('Error caught: ', err); // Add this line

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    enabled: !!searchTerm,     
     retry: 0,

  });

  return { data, isLoading, error, refetch: query.refetch };
};

export default useWeatherQuery;


