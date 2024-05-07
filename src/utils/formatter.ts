export const formatCurrency = (number: number) => {
  return (
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      style: "currency",
      currency: "IDR"
    }).format(number)
  );
}

export const formatDecurrency = (currency: string) => {
  var k, temp;
  // Loop to make substring
  for(var i = 0; i < currency.length; i++){
    currency = currency.replace('.', "");
       
      // Getting Unicode value
      k = currency.charCodeAt(i);
       
      // Checking whether the character
      // is of numeric type or not
      if(k > 47 && k < 58){
           
          // Making substring
          temp = currency.substring(i);
          break;
      }
  }
   
  // If currency is in format like
  // 458, 656.75 then we used replace
  // method to replace every ', ' with ''
  temp = temp?.replace(/, /, '');
   
  // Converting string to float
  // or double and return
  return parseInt(temp ?? "0");
}