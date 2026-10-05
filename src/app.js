import {
    handleCreateAccount,
    handleListAccounts,
    handleGetAccount,
    handleDeposit,
} from "./controller/bank.controller.js";

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
        default:
            console.log("Unknown command.")
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})