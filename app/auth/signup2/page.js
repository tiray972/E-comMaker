"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function CompleteProfile() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [agency, setAgency] = useState(""); // Specific to Agent
  const [rera, setRera] = useState(""); // Specific to Agent
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userDocRef = doc(db, "users", authUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || "");
          setSurname(userData.surname || "");
          setPhone(userData.phone || "");
          setAgency(userData.agency || "");
          setRera(userData.rera || "");
          if (userData.role) {
            router.push("/dashboard");
          }
        }
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!role) {
      setError("Please select a role.");
      setIsLoading(false);
      return;
    }


    try {
      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, {
        role,
        name,
        surname,
        phone,
        ...(role === "agent" && { agency, rera }), // Save agency and RERA for agents only
      });

      console.log("Profile updated successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while saving your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Complete Your Profile</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Surname"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="">Choose your role</option>
              {/* <option value="client">Client</option> */}
              <option value="agent">Agent</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          {role === "agent" && (
            <>
              <div>
                <label htmlFor="agency" className="block text-sm font-medium text-gray-700">
                  Agency
                </label>
                <input
                  id="agency"
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="Your agency name"
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="rera" className="block text-sm font-medium text-gray-700">
                  RERA n°
                </label>
                <input
                  id="rera"
                  type="text"
                  value={rera}
                  onChange={(e) => setRera(e.target.value)}
                  placeholder="Your RERA number"
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
