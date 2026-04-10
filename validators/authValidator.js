const { z } = require('zod');

const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

module.exports = {
  signUpSchema,
  loginSchema
};

// why do we need to create schemas?