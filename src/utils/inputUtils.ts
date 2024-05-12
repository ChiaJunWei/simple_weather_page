// Export a function to format input to only allow alphabets and spaces
export const formatInputToOnlyAlphabets = (inputValue: string) => {
  // Use a regular expression to replace any non-alphabet characters (including numbers and special characters) with an empty string
  return inputValue.replace(/[^a-zA-Z\s]/g, '');
};

// Export a function to uppercase the first letter of each word
export const toTitleCase = (input: string) => {
  // Use a regular expression to find each word boundary (\b) and replace the first character (\w) with its uppercase equivalent
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Export a function to format temperature to display only whole number and append °C
export const formatTemperature = (temperature: number) => {
  // Use the toFixed method to round the temperature to the nearest whole number, and append °C to the result
  return `${temperature.toFixed(0)}°C`;
};