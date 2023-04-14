import React from "react";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../config";
import "firebase/firestore";
import { Link } from "react-router-dom";

function TokenDataComponent({ data }) {
  const sortedData = Object.fromEntries(
    Object.entries(data).sort()
  );

  const children = Object.entries(sortedData).map(([k, v]) => {
    if (k.includes("Identity") || k.includes("Hash")) {
      let link = "/verify/" + v;
      return React.createElement(
        "div",
        {
          key: k,
          className:
            "flex w-fit text-lg rounded hover:scale-105  hover:text-white hover:bg-teal-100 transition-all select-none px-3",
        },
        React.createElement(
          "div",
          { key: k + v, className: "p-1 text-green-900" },
          k,
          ":-"
        ),
        React.createElement(
          Link,
          {
            key: k,
            to: link,
            className: "underline text-blue-700 ml-1 font-bold p-1",
          },
          v
        )
      );
    }
    if (
      !k.includes("Photo") &&
      !k.includes("photo") &&
      !k.includes("signature")
    ) {
      return React.createElement(
        "div",
        {
          key: k,
          className:
            "flex w-fit text-lg rounded hover:scale-105  hover:text-white hover:bg-teal-100 transition-all select-none px-3",
        },
        React.createElement(
          "div",
          { key: k, className: "p-1 text-green-900" },
          k,
          ":-"
        ),
        React.createElement(
          "div",
          { key: k + v, className: "ml-1 font-bold p-1 text-red-900" },
          v
        )
      );
    }
  });

  return React.createElement("div", { className: "contexCon" }, children);
}

function Token() {
  const routeParams = useParams();
  const [tokenData, setTokenData] = useState(<div />);
  const [tokenVerify, setTokenVerify] = useState("");

  async function calculateHash(message) {
    let str = JSON.stringify(message);
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex.substring(0, 32);
  }

  async function readId() {
    const docRef = db.collection("blockchain").doc(routeParams.id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTokenData(<TokenDataComponent data={doc.data()} />);
          const sortedData = Object.fromEntries(
            Object.entries(doc.data()).sort()
          );
          delete sortedData.tokenid;
          calculateHash(sortedData).then((hash) => {
            if (hash === doc.data().tokenid) {
              setTokenVerify(true);
            } else {
              setTokenVerify(false);
            }
          })
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  
  
  useEffect(() => {
    readId();
  }, [routeParams.id]);

  return (
    <div>
      <Header />
      <div className="m-5">{tokenData}</div>
      <div className="m-5 text-center text-2xl font-bold select-none">
        {tokenVerify === "" ? null : tokenVerify === true ? (
          <div className="text-green-600 inline-flex group relative">
            <span className="absolute top-10 scale-0 transition-all rounded bg-gray-200 p-2 text-sm text-black group-hover:scale-100">
              Using SHA-256 hashing algorithm
            </span>
            Verification Passed
            <div className="italic ml-1 ">✓</div>
          </div>
        ) : (
          <div className="text-red-600 inline-flex group relative">
            <span className="absolute top-10 scale-0 transition-all rounded bg-gray-200 p-2 text-sm text-black group-hover:scale-100">
              Using SHA-256 hashing algorithm
            </span>
            Verification Failed
            <div className="italic ml-1 ">X</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Token;
