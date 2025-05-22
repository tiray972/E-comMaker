"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // User redirection
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth"; // Added signUpWithEmail function
import { db } from "@/lib/firebase/firebase"; // Firestore config
import { doc, setDoc, getDoc } from "firebase/firestore";
// import Header from "@/components/header";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Password confirmation
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Function to save user to Firestore
  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid); // Reference to the user document in Firestore
      const userSnap = await getDoc(userDocRef); // Check if the user already exists in Firestore

      if (!userSnap.exists()) {
        // If the user doesn't exist in Firestore, create them
        const newUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User", // Take the user's name or a default name
          createdAt: new Date(), // Creation date
        };

        await setDoc(userDocRef, newUser); // Add the document to Firestore
        console.log("User added to Firestore:", newUser);
      } else {
        console.log("User already exists in Firestore:", userSnap.data());
      }
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  // Function to handle sign-up via email and password
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Check for empty fields
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password); // Sign up with email and password
      console.log("Sign-up successful:", user);

      // Save the user to Firestore
      await saveUserToFirestore(user);

      // Redirect to the dashboard or another page
      router.push("/app/auth/signup2");
    } catch (error) {
      console.error("Sign-up error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle sign-up via Google
  const handleGoogleSignUp = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await signInWithGoogle(); // Sign in with Google
      console.log("Google sign-up successful:", user);

      // Save the user to Firestore
      await saveUserToFirestore(user);

      // Redirect to the dashboard or another page
      router.push("/app/auth/signup2");
    } catch (error) {
      console.error("Google sign-up error:", error);
      setError("An error occurred during Google sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      {/* <Header /> */}
      <div
        className="min-h-[90vh] flex items-center bg-contain bg-center justify-center bg-gray-100"
        style={{ backgroundImage: 'url("/images/background-signup.png")' }}
      >
        <div>
          <form
            onSubmit={handleSignUp}
            className="space-y-4 flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-96"
          >
            <CircleUserRound className="text-center text-teal-400" size={90} />
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 w-full rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded w-full mt-2"
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up with Google"}
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-4">
            <Link href={"/en/auth/login"} className="text-sm underline text-teal-600">
              Already registered? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
