"use client";

import { EmailStatus } from "@/models/Email";
import { Mail } from "lucide-react";
import { useFilteredEmails } from "@/hooks/useFilteredEmails";

export const EmailList = () => {
  const emails = useFilteredEmails();

  const getStatusColor = (status: EmailStatus) => {
    const colors = {
      Interested: "bg-green-100 text-green-800 border-green-200",
      "Meeting Booked": "bg-blue-100 text-blue-800 border-blue-200",
      "Not Interested": "bg-red-100 text-red-800 border-red-200",
      Spam: "bg-gray-100 text-gray-800 border-gray-200",
      "Out of Office": "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[status];
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {emails.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No emails found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {emails.map((email) => (
              <div
                key={email.account}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg mb-2">{email.subject}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{email.text}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          email.category
                        )}`}
                      >
                        {email.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
