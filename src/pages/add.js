import { useState } from "react";

import PassportForm from "../components/passportForm";
import BirthForm from "../components/birthForm";
import IdentityForm from "../components/identityForm";
import MarriageForm from "../components/marriageForm";
import DrivingForm from "../components/drivingForm";
import VehicleForm from "../components/vehicleForm";
import LandForm from "../components/landForm";
import Header from "../components/header";
import AddFormButton from "../components/addFormButton";

function Add() {
  const [viewForm, setViewForm] = useState("none");
  const [viewFormChooser, setViewFormChooser] = useState("block");
  const [formChoice, setFormChoice] = useState("none");

  return (
    <div>
      <Header />
      <div id="FormChooser" style={{ display: viewFormChooser }}>
        <div className="flex justify-evenly flex-wrap p-1 m-3 hover:bg-[#c5d6f5] rounded-md">
          <p className="text-2xl w-full text-center">Identity</p>
          <AddFormButton
            text={"Identity Card"}
            onClick={() => {
              setFormChoice("identity");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
          <AddFormButton
            text={"Passport"}
            onClick={() => {
              setFormChoice("passport");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
          <AddFormButton
            text={"Birth Certificate"}
            onClick={() => {
              setFormChoice("birth");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
          <AddFormButton
            text={"Marriage Certificate"}
            onClick={() => {
              setFormChoice("marriage");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
        </div>
        <div className="flex justify-evenly flex-wrap p-1 m-3 hover:bg-[#c5d6f5] rounded-md">
          <p className="text-2xl w-full text-center">Automobile</p>
          <AddFormButton
            text={"Driving License"}
            onClick={() => {
              setFormChoice("driving");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
          <AddFormButton
            text={"Vehicle Registration"}
            onClick={() => {
              setFormChoice("vehicle");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
        </div>
        <div className="flex justify-evenly flex-wrap p-1 m-3 hover:bg-[#c5d6f5] rounded-md">
          <p className="text-2xl w-full text-center">Property</p>
          <AddFormButton
            text={"Land Deed Certificate"}
            onClick={() => {
              setFormChoice("land");
              setViewForm("block");
              setViewFormChooser("none");
            }}
          />
        </div>
      </div>
      <div id="Form" style={{ display: viewForm }}>
        {formChoice === "none" ? null : formChoice === "passport" ? (
          <PassportForm />
        ) : formChoice === "identity" ? (
          <IdentityForm />
        ) : formChoice === "birth" ? (
          <BirthForm />
        ) : formChoice === "marriage" ? (
          <MarriageForm />
        ) : formChoice === "driving" ? (
          <DrivingForm />
        ) : formChoice === "vehicle" ? (
          <VehicleForm />
        ) : formChoice === "land" ? (
          <LandForm />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Add;
