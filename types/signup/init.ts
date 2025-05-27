import z from 'zod'

export const InitSignupSchema = z.object({
    name: z.string().min(3, "name should atleast be three letters long"),
    email: z.string().email()
})

export type InitSignup = z.infer<typeof InitSignupSchema>