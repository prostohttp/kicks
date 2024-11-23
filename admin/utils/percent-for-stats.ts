export default (quantity: number): number => {
    let result;
    if (quantity >= 100) {
        result = 100;
    } else if (quantity >= 50 && quantity < 100) {
        result = 50;
    } else if (quantity >= 25 && quantity < 50) {
        result = 30;
    } else if (quantity < 25 && quantity > 0) {
        result = 10;
    } else {
        result = 0;
    }
    return result;
};
