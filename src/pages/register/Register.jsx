import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../app/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import "./register.css";
import logo from "../../assets/logo.png";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Имя пользователя обязательно")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Имя пользователя может содержать только буквы и цифры."
    ),
  first_name: Yup.string().required("Имя обязательно"),
  last_name: Yup.string().required("Фамилия обязательна"),
  email: Yup.string()
    .email("Неверный адрес электронной почты")
    .required("Требуется адрес электронной почты"),
  password: Yup.string()
    .required("Требуется пароль")
    .min(8, "Пароль должен содержать не менее 8 символов."),
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(
      register({
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      })
    )
      .then((action) => {
        if (action.payload.access && action.payload.refresh) {
          navigate("/sign-in");
        } else {
          setEmailErr(action.payload.email);
          setUsernameErr(action.payload.username);
        }
      })
      .catch((error) => {
        console.error("An error occurred during registration:", error);
      });
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-register">
      <Link to={"/"}>
        <div className="absolute cursor-pointer top-5 left-10">
          <img className="w-[200px] h-[30px]" src={logo} alt="logo" />
        </div>
      </Link>
      <Link to={"/"}>
        <RiCloseLargeLine
          className="absolute cursor-pointer top-5 right-5"
          color="red"
          size={30}
        />
      </Link>
      <Formik
        initialValues={{
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="absolute top-20 left-10 md:w-[40%] w-[80%] h-[70%] md:h-[85%] py-5 md:px-5 px-2 bg-main-white rounded-2xl flex justify-center items-center flex-col">
            <p className="mb-3 text-[clamp(16px,3vw,28px)] uppercase text-main-black">
              Добро пожаловать!
            </p>
            <span className="text-main-black text-[clamp(12px,2vw,16px)] font-light text-center">
              Платформа по поиску команд и проектов ITBRAT
            </span>
            <div className="mb-3 w-[90%] mt-5">
              <Field
                type="text"
                name="username"
                className="w-full p-1 border-2 rounded outline-none md:p-2 focus:border-red-950"
                placeholder="Имя пользователя"
              />
              <p className="text-main-red">{usernameErr}</p>
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-[10px]"
              />
            </div>

            <div className="mb-3 w-[90%]">
              <Field
                type="text"
                name="first_name"
                className="w-full p-1 border-2 rounded outline-none md:p-2 focus:border-red-950"
                placeholder="Имя"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-[10px]"
              />
            </div>

            <div className="mb-3 w-[90%]">
              <Field
                type="text"
                name="last_name"
                className="w-full p-1 border-2 rounded outline-none md:p-2 focus:border-red-950"
                placeholder="Фамилия"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-[10px]"
              />
            </div>

            <div className="mb-3 w-[90%]">
              <Field
                type="email"
                name="email"
                className="w-full p-1 border-2 rounded outline-none md:p-2 focus:border-red-950"
                placeholder="Email"
              />
              <p className="text-main-red">{emailErr}</p>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[10px]"
              />
            </div>

            <div className="mb-3 w-[90%]">
              <Field
                type="password"
                name="password"
                className="w-full p-1 border-2 rounded outline-none md:p-2 focus:border-red-950"
                placeholder="Пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-[10px]"
              />
            </div>

            <div className="mb-3 w-[90%]">
              <Field
                type="password"
                name="confirm_password"
                className="w-full p-1 border-2 rounded outline-none md:p-2 focus:border-red-950"
                placeholder="Повтор пароля"
              />
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="text-red-500 text-[10px]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#560303] text-white font-semibold p-2 rounded w-[90%]"
            >
              Зарегистрироваться
            </button>

            <a className="mt-2 flex gap-[5px]" href="/sign-in">
              <span className="text-main-black">Уже есть аккаунт?</span>
              <span className="text-main-red">Войдите</span>
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
}
