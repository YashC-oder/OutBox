"use client";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/slices/filters-slice";
import {
  setSelectedFolder,
  setSelectedCategory,
} from "@/store/slices/emails-slice";
import { Search, Filter } from "lucide-react";
import { useFilter } from "@/hooks/useFilter";

export const FilterSideBar = () => {
  const dispatch = useDispatch();
  const {
    categoryOptions,
    folderOptions,
    getCategoryCount,
    getFolderCount,
    searchQuery,
    selectedCategory,
    selectedFolder,
  } = useFilter();

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by account..."
            className="text-gray-900 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>

        {/* Categories */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="font-semibold text-gray-900">Categories</span>
          </div>

          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-50 text-blue-700 border-blue-200 border"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">{cat}</span>
              <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Folders */}

        {folderOptions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="font-semibold text-gray-900">Folders</span>
            </div>

            {folderOptions.map((folder) => (
              <button
                key={folder}
                onClick={() => dispatch(setSelectedFolder(folder))}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedFolder === folder
                    ? "bg-blue-50 text-blue-700 border-blue-200 border"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium">{folder}</span>
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {getFolderCount(folder)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
