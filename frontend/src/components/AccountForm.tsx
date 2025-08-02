import { Account } from "@/models/Account";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAccount as removeAccountAction,
  updateAccount as updateAccountAction,
} from "@/store/slices/accounts-slice";
import { addAccount as saveAccountApi } from "@/api/account-api";
import { useState, useEffect } from "react";
import { useEmailSocket } from "@/hooks/useEmailSocket";

interface AccountFormProps {
  index: number;
  canRemove: boolean;
}

function AccountForm({ index, canRemove }: AccountFormProps) {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.accounts.accounts[index]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectSocket, setConnectSocket] = useState(false); // controls WebSocket activation

  const updateAccount = (updated: Partial<Account>) => {
    dispatch(updateAccountAction({ index, updated }));
  };

  const removeAccount = () => {
    dispatch(removeAccountAction(index));
  };

  const handleSave = async () => {
    if (!account) return;
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      await saveAccountApi(account);
      setSaved(true);
      setConnectSocket(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save account.");
    } finally {
      setSaving(false);
    }
  };

  useEmailSocket(connectSocket ? account.host : null);

  if (!account) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Account #{index + 1}</h3>
        {canRemove && (
          <button
            onClick={removeAccount}
            className="text-red-500 hover:underline text-sm"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Host */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
          <input
            type="text"
            value={account.host}
            onChange={(e) => updateAccount({ host: e.target.value })}
            className= " text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="imap.gmail.com"
          />
        </div>

        {/* Port */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
          <input
            type="number"
            value={account.port}
            onChange={(e) => updateAccount({ port: parseInt(e.target.value) })}
            className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={account.user}
            onChange={(e) => updateAccount({ user: e.target.value })}
            className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="your.email@domain.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={account.password}
            onChange={(e) => updateAccount({ password: e.target.value })}
            className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* TLS */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id={`tls-${index}`}
            checked={account.tls}
            onChange={(e) => updateAccount({ tls: e.target.checked })}
            className=" mr-2 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor={`tls-${index}`} className="text-sm font-medium text-gray-700">
            Enable TLS
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-4 flex gap-2 items-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {saving ? "Saving..." : "Save Account"}
        </button>
        {saved && <span className="text-green-600 text-sm">Saved!</span>}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </div>
  );
}

export default AccountForm;
