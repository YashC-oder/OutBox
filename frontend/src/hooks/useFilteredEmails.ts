import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { searchEmails } from "@/api/email-api";
import { setEmails } from "@/store/slices/emails-slice";

export const useFilteredEmails = () => {
  const dispatch = useDispatch();

  const emails = useSelector((state: RootState) => state.emails.filteredEmails);
  const activeFilter = useSelector((state: RootState) => state.filters.activeFilter);
  const searchQuery = useSelector((state: RootState) => state.filters.searchQuery);
  const selectedFolder = useSelector((state: RootState) => state.emails.selectedFolder);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const filters = {
          category: activeFilter === "All" ? undefined : activeFilter,
          folder: selectedFolder || undefined,
          account: searchQuery || undefined,
        };

        const emails = await searchEmails(filters);
        dispatch(setEmails(emails));
      } catch (error) {
        console.error("Failed to fetch emails", error);
      }
    };

    fetchEmails();
  }, [activeFilter, searchQuery, selectedFolder, dispatch]);

  return emails;
};
