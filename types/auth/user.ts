import z from 'zod'

export const InitSignupSchema = z.object({
    name: z.string().min(3, "name should atleast be three letters long"),
    email: z.string().email()
})

export type InitSignup = z.infer<typeof InitSignupSchema>

export const setPasswordSchema = z.object({
    password: z.string()
        .min(8, "Password should be of atleast 8 characters")
        .regex(/[a-z]/, "Must include a lowercase alphabet")
        .regex(/[A-Z]/, "Must include a uppercase alphabet")
        .regex(/[0-9]/, "Must include a number")
        .regex(/[^a-zA-Z0-9]/, "Must include a special character")
})

export type SetPassword = z.infer<typeof setPasswordSchema>

export interface ResponseSchema {
    status: number;
    data: {
        msg: string
    }
}