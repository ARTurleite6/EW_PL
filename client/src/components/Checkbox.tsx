import React from "react";

const Checkbox = ({ onChange, checked, message }: { onChange: (value: boolean | ((prevState: boolean) => boolean)) => void, checked: boolean, message: string }) => {

    const [checkedState, setCheckedState] = React.useState(checked);

    const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setCheckedState(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <div className={"mt-2 mb-2"}>
            <div className="flex items-center">
                <input id={message} onChange={handleChange} checked={checkedState} type="checkbox" className={"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"} />
                <label htmlFor={message} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{message}</label>
            </div>
        </div>
    );
}

export default Checkbox;
