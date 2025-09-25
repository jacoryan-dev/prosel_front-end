import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAuth } from "../auth/useAuth";
import type { AxiosError } from "axios";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = Yup.object({
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
  password: Yup.string().required("Obrigatório"),
});

function getErrorMessage(error: unknown): string {
  // Narrowing para AxiosError<{ message?: string }>
  const axiosErr = error as AxiosError<{ message?: string }>;
  const apiMsg = axiosErr?.response?.data?.message;
  if (apiMsg && typeof apiMsg === "string") return apiMsg;

  if (axiosErr?.message) return axiosErr.message;
  return "Falha ao entrar. Verifique suas credenciais.";
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string>("");

  const handleSubmit = async (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    setServerError("");
    try {
      await login(values.email, values.password);
      window.location.assign("/");
    } catch (error: unknown) {
      setServerError(getErrorMessage(error));
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Container Principal (Card) */}
      <div className="bg-white rounded-2xl shadow-[0px_10px_30px_10px_rgba(0,0,0,0.2)] p-8 w-full max-w-md">
        {/* Logo b2bit */}
        <div className="flex justify-center items-center mb-8">
          <img
            className="content-center align-center justify-center"
            src="public/assets/logo.png"
            alt="Logo b2bit"
          />
        </div>

        {/* Formulário com Formik */}
        <Formik<LoginFormValues>
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6" noValidate>
              {/* Campo E-mail */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-poppins-600 text-lg font-medium text-black mb-2"
                >
                  E-mail
                </label>
                <Field
                  as="input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="@gmail.com"
                  className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02274F] focus:bg-white transition-all duration-200 ${
                    errors.email && touched.email ? "ring-2 ring-red-500" : ""
                  }`}
                  aria-invalid={Boolean(errors.email && touched.email)}
                  aria-describedby="email-error"
                />
                <div id="email-error" className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Campo Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-poppins-600 text-lg font-medium text-black mb-2"
                >
                  Password
                </label>
                <Field
                  as="input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="****************"
                  className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02274F] focus:bg-white transition-all duration-200 ${
                    errors.password && touched.password
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                  aria-invalid={Boolean(errors.password && touched.password)}
                  aria-describedby="password-error"
                />
                <div id="password-error" className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="password" />
                </div>
              </div>

              {/* Erro do servidor */}
              {serverError && (
                <p className="text-sm text-red-600">{serverError}</p>
              )}

              {/* Botão Sign In */}
              <button
                type="submit"
                className="w-full bg-[#02274F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a3a5c] focus:outline-none focus:ring-2 focus:ring-[#02274F] focus:ring-offset-2 transition-all duration-200 mt-8 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
