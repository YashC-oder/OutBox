"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addAccount } from "@/store/slices/accounts-slice";
import AccountForm from "../../../components/AccountForm";

export default function AccountSettings() {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const dispatch = useDispatch();

  const handleAddAccount = () => {
    dispatch(
      addAccount({
        host: "",
        port: 993,
        tls: true,
        user: "",
        password: "",
      })
    );
  };

  return (
    <div>
      {accounts.map((_, index: number) => (
        <AccountForm
          key={index}
          index={index}
          canRemove={accounts.length > 1}
        />
      ))}
      <button
        onClick={handleAddAccount}
        className="bg-blue-600 text-white px-4 py-2 my-2 rounded hover:bg-blue-700"
      >
        + Add Another Account
      </button>
    </div>
  );
}
