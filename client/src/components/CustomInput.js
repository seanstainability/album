import React, {useCallback} from "react";

const CustomInput = ({ label, type = 'text', value, setValue }) => {
    const onChangeValue = useCallback((e) => {
        setValue(e.target.value);
    }, [setValue]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px auto', width: '100%' }}>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChangeValue}/>
        </div>
    )
}

export default CustomInput;