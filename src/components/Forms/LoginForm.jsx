'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

export default function LoginForm() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  async function register(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post(`${axios.defaults.serverURL}/auth/login`, loginData);
      showToast('Log In successful!');
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.errorMessage || 'An error occurred during registration', 'errorMessage');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={register}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoCapitalize="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2 pt-4">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}