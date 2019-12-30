import React from "react";
import Select from "react-select";

const myStyle = {
    control: (base, state) => ({
        ...base,
        height: "30px",
        "min-height": "30px",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        border: `0.5px solid blue`
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: 4
    }),
    clearIndicator: base => ({
        ...base,
        padding: 4
    }),
    multiValue: base => ({
        ...base
    }),
    valueContainer: base => ({
        ...base,
        padding: "0px 6px"
    }),
    input: base => ({
        ...base,
        margin: 0,
        padding: 0
    }),
    option: base => ({
        ...base,
        fontSize: 10
    })
};
const MySelect = ({
    title,
    options,
    name,
    onChange,
    placeholder = "",
    disabled = false,
    isLoading = false,
    isMulti = false,
    defaultValue =null,
    loadingMessage=() => "loading",
    ...rest
}) => {
    return (
            <Select
                defaultValue={defaultValue}
                // styles={myStyle}
                placeholder={placeholder}
                loadingMessage={loadingMessage}
                isClearable={true}
                isSearchable={true}
                isMulti={isMulti}
                isLoading={isLoading}
                name={name}
                onChange={onChange}
                options={options}
                components={{
                    IndicatorSeparator: () => null
                }}
                {...rest}
            />
    );
};

export default MySelect;
