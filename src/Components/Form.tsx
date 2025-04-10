"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  students: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Name is required"),
      roll: Yup.string().required("Roll is required"),
      class: Yup.string().required("Class is required"),
    })
  ),
});

const MyForm = () => {
  const initialValues = {
    students: [{ name: "", roll: "", class: "" }],
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    alert("form submitted");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="flex flex-col items-center w-[40%] mx-auto border mt-24 p-5">
          <p>Form</p>
          <FieldArray name="students">
            {({ push, remove }) => (
              <div>
                {values.students.map((student, index) => (
                  <div
                    key={index}
                    className="flex flex-col  w-full p-5 gap-y-5  "
                  >
                    <div>
                      <Field
                        name={`students[${index}].name`}
                        placeholder="Name"
                        className="border p-2 w-full  "
                      />
                      <ErrorMessage
                        name={`students[${index}].name`}
                        component="div"
                        className="error text-sm text-red-500 "
                      />
                    </div>

                    <div>
                      <Field
                        name={`students[${index}].roll`}
                        placeholder="Roll"
                        className="border p-2 w-full  "
                      />
                      <ErrorMessage
                        name={`students[${index}].roll`}
                        component="div"
                        className="error text-sm text-red-500 "
                      />
                    </div>

                    <div>
                      <Field
                        name={`students[${index}].class`}
                        placeholder="Class"
                        className="border p-2 w-full  "
                      />
                      <ErrorMessage
                        name={`students[${index}].class`}
                        component="div"
                        className="error text-sm text-red-500 "
                      />
                    </div>

                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: "", roll: "", class: "" })}
                >
                  Add Student
                </button>
              </div>
            )}
          </FieldArray>
          <p className="w-full text-end ">
            <button
              type="submit"
              className="bg-black text-white p-1  w-[100px]"
            >
              Submit
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
