import React, { useState } from "react";

const Dropdown = () => {

    const [value, setValue] = useState({
        role: ""
    });

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(value);
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <select value={value.role} onChange={handleChange}>
                        <option value="Orange" >Orange</option>
                        <option value="Radish">Radish</option>
                        <option value="Cherry">Cherry</option>
                    </select>
                    <button type="submit">submit</button>
                </form>
                <p>{`You selected ${value}`}</p>
            </div>
        </>
    )
};

export default Dropdown;
