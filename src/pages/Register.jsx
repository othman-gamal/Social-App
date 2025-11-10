import React, { useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

import { Link, useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";

import { regSchema } from "../lib/validationSchmas/AuthSchema";

import { toast } from "react-toastify";
import { registerUser } from "../services/AuthServices";

const genders = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

export default function Register() {
  //handel submite bete3mel e . prevent default w talhod elvalues w teb3athom

  // regstier 3ashan yemsek elinput w yeb3ato lelbackend

  // regstier (inputName) bona2an 3ala elbackend

  const [errorMSG, setErrorMsg] = useState("");

  const [successMSG, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(regSchema),

    mode: "all",

    defaultValues: {
      name: "",

      email: "",

      password: "",

      rePassword: "",

      dateOfBirth: "",

      gender: "",
    },
  });

  async function onSubmit(data) {
    setErrorMsg("");
    setSuccessMsg("");

    // 1️⃣ Collect all validation errors
    if (Object.keys(errors).length > 0) {
      const allErrors = Object.values(errors)
        .map((err) => err.message)
        .join(", ");
      console.log("❌ Validation errors:", allErrors);
      setErrorMsg(allErrors);
      toast.error(allErrors);
      return; // stop submission if validation fails
    }

    // 2️⃣ Format date for API
    const formattedData = {
      ...data,
      dateOfBirth: `${data.dateOfBirth.getDate()}-${
        data.dateOfBirth.getMonth() + 1
      }-${data.dateOfBirth.getFullYear()}`,
    };

    console.log("🔹 Formatted data to send:", formattedData);

    try {
      const response = await registerUser(formattedData);

      console.log("✅ API response:", response);
      setSuccessMsg(response.message || "Success!");
      toast.success(response.message || "Success!");
      navigate("/login");
    } catch (error) {
      // 3️⃣ Show API error
      const errorMsg =
        error.response?.data?.error || error.message || "Something went wrong";
      console.error("❌ API error:", error);
      console.log("❌ API error message to show:", errorMsg);

      setErrorMsg(errorMsg);
      toast.error(errorMsg);
    }
  }

  return (
    <form
      className="w-full max-w-4xl space-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-header">
        <h2 className="text-4xl font-bold mb-5">Welcome to Nexify 👋🏼</h2>

        <p className="text-xl">sign up your account</p>
      </div>

      <div className="input-form space-y-5">
        <Input
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          {...register("name")}
          isRequired
          variant="faded"
          label="Name"
          placeholder="Enter your name"
          type="text"
        />

        <Input
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          {...register("email")}
          isRequired
          variant="faded"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          {...register("password")}
          isRequired
          variant="faded"
          label="password"
          placeholder="Enter your password"
          type="password"
        />

        <Input
          isInvalid={Boolean(errors.rePassword)}
          errorMessage={errors.rePassword?.message}
          {...register("rePassword")}
          isRequired
          variant="faded"
          label="rePassword"
          placeholder="confirm your password"
          type="password"
        />

        <div className="flex gap-5 items-center ">
          <Input
            isInvalid={Boolean(errors.dateOfBirth)}
            errorMessage={errors.dateOfBirth?.message}
            type="date"
            {...register("dateOfBirth")}
            isRequired
            className="max-w-[284px]"
            label="Birth date"
          />

          <Select
            {...register("gender", { required: "Select your gender" })}
            label="Select your gender"
            isInvalid={Boolean(errors.gender)}
            errorMessage={errors.gender?.message}
          >
            {genders.map((gender) => (
              <SelectItem value={`${gender.key}`} key={gender.key}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex justify-between items-end">
          <Button color="primary" type="submit">
            Submit
          </Button>

          <span>
            Already has account?
            <Link to="/login" className="font-bold ms-1 ">
              Sign in
            </Link>
          </span>
        </div>

        {errorMSG && (
          <Alert color="danger" title={errorMSG} className="w-1/2" />
        )}
        {successMSG && (
          <Alert color="success" title={successMSG} className="w-1/2" />
        )}
      </div>
    </form>
  );
}
