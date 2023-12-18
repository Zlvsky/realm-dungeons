import React from "react";
import Button from "../button/Button";

interface FormInterface {
  id?: string;
  formArr?: any[];
  submitBtn?: any;
  onSubmit?: any;
  redirect?: any;
  buttonSize?: "sm" | "md" | "lg" | "full";
  buttonPy?: string;
  bgColor?: string;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
}

function Form({
  id,
  submitBtn,
  buttonSize,
  buttonPy,
  onSubmit,
  disabled,
  bgColor,
  children,
}: FormInterface) {
  return (
    <form
      id={id}
      className="pt-1 "
      onSubmit={(e: any) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-4">{children}</div>
      <div className="flex justify-center pt-1 mt-10 mb-4 pb-1">
        <Button
          type="submit"
          bgColor={bgColor}
          disabled={disabled}
          py={"5"}
          size={buttonSize}
          
        >
          {submitBtn}
        </Button>
      </div>
    </form>
  );
}

export default Form;
