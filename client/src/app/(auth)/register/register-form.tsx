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
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/config"


const RegisterForm = () => {
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(data: RegisterBodyType) {
        const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
        console.log("result", result)
    }

    return (
        <Card className="w-full sm:max-w-md px-4">
            <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Tên đăng nhập
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type="text"
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
                <FieldGroup>
                    <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Nhập lại mật khẩu
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
                    Đăng ký
                </Button>
            </Field>
        </Card>
    )
}

export default RegisterForm