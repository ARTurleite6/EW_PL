import { useEffect, useState } from "react";
import { instance } from "./App";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import SearchBar from "./components/SearchBar";
import PageCountFilter from "./components/PageCountFilter";
import DatePicker from "react-datepicker";

type GeneseProps = {
    UnitId: number,
    UnitTitle: string,
    UnitDateInitial: string,
    UnitDateFinal: string,
    Names: string[],
}

const ListPage = () => {

    const [filterName, setFilterName] = useState<string>("");

    const [unitDateInitial, setUnitDateInitial] = useState<Date | null>(null);
    const [unitDateFinal, setUnitDateFinal] = useState<Date | null>(null);

    const [limitPage, setLimitPage] = useState(10);

    const [totalCount, setTotalCount] = useState(0);

    const navigator = useNavigate();

    const [list, setList] = useState<GeneseProps[]>([]);

    const [currentList, setCurrentList] = useState<GeneseProps[]>([]);

    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem("currentPage") ?? "1"));

    useEffect(() => {
        console.dir(filterName);
        handlePageChange(1);
    }, [filterName, unitDateInitial, unitDateFinal, currentPage]);

    useEffect(() => {
        instance.get('/api/genesis')
            .then((response) => {
                const skip = (currentPage - 1) * limitPage;
                console.log(response.data);
                const newList = response.data.slice(skip, skip + limitPage);
                setCurrentList(newList);
                setList(response.data);


                setTotalCount(response.data.length);
            }).catch((error) => {
                console.log(error);
            });

        const currentPage = parseInt(localStorage.getItem("currentPage") ?? "1")

        setCurrentPage(currentPage);
    }, [limitPage]);

    const handleUnitDateFinalFilter = (unitDateFinal: Date | null) => {
        console.log(unitDateFinal);
        setUnitDateFinal(unitDateFinal);
    };

    const handleUnitDateInitialFilter = (unitDateInitial: Date | null) => {
        console.log(unitDateInitial);
        setUnitDateInitial(unitDateInitial);
    };

    const handlePageChange = (nextPage: number | string) => {
        if (nextPage === 0) return;
        let next = typeof nextPage == 'string' ? parseInt(nextPage) : nextPage;
        const skip = (next - 1) * limitPage;

        console.log(unitDateInitial);
        let newList = list.filter((entry) => entry.UnitTitle.includes(filterName));
        if (unitDateInitial !== null) {
            newList = newList.filter((entry) => {
                const date = new Date(entry.UnitDateInitial);
                return date >= unitDateInitial;
            });
        }
        if (unitDateFinal !== null) {
            newList = newList.filter((entry) => {
                const date = new Date(entry.UnitDateFinal);
                return date <= unitDateFinal;
            });
        }

        setTotalCount(newList.length);
        if (nextPage === totalCount) return;

        newList = newList.slice(skip, skip + limitPage);

        setCurrentList(newList);

        setCurrentPage(next);

        localStorage.setItem("currentPage", next.toString());
    }

    const handleOnClick = (id: number) => {
        return navigator('/genesis/' + id);
    };

    const changeFilterValue = (filterValue: string) => {
        const namesToFilter = filterValue;

        setFilterName(namesToFilter);
    };

    const handleCreateEntry = () => {
        navigator('/genesis/new');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Inquirições de Genere</h1>
            <div className="flex flex-row justify-center">
                <div className="flex justify-between mb-4 w-9/12">
                    <button className="mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 self-center" onClick={handleCreateEntry}>
                        New
                    </button>
                    <div className="w-full flex items-center justify-center">
                        <SearchBar message="Search Names (separated by semi-comma)" onSubmit={changeFilterValue} />
                        <div className="ml-4">
                            <div className="flex items-center">
                                <label className="mr-2">Unit Date Initial Filter:</label>
                                <DatePicker
                                    selected={unitDateInitial}
                                    onChange={handleUnitDateInitialFilter}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <label className="mr-2">Unit Date Final Filter:</label>
                                <DatePicker
                                    selected={unitDateFinal}
                                    onChange={handleUnitDateFinalFilter}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-middle ml-20 flex content-center">
                    <PageCountFilter handlePageChange={setLimitPage} />
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Unit ID</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Unit Title</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Date Initial</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Date Final</th>
                    </tr>
                </thead>
                <tbody>
                    {currentList.map((entry, index) => (
                        <tr key={entry.UnitId} onClick={() => handleOnClick(entry.UnitId)} className="dark:md:hover:bg-blue-500">
                            <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitId}</td>
                            <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitTitle}</td>
                            <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitDateInitial.slice(0, 10)}</td>
                            <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitDateFinal.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-8">
                <Pagination totalCount={totalCount} pageSize={limitPage} currentPage={currentPage} onPageChange={(page) => handlePageChange(page)} />
            </div>
        </div>
    );
}

export default ListPage;
