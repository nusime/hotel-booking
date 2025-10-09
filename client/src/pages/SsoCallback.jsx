import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SsoCallback = () => {
    const { handleRedirectCallback } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const [showRoleSelection, setShowRoleSelection] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const completeSignIn = async () => {
            try {
                await handleRedirectCallback();
                // Check if user has role in metadata
                const userRole = user?.unsafeMetadata?.role || user?.publicMetadata?.role;
                if (!userRole) {
                    setShowRoleSelection(true);
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error("OAuth callback error:", err);
                navigate('/login');
            }
        };
        completeSignIn();
    }, [handleRedirectCallback, navigate, user]);

    const handleRoleSubmit = async () => {
        if (!role) return;

        try {
            await user.update({
                unsafeMetadata: { role }
            });
            navigate('/');
        } catch (err) {
            console.error("Role update error:", err);
            navigate('/');
        }
    };

    if (showRoleSelection) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 font-playfair px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Choose Your Role
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Please select your role to continue.
                    </p>
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            onClick={() => setRole("user")}
                            className={`px-6 py-3 border border-[#316E6A] font-medium rounded-full ${
                                role === "user" ? "bg-[#316E6A] text-white" : "text-[#316E6A] hover:bg-[#316E6A] hover:text-white"
                            }`}
                        >
                            User
                        </button>
                        <button
                            onClick={() => setRole("hotelOwner")}
                            className={`px-6 py-3 border border-[#316E6A] font-medium rounded-full ${
                                role === "hotelOwner" ? "bg-[#316E6A] text-white" : "text-[#316E6A] hover:bg-[#316E6A] hover:text-white"
                            }`}
                        >
                            Hotel Owner
                        </button>
                    </div>
                    <button
                        onClick={handleRoleSubmit}
                        disabled={!role}
                        className="w-full bg-[#316E6A] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">
                Finishing sign-in...
            </p>
        </div>
    );
};

export default SsoCallback;