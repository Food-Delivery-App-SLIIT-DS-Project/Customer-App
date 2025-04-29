function convertToSubcurrency(amount: number, factor = 250) {
    return Math.round(amount * factor);
}
  
export default convertToSubcurrency;