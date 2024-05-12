import dayjs from 'dayjs';


// Export a function to format a Unix timestamp
export const formatUnixDate = (unixTimestamp: number) => {
      // Use dayjs to parse the Unix timestamp and format it as DD-MM-YYYY HH:mm A
    return dayjs.unix(unixTimestamp).format('DD-MM-YYYY HH:mm A');
  };