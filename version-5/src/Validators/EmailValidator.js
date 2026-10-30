
const invailEmailAddress = [
  "admin@gmail.com",
  "test@gmail.com"
]

export const EmailValidator = {
  required: "Email is required",
  
  pattern: {
      value: /^[a-z0-9._%+-]+@gmail.com$/,
      message: "Invalid email address",
  },
  
  minLength:{
    value: 10,
    message: "Password must be at least 10 characters long"
  },

  validate:{
    invailEmailAddress: value =>  !invailEmailAddress.includes(value) || "This email is invalid"
  }

}
