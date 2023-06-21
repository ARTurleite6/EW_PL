import { useState } from 'react';

const PageCountFilter = ({ handlePageChange }: { handlePageChange: (value: number) => void }) => {
    const [elementsPerPage, setElementsPerPage] = useState(10);

    const handleSelectChange = (e: { target: { value: string; }; }) => {
        const value = parseInt(e.target.value);
        setElementsPerPage(value);
        handlePageChange(value);
    };

    return (
        <form className="flex items-center">
            <label htmlFor="elements-per-page" className="sr-only">
                Elements per Page
            </label>
            <div className="relative w-full">
                <select
                    id="elements-per-page"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={elementsPerPage}
                    onChange={handleSelectChange}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </form>
    );
};

export default PageCountFilter;

