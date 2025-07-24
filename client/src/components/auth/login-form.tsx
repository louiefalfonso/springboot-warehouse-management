
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

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!username || !password) {
            setError("Username and password are required.");
            toast.error("Username and password are required.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
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
    <div>LoginFormComponent</div>
  )
}

export default LoginFormComponent