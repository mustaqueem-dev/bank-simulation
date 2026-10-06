import { AppError } from "../errors/app-error.js";

export function requireOptions(options, name) {
    if (
        options[name] === undefined || 
        options[name] === null ||
        options[name] === ""
    ) {
        throw new AppError(
            "MISSING_OPTIONS",
            `Missing required options: --${name}`
        )
    };

    return options[name]
}