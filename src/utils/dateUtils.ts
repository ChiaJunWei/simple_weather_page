import dayjs from 'dayjs';

export const formatIsoDate = (isoString: string) => {
    return dayjs(isoString).format('DD-MM-YYYY HH:mm A');
  };

  export const formatUnixDate = (unixTimestamp: number) => {
    return dayjs.unix(unixTimestamp).format('DD-MM-YYYY HH:mm A');
  };