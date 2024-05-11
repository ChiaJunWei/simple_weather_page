//Regex to only allow alphabets in input
export const formatInputToOnlyAlphabets = (inputValue: string) => {
    return inputValue.replace(/[^a-zA-Z]/g, '');
  };