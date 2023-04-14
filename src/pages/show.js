import React from "react";
import Header from "../components/header";
import { useState, useEffect } from "react";
import { db } from "../config";
import "firebase/firestore";
import { Link } from "react-router-dom";

function ChainDataComponent({ data }) {
  // const children = React.createElement("div", { id: "id" }, "children");
  const children = [];
  let last = data.info.last;
  do {
    let link = "/verify/" + last;
    if (last !== "00000000000000000000000000000000") {
      console.log(data[last].type);
      children.push(
        React.createElement(
          "div",
          { key: last, className: "text-center" },
          React.createElement(
            "div",
            { className: "group relative" },
            React.createElement(
              "span",
              {
                className:
                  "absolute -top-14 w-2/5 opacity-80 right-10 scale-0 transition-all duration-75 rounded bg-gray-200 p-2 text-sm text-black group-hover:scale-100",
              },
              data[last].type + " token minted on " + data[last].timeStamp.replace(' GMT+0300 (East Africa Time)', '')
            ),
            React.createElement(
              Link,
              {
                to: link,
                className:
                  "underline text-blue-700 ml-1 font-bold p-1 border-solid rounded border-amber-600 border-2",
              },
              last
            )
          ),
          React.createElement(
            "div",
            { className: "p-1 text-amber-600 text-2xl" },
            "↑"
          )
        )
      );
    }
    last = data[last].previousHash;
  } while (last !== "00000000000000000000000000000000");
  
  return React.createElement("div", { className: "contexCon" }, children);
}

function Show() {
  const [showData, setShowData] = useState(<div />);
  async function pullData() {
    let chain = {};
    db.collection("blockchain")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          chain[doc.id] = doc.data();
        });
      })
      .then(() => {
        // console.log(chain);
        setShowData(<ChainDataComponent data={chain} />);
      });
  }

  useEffect(() => {
    pullData();
  }, []);

  return (
    <div>
      <Header />
      <div className="text-center mb-4 flex justify-center">
        <div className="w-24 h-24 flex flex-col justify-center items-center rounded-full bg-amber-600 text-white">
          Ending
        </div>
      </div>
      <div className="mx-5">{showData}</div>
      <div className="w-full inline-flex group relative text-center">
        <span className="absolute -top-4 w-2/5 opacity-80 right-10 scale-0 transition-all duration-75 rounded bg-gray-200 p-2 text-sm text-black group-hover:scale-100">
          This is not a block. Just the first hash value.
        </span>
        <div className="underline text-blue-700 ml-1 font-bold p-1 w-full">
          00000000000000000000000000000000
        </div>
      </div>
      <div className="text-center mb-4 flex justify-center">
        <div className="w-24 h-24 flex flex-col justify-center items-center rounded-full bg-amber-600 text-white">
          Beginning
        </div>
      </div>
    </div>
  );
}

export default Show;
