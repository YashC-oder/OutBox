import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilteredEmails} from "@/store/slices/emails-slice";
import { EmailStatus } from "@/models/Email";

export const useFilter = () => {
  const dispatch = useDispatch();

  const { emails, selectedCategory, selectedFolder } = useSelector(
    (state: RootState) => state.emails
  );
  const { searchQuery } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    let filtered = emails;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((email) => email.category === selectedCategory);
    }

    if (selectedFolder) {
      filtered = filtered.filter((email) => email.folder === selectedFolder);
    }

    if (searchQuery) {
      filtered = filtered.filter((email) =>
        email.account.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    dispatch(setFilteredEmails(filtered));
  }, [emails, selectedCategory, selectedFolder, searchQuery, dispatch]);

  const categoryOptions: (EmailStatus | "All")[] = [
    "All",
    "Interested",
    "Meeting Booked",
    "Not Interested",
    "Spam",
    "Out of Office",
  ];

  const folderOptions = Array.from(new Set(emails.map((email) => email.folder)));

  const getCategoryCount = (category: EmailStatus | "All") => {
    if (category === "All") return emails.length;
    return emails.filter((email) => email.category === category).length;
  };

  const getFolderCount = (folder: string) => {
    return emails.filter((email) => email.folder === folder).length;
  };

  return {
    categoryOptions,
    folderOptions,
    getCategoryCount,
    getFolderCount,
    searchQuery,
    selectedCategory,
    selectedFolder
  };
};
