import React, { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const ManageAccount = () => {
    const {user} = useUser();
    const { signOut } = useClerk();
    
    const [tab, setTab] = useState('profile');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState({ text: "", type: "" });
    const [confirmDelete, setConfirmDelete] = useState('');
    const [showVerifyBox, setShowVerifyBox] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
    }, [user])

    if (!user) return <p>Loading...</p>

    const showMessage = (text, type='success', duration = 4000) => {
        setMessage({text, type});
        if (duration > 0) setTimeout(() => setMessage({text: "", type: ""}), duration);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const trimmedFirst = firstName?.trim() || '';
            const trimmedLast = lastName?.trim() || '';

            const noChange = trimmedFirst === (user.firstName || '')
            && trimmedLast === (user.lastName || '');

            if (noChange) {
                showMessage('No changes detected on your profile', 'info');
                return;
            }

            setLoading(true);

            await user.update({
                first_name: trimmedFirst || undefined,
                last_name: trimmedLast || undefined
            });

            showMessage('Profile updated successfully', 'success');
        } catch (error) {
            console.error('Update profile error', error);
            showMessage('Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
           if (!user?.passwordEnabled) {
            showMessage("Password updates are not available for this account.", "error");
            return;
            }
            await user.updatePassword({ newPassword: newPassword });
            showMessage("Password updated successfully", "success");
            setNewPassword("");

        } catch (error) {
            console.error(error);
            showMessage(' Failed to update password', 'error');
        }
    };

    const handleDeleteAccount = async () => {
        if (confirmDelete !== "delete account") return;

        try {
        const emailAddress = user?.primaryEmailAddress;
        if (!emailAddress) throw new Error("No primary email found.");
        await emailAddress.prepareVerification({ strategy: "email_code" });

        setShowVerifyBox(true);
        showMessage("📩 Verification code sent to your email", "info");

        } catch (err) {
        console.error(err);
        showMessage("Failed to send verification code", "error");
        } finally {
            setConfirmDelete('');
        }
    };

    const handleVerifyCode = async () => {
        try {
        const emailAddress = user?.primaryEmailAddress;
        if (!emailAddress) throw new Error("No primary email found.");

        await emailAddress.attemptVerification({ code: otp });

        setIsVerified(true);
        showMessage("Email is verified. You can now delete account.", "success");
        } catch (err) {
        console.error(err);
        showMessage("Invalid code. Try again.", "error");
        } finally {
            setOtp('');
        }
    };

    const handleFinalDelete = async () => {
        try {

            const res = await fetch("/api/delete-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });

            if (!res.ok) throw new Error("Failed to delete user");

            await signOut();
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            showMessage("Failed to delete account", "error");
        }
    };


  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h2>

        <div className="flex mb-6 space-x-4 border-b">
            <button onClick={() => setTab('profile')}
            className={`py-2 px-4 ${tab === 'profile' ? 'border-b-2 border-[#54201c] text-[#54201c]': 'text-gray-600'}`}>
                Profile
            </button>
            <button onClick={() => setTab('security')}
            className={`py-2 px-4  ${tab === 'security' ? 'border-b-2 border-[#54201c] text-[#54201c]': 'text-gray-600'}`}>
                Security
            </button>
        </div>

        {message.text && 
        <p className={` mb-4 ${message.type === 'error'? 'text-red-600' 
        : message.type === 'info'? 'text-yellow-600' : 'text-green-600'}`}>
            {message.text}
        </p>}

        {/* Profile Tab */}
        {tab === 'profile' && (
            <div className="space-y-6">
                <div>
                    <p className="text-gray-600">Primary Email</p>
                    <p className="text-black font-medium">
                        {user?.primaryEmailAddress?.emailAddress || 'No email'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600">Connected Accounts</p>
                    {user?.externalAccounts?.length > 0 ? (
                        <ul className="list-disc ml-6">
                            {user.externalAccounts.map((account) => (
                                <li key={account.id}>
                                    {account.provider} - {account.externalId}
                                </li>
                            ))}
                        </ul>
                    ): (
                        <p className="text-gray-500">None</p>
                    )}
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <input 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="First Name"
                    />
                    <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Last Name" 
                    />

                    <button 
                    type="submit"
                    className="w-full bg-[#54201c] text-white py-2 rounded-lg">
                        Update Profile
                    </button>
                </form>
            </div>
        )}
        {/* Security Tab */}
        {tab === 'security' && (
            <div className="space-y-6">
                <form
                onSubmit={handleChangePassword}
                className="space-y-4"
                >
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="New Password" />
                    <button
                    type="submit"
                    className="w-full bg-[#54201c] text-white py-2 rounded-lg"
                    >
                        Change Password
                    </button>
                </form>

                {/* Active Devices (Mocked) */}
                <div>
                    <h3 className="text-lg font-semibold">Active Devices</h3>
                    <ul className="list-disc ml-6 text-gray-700">
                        <li>Chrome on Windows (This device)</li>
                        <li>iPhone Safari (Last used 2 days ago)</li>
                    </ul>
                </div>

                {/* Delete Account */}
                <div>
                    <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        This action is permanent and cannot be undone.
                    </p>
                    <input 
                    type="text"
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    placeholder='Type "delete account" to confirm'
                    className="w-full px-4 py-2 border rounded-lg"
                    />
                    <button
                    onClick={handleDeleteAccount}
                    className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg"
                    disabled={confirmDelete !== 'delete account'}
                    >
                        Send Verification Code
                    </button>

                    {/* Verification popup */}
                    {showVerifyBox && (
                        <div className="mt-4 p-4 border border-yellow-500 rounded-lg bg-yellow-50">
                            {!isVerified ? (
                                <>
                                    <p className="text-yellow-800">
                                        Enter the 6-digit code sent to your email:
                                        <strong>{user?.primaryEmailAddress?.emailAddress}</strong>
                                    </p>
                                    <input 
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full mt-2 px-4 py-2 border rounded-lg"
                                    maxLength={6} 
                                    placeholder="Enter verification code"
                                    />
                                    <button onClick={handleVerifyCode}
                                    className="mt-3 bg-[#54201c] text-white py-2 px-4 rounded w-full">
                                        Verify Code
                                    </button>
                                </>
                            ) : (
                                <button
                                onClick={handleFinalDelete}
                                className="mt-3 bg-red-600 text-white py-2 px-4 rounded w-full"
                                >
                                    Permenantly Delete Account
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default ManageAccount;
