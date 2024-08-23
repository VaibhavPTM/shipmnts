import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const ViewTable = () => {
  const [viewType, setViewType] = useState(null);
  const [data, setData] = useState([]);

  const handleViewClick = async (type) => {
    setViewType(type);
    try {
      const response = await axios.get(`${baseUrl}/${type}`);
      setData(response.data.Data);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    }
  };

  useEffect(() => {
    if (viewType) {
      handleViewClick(viewType);
    }
  }, [viewType]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="mb-4 mt-20">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleViewClick("authors")}
        >
          View Author
        </button>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleViewClick("books")}
        >
          View Book
        </button>
      </div>

      {viewType === "authors" && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Author Details</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((author, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{author.name}</td>
                  <td className="border px-4 py-2">{author.email}</td>
                  <td className="border px-4 py-2">{author.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewType === "books" && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Book Details</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">ISBN Code</th>
                {/* <th className="border px-4 py-2">Author Id</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((book, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{book.name}</td>
                  <td className="border px-4 py-2">{book.isbn_code}</td>
                  {/* <td className="border px-4 py-2">{book.authorId}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTable;
