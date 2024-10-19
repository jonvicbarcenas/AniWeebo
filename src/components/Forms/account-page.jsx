import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '../../context/ToastContext'; 
import AuthContext from '../../context/authContext';
import Loader from './../screens/Loader';

export function AccountPage() {
  const [avatarOptions, setAvatarOptions] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { username: authUsername } = useContext(AuthContext);

  useEffect(() => {
    if (authUsername) {
      axios.get(`${axios.defaults.serverURL}/auth/profile`)
        .then(response => {
          setCurrentUser(response.data);
          setUsername(response.data.username || "");

          // Set the selectedAvatar to the user's current avatar
          const userAvatarUrl = `${axios.defaults.serverURL}/avatars/${response.data.avatar}`;
          setSelectedAvatar(userAvatarUrl);
          setCurrentAvatarUrl(userAvatarUrl);
        })
        .catch(error => {
          console.error("Error fetching user profile:", error);
        });

      axios.get(`${axios.defaults.serverURL}/list`)
        .then(response => {
          setAvatarOptions(response.data);
        })
        .catch(error => {
          console.error("Error fetching avatars:", error);
        });
    }
  }, [authUsername]);

  useEffect(() => {
    if (authUsername == null) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [authUsername]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      showToast("Passwords do not match", "errorMessage");
      return;
    }

    const avatarFilename = selectedAvatar.split('/').pop();

    const updatedProfile = {
      username: username || currentUser.username,
      avatar: avatarFilename,
    };

    if (password) {
      updatedProfile.password = password;
    }

    axios.put(`${axios.defaults.serverURL}/auth/profile`, updatedProfile)
      .then(response => {
        console.log("Profile updated successfully", response.data);
        setError("");
        showToast("Profile updated successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        const errorMessage = error.response?.data?.errorMessage || "Failed to update profile";
        setError(errorMessage);
        showToast(errorMessage, "errorMessage");
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (!authUsername) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Please Login</CardTitle>
            <CardDescription>You need to be logged in to view this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your account information here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center mb-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={selectedAvatar} alt="Selected avatar" />
                <AvatarFallback>
                  {avatarOptions.findIndex(avatar => avatar.url === selectedAvatar) + 1}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <Label>Choose an Avatar</Label>
              <RadioGroup
                value={selectedAvatar}
                onValueChange={setSelectedAvatar}
                className="flex flex-wrap gap-4">
                {avatarOptions.map((avatar, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={avatar.url} id={`avatar-${index}`} className="sr-only" />
                    <Label
                      htmlFor={`avatar-${index}`}
                      className={`cursor-pointer rounded-full overflow-hidden border-2 transition-colors ${
                        selectedAvatar === avatar.url ? 'border-primary' : 'border-transparent hover:border-primary'
                      }`}>
                      <Avatar className={`${selectedAvatar === avatar.url ? 'w-24 h-24' : 'w-16 h-16'}`}>
                        <AvatarImage src={avatar.url} alt={`Avatar option ${index + 1}`} />
                        <AvatarFallback>{index + 1}</AvatarFallback>
                      </Avatar>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder={currentUser?.username || "Enter your new username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}