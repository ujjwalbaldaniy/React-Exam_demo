import React, { useState } from "react";
import Form from "../Components/Form";
import { userResetPassword } from "../Services/allApi";
import { toast } from "react-toastify";

const inputs = [
    {
        name: "oldPassword",
        type: "password",
        placeholder: "old password",
        lable: "Old Password :- "
    },
    {
        name: "Password",
        type: "password",
        placeholder: "password",
        lable: "Password :- "
    },
    {
        name: "ConfirmPassword",
        type: "password",
        placeholder: "confirm password",
        lable: "Confirm Password :- "
    },
]

const ResetPassword = () => {
    // const navigate = useNavigate()
    const [resetPasswordField, setResetPasswordField] = useState({
        oldPassword: "",
        Password: "",
        ConfirmPassword: "",
    });

    const resetPasswordChange = (e) => {
        const { name, value } = e.target
        setResetPasswordField({
            ...resetPasswordField,
            [name]: value
        })
    }

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        if (resetPasswordField.oldPassword && resetPasswordField.Password && resetPasswordField.ConfirmPassword) {
            console.log(resetPasswordField);

            userResetPassword(resetPasswordField)
                .then((res) => {
                    console.log(res)
                    toast.success(res.data.message)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.response.data.message)
                })
        }

        setResetPasswordField({
            oldPassword: "",
            Password: "",
            ConfirmPassword: "",
        })
    }


    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Reset Password</h1>
                    <form className="login_form" onSubmit={resetPasswordSubmit}>
                        <Form handleChange={resetPasswordChange} inputField={resetPasswordField} inputs={inputs} />
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ResetPassword;
