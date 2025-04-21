import { object, string, type TypeOf } from "zod";

const body = object({
  email: string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email({
    message: "Invalid email address"
  }),
  password: string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
    .min(8, {
      message: "Password must be at least 8 characters long"
    })
    .max(100, {
      message: "Password must be less than 100 characters long"
    })
});

const registerUserSchema = {
  body
};

const loginWithEmailPasswordSchema = {
  body
};

type RegisterUserInput = TypeOf<typeof body>;
type LoginWithEmailPasswordInput = TypeOf<typeof body>;

export {
  registerUserSchema,
  type RegisterUserInput,
  loginWithEmailPasswordSchema,
  type LoginWithEmailPasswordInput
};
