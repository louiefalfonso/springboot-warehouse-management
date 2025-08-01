import LoginFormComponent from '@/components/auth/login-form'
const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginFormComponent/>
      </div>
    </div>  
  )
}

export default Login