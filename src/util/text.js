export function formatMoney(moneyNumber) {
    const formatter = new Intl.NumberFormat('vi-VN');
    return {
        formatMoney: formatter.format(moneyNumber),
        moneyNumber: moneyNumber,
    }
}