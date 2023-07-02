import { SetStateAction, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import DatePicker from 'react-datepicker';
import { instance } from "../App";

interface DateSelected {
    initialDate: Date | null;
    finalDate: Date | null;
}

const FilterByComponent = ({ handleDateChange, handleLocationChange }:
    { handleDateChange: (date: { initialDate: Date | null, finalDate: Date | null }) => void, handleLocationChange: (location: string) => void }) => {
    const [display, setDisplay] = useState<boolean>(false);

    const [locations, setLocations] = useState([]);

    const [dateSelected, setDateSelected] = useState<DateSelected>({
        initialDate: null,
        finalDate: null,
    });

    const dropdownClass = classNames(["z-10 w-66 p-3 bg-gray-300 absolute top-[190px] rounded-lg shadow dark:bg-gray-700"], {
        hidden: !display,
    });

    const [locationSelected, setLocationSelected] = useState<string>("");

    useEffect(() => {
        instance.get('/api/genesis/locations')
            .then((response) => {
                setLocations(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        handleLocationChange(locationSelected);
    }, [locationSelected, handleLocationChange]);

    useEffect(() => {
        handleDateChange(dateSelected);
    }, [dateSelected, handleDateChange]);

    const handleDateFilter = (date: Date | null, type: string) => {
        setDateSelected((prev) => ({ ...prev, [type]: date }));
    }

    const handleChangeLocation = (e: { target: { value: SetStateAction<string>; }; }) => {
        setLocationSelected(e.target.value);
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <button id="dropdownDefault" data-dropdown-toggle="dropdown" onClick={() => setDisplay(!display)}
                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                type="button">
                Filter by
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            <div id="dropdown" className={dropdownClass}>

                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                    <div className="flex items-center">
                        <label className="mr-2">Date Initial:</label>
                        <DatePicker
                            selected={dateSelected.initialDate}
                            onChange={(date) => handleDateFilter(date, 'initialDate')}
                            className="border border-gray-300 px-2 py-1 rounded w-full"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

                    <div className="flex items-center mt-4">
                        <label className="mr-3">Date Final: </label>
                        <DatePicker
                            selected={dateSelected.finalDate}
                            onChange={(date) => handleDateFilter(date, 'finalDate')}
                            className="border border-gray-300 px-2 py-1 rounded w-full"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

                    <div className="flex items-center mt-4">
                        <label className="mr-3">Location: </label>
                        <select id="entityType" name="EntityType" onChange={handleChangeLocation}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select a location</option>
                            {locations.map((location: string) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>


                </ul>
            </div>
        </div >
    );
}

export default FilterByComponent;
