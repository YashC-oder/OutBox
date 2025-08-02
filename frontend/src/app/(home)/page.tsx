"use client";
import { EmailList } from "@/components/EmailList";
import { FilterSideBar } from "@/components/Filters";
import { Header } from "@/components/Header";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const EmailInbox = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <FilterSideBar />
        <EmailList/>
      </div>
    </>
  );
};

export default EmailInbox;
