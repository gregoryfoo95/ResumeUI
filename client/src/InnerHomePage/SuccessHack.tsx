import React, { useState, useEffect } from "react";

export default function SuccessHack(): JSX.Element {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 transform -translate-x-1/2 alert alert-success animate-slide-in-and-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Successfully infiltrated!</span>
        </div>
      )}
    </>
  );
}
