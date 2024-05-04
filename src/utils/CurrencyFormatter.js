const currencyCode = 'IDR'; // Modify as needed
const currencyPosition = 'left'; // Modify as needed
const maxFractionDigits = 2;
const decimalSeparator = ',';
const thousandSeparator = '.';

const CurrencyFormatter = (value) => {
  if (
    value === 0 ||
    value === null ||
    value === undefined ||
    value === '0' ||
    typeof value !== 'number'
  ) {
    return '0';
  }

  const formattedValue = value.toFixed(maxFractionDigits);

  const [integerPart, decimalPart] = formattedValue.split('.');
  const integerFormatted = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator,
  );

  let result;
  if (decimalPart && Number(decimalPart) > 0) {
    result = `${integerFormatted}${decimalSeparator}${decimalPart}`;
  } else {
    result = integerFormatted;
  }

  return result;
};

export default CurrencyFormatter;
