
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLogo from '@/assets/lbc-logo.png';


const LoginFormComponent = () => {

    const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!emailAddress || !password) {
            setError("Username and password are required.");
            toast.error("Username and password are required.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { emailAddress, password });
            if (response.status === 200) {
                toast.success("Login successful!");
                navigate("/dashboard");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <img src={MainLogo} alt="Logo" className="main-logo" />
          <CardTitle className="text-2xl text-center">Account Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  className="form-input"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type="password"
                  className="form-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600"
        
              >
                Login
              </Button>
            </div>
            {error && <div className="mt-2 text-center text-red-500">{error}</div>}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginFormComponent