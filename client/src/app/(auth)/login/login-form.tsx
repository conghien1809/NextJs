"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Card,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/config"
import { toast } from "sonner"


const LoginForm = () => {
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginBodyType) {
        try {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(async (res) => {
                const payload = await res.json()
                const data = {
                    status: res.status,
                    payload
                }
                if (!res.ok) {
                    throw data
                }
                return data
            })
            toast("Thành công", {
                description: result.payload.message,
            })
        } catch (error: any) {
            const status = error.status as number

            if (status === 422) {
                const errorData = error.payload.errors as {
                    field: string
                    message: string
                }[]

                errorData.forEach((err) => {
                    form.setError(err.field as keyof LoginBodyType, {
                        type: "server",
                        message: err.message,
                    })
                })
            } else {
                toast("Lỗi", {
                    description: error.payload.message,
                })
            }
        }
    }

    return (
        <Card className="w-full sm:max-w-md px-4">
            <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>

                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Nhập Mật khẩu
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type="password"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
            <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Đặt lại
                </Button>
                <Button type="submit" form="form-rhf-input">
                    Đăng nhập
                </Button>
            </Field>
        </Card>
    )
}

export default LoginForm