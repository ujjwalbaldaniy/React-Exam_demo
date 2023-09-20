import React from "react";
import '../Styles/form.css'

const Form = ({ inputs }) => {

    return (
        <>
            {inputs.map((input, index) => (
                <div className="input-div" key={index + 1}>
                    <label>{input.lable}</label>
                    <input {...input} />
                    {input.showerrors && (<div key={index} style={{ color: "red" }}>{input.showerrors} </div>)}
                </div>
            ))}
        </>
    )
};

export default Form;
