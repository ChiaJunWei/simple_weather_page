//Regex to only allow alphabets in input
export const formatInputToOnlyAlphabets = (inputValue: string) => {
  return inputValue.replace(/[^a-zA-Z\s]/g, '');
};

  //Uppercase the first letter of each word
  export const toTitleCase = (input: string) => {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  //Format temperature to display only whole number and append °C
  export const formatTemperature = (temperature: number) => {
    return `${temperature.toFixed(0)}°C`;
  };