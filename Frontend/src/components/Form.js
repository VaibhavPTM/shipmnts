import React, { useState } from "react";

const UploadForm = () => {
  const [selectedOption, setSelectedOption] = useState("Book");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with:", selectedOption);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-80 mt-10"
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
  );
};

export default UploadForm;
