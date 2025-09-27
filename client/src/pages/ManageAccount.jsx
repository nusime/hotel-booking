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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        
        // Try to get firstName and lastName from multiple sources
        const userFirstName = user.firstName || user.unsafeMetadata?.firstName || '';
        const userLastName = user.lastName || user.unsafeMetadata?.lastName || '';
        
        setFirstName(userFirstName);
        setLastName(userLastName);
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

            const currentFirstName = user.firstName || user.unsafeMetadata?.firstName || '';
            const currentLastName = user.lastName || user.unsafeMetadata?.lastName || '';
            
            const noChange = trimmedFirst === currentFirstName && trimmedLast === currentLastName;

            if (noChange) {
                showMessage('No changes detected on your profile', 'info');
                return;
            }

            // Check account type and provide specific guidance
            const isOAuthAccount = user?.externalAccounts?.length > 0;
            const hasPassword = user?.passwordEnabled;
            const oauthProviders = user?.externalAccounts?.map(acc => acc.provider).join(', ') || '';

            if (isOAuthAccount && !hasPassword) {
                showMessage(`This account was created using ${oauthProviders}. Profile updates must be done through your ${oauthProviders} account settings, then refresh this page.`, 'error');
                return;
            }

            setLoading(true);

            // Try updating using unsafeMetadata as fallback
            try {
                await user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        firstName: trimmedFirst,
                        lastName: trimmedLast
                    }
                });
                await user.reload();
                showMessage('Profile updated successfully in metadata', 'success');
            } catch (metadataError) {
                // If metadata update fails, try direct field update
                try {
                    const updateData = {};
                    if (trimmedFirst !== currentFirstName) updateData.firstName = trimmedFirst || null;
                    if (trimmedLast !== currentLastName) updateData.lastName = trimmedLast || null;

                    if (Object.keys(updateData).length > 0) {
                        await user.update(updateData);
                        await user.reload();
                        showMessage('Profile updated successfully', 'success');
                    }
                } catch (directError) {
                    throw directError;
                }
            }
        } catch (error) {
            console.error('Update profile error:', error);
            
            // Provide specific error messages and solutions
            const isOAuthAccount = user?.externalAccounts?.length > 0;
            const oauthProviders = user?.externalAccounts?.map(acc => acc.provider).join(', ') || 'social login';
            
            if (isOAuthAccount) {
                showMessage(`Profile updates are restricted for ${oauthProviders} accounts. Please update your name in your ${oauthProviders} account settings, then sign out and sign back in to see the changes here.`, 'error');
            } else if (error.message?.includes('not a valid parameter') || error.status === 422) {
                showMessage('Profile updates are currently disabled for this account. This may be due to your Clerk configuration settings. Contact support if you need to update your profile.', 'error');
            } else {
                showMessage('Failed to update profile. Please try again later or contact support.', 'error');
            }
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

            if (!currentPassword.trim()) {
                showMessage("Please enter your current password", "error");
                return;
            }

            if (!newPassword.trim()) {
                showMessage("Please enter a new password", "error");
                return;
            }

            if (currentPassword === newPassword) {
                showMessage("New password must be different from current password", "error");
                return;
            }

            if (newPassword.length < 8) {
                showMessage("New password must be at least 8 characters long", "error");
                return;
            }

            setLoading(true);

            // Use Clerk's updatePassword method with current password verification
            await user.updatePassword({
                currentPassword: currentPassword,
                newPassword: newPassword
            });

            showMessage("Password updated successfully", "success");
            setCurrentPassword("");
            setNewPassword("");

        } catch (error) {
            console.error(error);
            if (error.errors && error.errors.length > 0) {
                const errorCode = error.errors[0].code;
                const errorMessage = error.errors[0].longMessage || error.errors[0].message;
                
                if (errorCode === 'session_reverification_required') {
                    showMessage('For security, please sign out and sign back in, then try changing your password again.', 'error');
                } else if (errorMessage.toLowerCase().includes('current') || errorMessage.toLowerCase().includes('incorrect') || errorMessage.toLowerCase().includes('invalid')) {
                    showMessage('Current password does not match', 'error');
                } else if (errorMessage.toLowerCase().includes('password')) {
                    showMessage(errorMessage, 'error');
                } else {
                    showMessage('Failed to update password', 'error');
                }
            } else if (error.message?.includes('current_password') || error.message?.includes('incorrect') || error.message?.includes('invalid')) {
                showMessage('Current password does not match', 'error');
            } else if (error.message?.includes('reverification')) {
                showMessage('For security, please sign out and sign back in, then try changing your password again.', 'error');
            } else {
                showMessage('Failed to update password', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        console.log("handleDeleteAccount called");
        console.log("confirmDelete:", confirmDelete);
        console.log("user:", user);

        if (confirmDelete !== "delete account") {
            console.log("Confirmation text doesn't match");
            return;
        }

        if (!user || !user.id) {
            console.log("No user or user.id found");
            showMessage("User not found. Please refresh the page.", "error");
            return;
        }

        try {
            setLoading(true);
            showMessage("Deleting account...", "info");

            console.log("Attempting to delete user:", user.id);

            // Call server endpoint to delete user using Clerk admin API
            console.log("Making fetch request to http://localhost:3000/api/delete-user");
            let response;
            try {
                response = await fetch('http://localhost:3000/api/delete-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.id }),
                });
                console.log("Response received:", response);
            } catch (networkError) {
                console.error("Network error:", networkError);
                throw new Error("Unable to connect to server. Please check if the server is running.");
            }

            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            let result;
            try {
                result = await response.json();
                console.log("Response result:", result);
            } catch (parseError) {
                console.error("JSON parse error:", parseError);
                throw new Error("Invalid response from server");
            }

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to delete account');
            }

            console.log("User deleted successfully from server");

            // Sign out after successful deletion
            await signOut();

            console.log("User signed out, redirecting to home");

            // Redirect to home page
            window.location.href = "/";
        } catch (err) {
            console.error("Delete account error:", err);

            // Show error message
            showMessage(err.message || "Failed to delete account. Please try again.", "error");
        } finally {
            setLoading(false);
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
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Current Password"
                    required />
                    <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="New Password (min 8 characters)"
                    required />
                    <button
                    type="submit"
                    className="w-full bg-[#54201c] text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Updating Password...
                            </>
                        ) : (
                            'Change Password'
                        )}
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
                        This action is permanent and cannot be undone. Your account will be completely deleted.
                    </p>
                    <input
                    type="text"
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    placeholder='Type "delete account" to confirm'
                    className="w-full px-4 py-2 border rounded-lg mb-3"
                    />
                    <button
                    onClick={() => {
                        console.log("Delete button clicked");
                        handleDeleteAccount();
                    }}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={confirmDelete !== 'delete account' || loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Deleting Account...
                            </>
                        ) : (
                            'Delete Account Permanently'
                        )}
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default ManageAccount;
