import {
    handleCreateAccount,
    handleListAccounts,
    handleGetAccount,
    handleDeposit,
    handleWithdraw,
    handleTransfer,
    handleTransactions,
    handleDeleteAccount,
    handleGetBalance,
} from "./controller/bank.controller.js";
import { handleError } from "./errors/error-handler.js";

const command = process.argv[2];

const options = {};

for (let i = 3; i < process.argv.length; i += 2) {
    const key = process.argv[i]?.replace("--", "");
    const value = process.argv[i + 1];

    options[key] = value;
};

async function main() {
    switch (command) {
        case "create":
            await handleCreateAccount(options);
            break;
        case "list":
            await handleListAccounts(options);
            break;
        case "get":
            await handleGetAccount(options);
            break;
        case "deposit":
            await handleDeposit(options);
            break;
        case "withdraw":
            await handleWithdraw(options);
            break;
        case "transfer":
            await handleTransfer(options);
            break;
        case "transactions":
            await handleTransactions(options);
            break;
        case "delete":
            await handleDeleteAccount(options);
            break;
        case "balance":
            await handleGetBalance(options);
            break;
        default:
            console.log("Unknown command.")
    }
}

main().catch((error) => {
    handleError(error);
    process.exitCode = 1;
})