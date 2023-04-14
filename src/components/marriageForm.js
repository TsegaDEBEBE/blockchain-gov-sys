import { useState, useEffect } from "react";
import { db } from "../config";
import "firebase/firestore";

import InputField from "./inputField";

function MarriageForm() {
  const [buttonText, setButtonText] = useState("Add Token");
  const [timeStamp, setTimeStamp] = useState(Date());
  const [formData, setFormData] = useState({
    type: "marriage",
    husbandIdentity: "",
    wifeIdentity: "",
    dateOfMarriage: "",
    dateOfIssue: "",
    husbandPhoto: "",
    wifePhoto: "",
    issuer: "9d6200de4e0a8d1f08beba0265dad5ac",
    previousHash: "",
  });
  useEffect(() => {
    setInterval(function () {
      setTimeout(setTimeStamp(Date()));
    }, 1000);
  });
  async function calculateHash(message) {
    let str = JSON.stringify(message);
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex.substring(0,32);
  }
  async function readHusbandPhoto(e) {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      await reader.readAsText(file);
      reader.onload = function (e) {
        var result = reader.result;
        setFormData({ ...formData, husbandPhoto: result });
      };
    }
  }
  async function readWifePhoto(e) {
    let file = e.target.files[0]
    if (file) {
      let reader = new FileReader();
      await reader.readAsText(file);
      reader.onload = function (e) {
        var result = reader.result;
        setFormData({ ...formData, wifePhoto: result });
      };
    }
  }
  function setDate(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function setHexValue(e) {
    let char = e.target.value[e.target.value.length - 1];
    if (
      (e.target.value.length <= 32) &&
      ((char >= "a" && char <= "f") ||
      (char >= "0" && char <= "9") || 
      (char === undefined))
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  } 
  return (
    <div className="max-w-2xl m-5 flex flex-col w-full p-5 sm:p-10 gap-2">
      <p className="text-2xl w-full text-center">Marriage Certificate Token</p>
      <InputField
        name="type"
        label="Token Type"
        type="text"
        value={formData.type}
        disabled={true}
      />
      <InputField
        name="husbandIdentity"
        label="Husband's Identity TokenID"
        type="text"
        value={formData.husbandIdentity}
        onChange={(e) => setHexValue(e)}
      />
      <InputField
        name="wifeIdentity"
        label="Wife's Identity TokenID"
        type="text"
        value={formData.wifeIdentity}
        onChange={(e) => setHexValue(e)}
      />
      <InputField
        name="dateOfMarriage"
        label="Date of Marriage"
        type="date"
        value={formData.dateOfMarriage}
        onChange={(e) => setDate(e)}
      />
      <InputField
        name="dateOfIssue"
        label="Date of Issue"
        type="date"
        value={formData.dateOfIssue}
        onChange={(e) => setDate(e)}
      />
      <InputField
        name="husbandPhoto"
        label="Husband's Photo"
        type="file"
        accept={"image/*"}
        onChange={(e) => {
          readHusbandPhoto(e);
        }}
      />
      <InputField
        name="wifePhoto"
        label="Wife's Photo"
        type="file"
        accept={"image/*"}
        onChange={(e) => {
          readWifePhoto(e);
        }}
      />
      <InputField
        name="issuer"
        label="Token Id of Government Representative"
        type="text"
        value={formData.issuer}
        disabled={true}
      />
      <InputField
        name="timestamp"
        label="Current Time Stamp"
        type="datetime"
        value={timeStamp}
        disabled={true}
      />
      <button
        className="peer w-full p-3 text-base rounded-lg border border-gray-400 focus:border-red-400 text-gray-600 bg-white focus:outline-none focus:ring-0 appearance-none transition-colors"
        disabled={buttonText === "Add Token" ? false : true}
        onClick={() => {
          let finalData = null;
          const infoDocRef = db.collection("blockchain").doc("info");
          infoDocRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                const previousHash = doc.data().last;
                let Data = Object.assign(
                  {},
                  formData,
                  { timeStamp: timeStamp },
                  { previousHash: previousHash }
                );                
                const sortedData = Object.fromEntries(
                  Object.entries(Data).sort()
                );
                calculateHash(sortedData)
                  .then((hash) => {
                    finalData = Object.assign({}, Data, { tokenid: hash });
                    db.collection("blockchain")
                      .doc(finalData.tokenid)
                      .set(finalData);
                    db.collection("blockchain").doc("info").set({
                      last: finalData.tokenid,
                      first: "00000000000000000000000000000000",
                    });
                  })
                  .catch((error) => {
                    console.log("Error:", error);
                  })
                  .finally(() => {
                    setButtonText("Added ✓");
                    setInterval(function () {
                      window.location.reload();
                    }, 2000);
                  });
              }
            })
            .catch((error) => {
              console.log("Database Error:", error);
            });
        }}
      >
        <p className="text-2xl w-full text-center">{buttonText}</p>
      </button>
      <button 
        className="peer w-full p-3 text-base rounded-lg border border-gray-400 focus:border-red-400 text-gray-600 bg-white focus:outline-none focus:ring-0 appearance-none transition-colors"
        onClick={() => {
          window.location.reload();
        }}
      >
        <p className="text-2xl w-full text-center">Go Back</p>
      </button>
    </div>
  );
}

export default MarriageForm;