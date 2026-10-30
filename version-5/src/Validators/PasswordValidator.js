const invalidPassword = [
    "admin",
    "123456"
]


export const PasswordValidator = {
    required: true,
 
    validate: {
        trimCheck: value => value.trim() !== "" || "Password cannot be empty or space only",
        invalidPassword: value =>  !invalidPassword.includes(value) || "This password is invalid",
        capitalLetterCheck: value => /[A-Z]/.test(value) || "This password must include at least 1 capital letter",
        signLetterCheck: value => /[!@#$%]/.test(value) || "This password must include at least 1 sign (!@#$%)"

    },

    minLength:{
        value: 3,
        message: "Password must be at least 5 characters long"
    },
    
    maxLength:{
        value: 16,
        message: "Password cannot be more than 16 characters long"
    }
}

