import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SsoCallback = () => {
    const { handleRedirectCallback } = useClerk();
    const navigate = useNavigate();

    useEffect(() => {
        const completeSignIn = async () => {
            try {
                await handleRedirectCallback();
                navigate('/');
            } catch (err) {
                console.error("OAuth callback error:", err);
                navigate('/login');
            }
    };
    completeSignIn();
}, [handleRedirectCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">
            Finishing sign-in...
        </p>
    </div>
  );
};

export default SsoCallback;