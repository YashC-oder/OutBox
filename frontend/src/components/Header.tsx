"use client";
import { RootState } from "@/store";
import { Mail, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export function Header() {
  const router = useRouter();
  const filteredEmails = useSelector((state: RootState) => state.emails.filteredEmails);

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Inbox</h1>
          <p className="text-gray-600 mt-1">{filteredEmails.length} emails</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => router.push("/accounts")}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-900"
        >
          <Settings className="h-4 w-4" />
          <span>Account</span>
        </button>
      </div>
    </div>
  );
}
