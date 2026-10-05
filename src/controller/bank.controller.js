import {
    createAccount,
    listAccounts,
    getAccount,
    deposit,
} from "../services/bank.service.js";

export async function handleCreateAccount(options) {
    const account = await createAccount(options.name);

    console.log("Account created successfully.");
    console.log(account);
};

export async function handleListAccounts() {
    const accounts = await listAccounts();

    console.log(accounts)
};

export async function handleGetAccount(options) {
    const account = await getAccount(options.account);
    console.log("")
    console.log(account)
};

export async function handleDeposit(options) {
    const account = await deposit(
        options.account,
        Number(options.amount)
    );

    console.log("Deposit successful.")
}