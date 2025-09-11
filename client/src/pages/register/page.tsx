import RegisterFormComponent from '@/components/auth/register-form'
const RegisterPage = () => {
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterFormComponent/> 
      </div>
    </div>  
  )
}

export default RegisterPage