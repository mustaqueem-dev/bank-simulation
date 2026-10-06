export function handleError(error) {
    if (error instanceof Error) {
        console.error(`[${error.code ?? "ERROR"}] ${error.message}`);
        return;
    }

    console.error("An unexpected error occured.")
}