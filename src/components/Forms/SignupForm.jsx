'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

export default function SignupForm() { 
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(""); // Password verification state

  const navigate = useNavigate();
  const { showToast } = useToast();

  async function register(e) {
    e.preventDefault();

    try {
      const signupData = {
        email,
        username, 
        password,
        passwordVerify,
      };

      await axios.post(`${axios.defaults.serverURL}/auth/`, signupData); // Change endpoint to signup
      showToast('Signup successful!');
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.errorMessage || 'An error occurred during signup', 'errorMessage');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email, username, and password to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={register}>
          <div className="grid gap-2 pb-4">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username" 
                value={username} // Username input
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div className="grid gap-2 pt-4">
              <Label htmlFor="passwordVerify">Verify Password</Label>
              <Input 
                id="passwordVerify" 
                type="password" 
                value={passwordVerify} 
                onChange={(e) => setPasswordVerify(e.target.value)}
                />
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
