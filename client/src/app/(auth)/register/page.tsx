import RegisterForm from "./register-form";


export default function RegisterPage() {
    return (
        <div>
            <h1 className="text-xl font-bold text-center">Đăng ký</h1>
            <div className="flex justify-center">
                <RegisterForm />
            </div>
        </div>
    )
}