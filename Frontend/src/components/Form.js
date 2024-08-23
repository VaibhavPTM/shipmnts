import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { baseUrl } from "../baseUrl";

const UploadForm = () => {
  const [selectedOption, setSelectedOption] = useState("Book");
  const [file, setFile] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (
      fileExtension === "xls" ||
      fileExtension === "xlsx" ||
      fileExtension === "csv"
    ) {
      setFile(selectedFile);
    } else {
      alert("Please upload a file with .xls or .xlsx extension.");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a valid Excel file!");
      return;
    }

    const formData = new FormData();
    formData.append("option", selectedOption);
    formData.append("file", file);

    try {
      let response;
      if (selectedOption === "Book") {
        response = await axios.post(`${baseUrl}/books`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post(`${baseUrl}/authors`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="mt-20">
        <form
          className="bg-white p-6 rounded shadow-md w-80"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Option
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="book"
                name="option"
                value="Book"
                checked={selectedOption === "Book"}
                onChange={handleOptionChange}
                className="mr-2"
              />
              <label htmlFor="book" className="mr-4 text-gray-700">
                Book
              </label>

              <input
                type="radio"
                id="author"
                name="option"
                value="Author"
                checked={selectedOption === "Author"}
                onChange={handleOptionChange}
                className="mr-2"
              />
              <label htmlFor="author" className="text-gray-700">
                Author
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="file"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
