export function generateAccountNumber(accounts) {
    const nextNumber = accounts.length + 1;

    return `ACC_${String(nextNumber).padStart(3, "0")}`
};

// console.log(generateAccountNumber([]))