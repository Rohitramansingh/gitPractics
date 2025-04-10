"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { url } from "inspector";
import Image from "next/image";

// Validation Schema using Yup
const validationSchema = Yup.object({
  students: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Name is required"),
      roll: Yup.string().required("Roll is required"),
      class: Yup.string().required("Class is required"),
      img: Yup.mixed().nullable().required("Image is required"),
    })
  ),
});

const MyForm = () => {
  const initialValues = {
    students: [{ name: "", roll: "", class: "", img: "" }],
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
      {({ values, setFieldValue }) => (
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

                    <div>
                      <input
                        className="bg-gray-200 p-1 "
                        type="file"
                        onChange={(e: any) =>
                          setFieldValue(
                            `students[${index}].img`,
                            URL.createObjectURL(e.target.files[0])
                          )
                        }
                        name={`students[${index}].img`}
                      />
                      {values?.students[index]?.img && (
                        <Image
                          src={values?.students[index]?.img}
                          width={200}
                          height={200}
                          alt="img"
                        />
                      )}
                      <ErrorMessage
                        name={`students[${index}].img`}
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
                  onClick={() =>
                    push({ name: "", roll: "", class: "", img: "" })
                  }
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
