import moment from 'moment';
import { useLocale } from '../providers/LocaleProvider';

export const formatPhoneNumber = (phoneNumber: string) => {
  // Remove any existing hyphens or spaces
  phoneNumber = phoneNumber.replace(/[-\s]/g, '');

  // Insert a hyphen after every 4 digits
  phoneNumber = phoneNumber.replace(/(\d{4})(?=\d)/g, '$1-');

  return phoneNumber;
};

export const unformatPhoneNumber = (phoneNumber: string) => {
  // Remove all hyphens and spaces
  return phoneNumber.replace(/[-\s]/g, '');
};

export const formatDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.ceil(diffDays / 7);
  const diffMonths = Math.abs(
    today.getMonth() - date.getMonth() + 12 * (today.getFullYear() - date.getFullYear())
  );

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return `${diffDays} day ago`;
  } else if (diffDays >= 2 && diffDays <= 6) {
    return `${diffDays} days ago`;
  } else if (diffWeeks >= 1 && diffWeeks <= 3) {
    return `${diffWeeks} ${diffWeeks == 1 ? 'week' : 'weeks'} ago`;
  } else if (diffWeeks === 4) {
    return '1 month ago';
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

export const formatToPrice = (price?: number) => {
  // Check if price is undefined or null
  if (price === undefined || price === null) {
    return '0';
  }

  const parts = price.toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  let formattedNumber = integerPart;
  if (parts[1]) {
    formattedNumber += '.' + parts[1];
  }

  return formattedNumber;
};

export const unformatPrice = (formattedPrice: string): number => {
  // Remove all non-digit characters and decimal point
  const numericPart = formattedPrice.replace(/[^\d]/g, '');

  // Parse the cleaned string into an integer
  const numericValue = parseInt(numericPart, 10);

  return isNaN(numericValue) ? 0 : numericValue;
};

export const formatToChatRoomDate = (date: string) => {
  const { t, momentLocale } = useLocale();

  return momentLocale(date).calendar(null, {
    // When the date is closer, specify custom values
    lastWeek: 'DD MMM YYYY',
    lastDay: `[${t('utils.yesterday')}]`,
    sameDay: `[${t('utils.today')}]`,
    nextDay: 'DD MMM YYYY',
    nextWeek: 'DD MMM YYYY',
    // When the date is further away, use from-now functionality
    sameElse: 'DD MMM YYYY',
  });
};

export const formatToChatListDate = (date: string) => {
  const { t, momentLocale } = useLocale();

  return momentLocale(date).calendar(null, {
    // When the date is closer, specify custom values
    lastWeek: 'DD/MM/YY',
    lastDay: `[${t('utils.yesterday')}]`,
    sameDay: `[${t('utils.today')}]`,
    nextDay: 'DD/MM/YY',
    nextWeek: 'DD/MM/YY',
    // When the date is further away, use from-now functionality
    sameElse: 'DD/MM/YY',
  });
};

export const formatToAPIDate = (inputDate: string): string => {
  const parsedDate = moment(
    inputDate,
    ['DD/MM/YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'YYYY/MM/DD'],
    true
  );
  if (parsedDate.isValid()) {
    return parsedDate.format('YYYY-MM-DD');
  } else {
    // Handle invalid input date
    throw new Error('Invalid input date');
  }
};

export const formatToRupiah = (number: number) => {
  if (number >= 1000000000) {
    return `${(number / 1000000000).toFixed(1).replace('.0', '')} Milyar`;
  } else if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1).replace('.0', '')} Juta`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(1).replace('.0', '')} ribu`;
  } else {
    return `${number.toFixed(0)}`;
  }
};
