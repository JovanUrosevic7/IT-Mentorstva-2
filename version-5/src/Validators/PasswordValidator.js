
export const PasswordValidator = {
    required: true,
    validate: {
        trimCheck: value => value.trim() !== "" || "Password cannot be empty or space only"
    }
}

