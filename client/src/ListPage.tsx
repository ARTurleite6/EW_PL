import { useEffect, useState } from "react";
import { instance } from "./App";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import SearchBar from "./components/SearchBar";
import PageCountFilter from "./components/PageCountFilter";
import FilterByComponent from "./components/FilterByComponent";
import LogoutComponent from "./components/LogoutComponent";

type GeneseProps = {
    UnitId: number,
    UnitTitle: string,
    UnitDateInitial: string,
    UnitDateFinal: string,
    PhysLoc: string,
    Names: string[],
}

interface DateFilter {
    initialDate: Date | null;
    finalDate: Date | null;
}

const ListPage = () => {

    const [filterName, setFilterName] = useState<string>("");

    const [dateFilter, setDateFilter] = useState<DateFilter>({
        initialDate: null,
        finalDate: null,
    });

    const [locationFilter, setLocationFilter] = useState<string>("");

    const [limitPage, setLimitPage] = useState(10);

    const [totalCount, setTotalCount] = useState(0);

    const navigator = useNavigate();

    const [list, setList] = useState<GeneseProps[]>([]);

    const [currentList, setCurrentList] = useState<GeneseProps[]>([]);

    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem("currentPage") ?? "1"));

    const handleDateChange = (date: { initialDate: Date | null, finalDate: Date | null }) => {
        setDateFilter(date);
    }

    const handleLocationChange = (location: string) => {
        setLocationFilter(location);
    }

    useEffect(() => {
        handleFilterChange(1);
    }, [filterName, dateFilter, locationFilter]);

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

    const handleFilterChange = (nextPage: number | string) => {
        if (nextPage === 0) return;
        let next = typeof nextPage == 'string' ? parseInt(nextPage) : nextPage;
        const skip = (next - 1) * limitPage;

        let newList = list.filter((entry) => entry.UnitTitle.includes(filterName)).filter((entry) => entry.PhysLoc === locationFilter);
        const { initialDate, finalDate } = dateFilter;
        if (initialDate !== null) {
            newList = newList.filter((entry) => {
                const date = new Date(entry.UnitDateInitial);
                return date >= initialDate;
            });
        }
        if (finalDate !== null) {
            newList = newList.filter((entry) => {
                const date = new Date(entry.UnitDateFinal);
                return date <= finalDate;
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
        <LogoutComponent>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 ml-20">Inquirições de Génere</h1>
                <div className="flex flex-row justify-center">
                    <div className="flex justify-between mb-4 w-9/12">
                        <button className="mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 self-center" onClick={handleCreateEntry}>
                            New
                        </button>
                        <div className="w-full flex items-center justify-center">
                            <SearchBar message="Search Names (separated by semi-comma)" onSubmit={changeFilterValue} />
                            <div className="ml-4">
                                <FilterByComponent handleDateChange={handleDateChange} handleLocationChange={handleLocationChange} />
                            </div>
                        </div>
                    </div>
                    <div className="align-middle ml-20 flex content-center">
                        <PageCountFilter handlePageChange={setLimitPage} />
                    </div>
                </div>
                <table className="min-w-full bg-white border border-gray-300 -z-10">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Unit ID</th>
                            <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Unit Title</th>
                            <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Date Initial</th>
                            <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Date Final</th>
                            <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-center">Physical Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentList.map((entry, index) => (
                            <tr key={entry.UnitId} onClick={() => handleOnClick(entry.UnitId)} className="dark:md:hover:bg-blue-500">
                                <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitId}</td>
                                <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitTitle}</td>
                                <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitDateInitial.slice(0, 10)}</td>
                                <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.UnitDateFinal.slice(0, 10)}</td>
                                <td className="px-6 py-4 border-b border-gray-300 text-center">{entry.PhysLoc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-8">
                    <Pagination totalCount={totalCount} pageSize={limitPage} currentPage={currentPage} onPageChange={(page) => handleFilterChange(page)} />
                </div>
            </div>
        </LogoutComponent>
    );
}

export default ListPage;
