import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaPrint,
  FaExclamationTriangle,
} from "react-icons/fa";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Import the worker as a URL

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error) {
    console.error("Error while loading document:", error);
    setError(
      "Failed to load PDF. Please check if the file exists and try again."
    );
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume Viewer</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => window.open(pdfUrl, "_blank")}
              className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
            >
              <FaDownload />
              <span>Download</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
            >
              <FaPrint />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {error ? (
            <div className="flex flex-col items-center justify-center h-96 text-red-500">
              <FaExclamationTriangle className="text-5xl mb-4" />
              <p className="text-xl text-center">{error}</p>
            </div>
          ) : (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="flex justify-center"
              loading={
                <div className="flex justify-center items-center h-96">
                  <p className="text-xl text-gray-500">Loading PDF...</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-lg"
                loading={
                  <div className="flex justify-center items-center h-96">
                    <p className="text-xl text-gray-500">Loading page...</p>
                  </div>
                }
              />
            </Document>
          )}
        </div>

        {!error && numPages && (
          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className="flex items-center space-x-2 text-indigo-600 disabled:text-gray-400"
            >
              <FaChevronLeft />
              <span>Previous</span>
            </button>

            <p className="text-gray-600">
              Page {pageNumber} of {numPages}
            </p>

            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="flex items-center space-x-2 text-indigo-600 disabled:text-gray-400"
            >
              <span>Next</span>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {!error && numPages && (
        <div className="mt-6 flex items-center space-x-4">
          <button
            onClick={() => setScale((scale) => Math.max(1, scale - 0.5))}
            className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
          >
            Zoom Out
          </button>
          <button
            onClick={() => setScale((scale) => Math.min(2.5, scale + 0.5))}
            className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
          >
            Zoom In
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
