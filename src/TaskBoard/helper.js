export function validateAndSanitizeInput(input) {
    if (!input || typeof input !== "string") {
        return { isValid: false, sanitized: "", error: "Invalid input" };
    }

    // Trim whitespace & remove special characters except basic punctuation
    const sanitizedInput = input.trim().replace(/[<>\/\\]/g, ""); 

    if (sanitizedInput.length === 0) {
        return { isValid: false, sanitized: "", error: "Input cannot be empty" };
    }

    return { isValid: true, sanitized: sanitizedInput, error: null };
}

// Example usage
// const userInput = "<script>alert('XSS')</script>";
// const result = validateAndSanitizeInput(userInput);
// console.log(result);
