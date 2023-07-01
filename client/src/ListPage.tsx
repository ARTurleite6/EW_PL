import { useEffect, useState } from "react";
import { instance } from "./App";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import SearchBar from "./components/SearchBar";
import PageCountFilter from "./components/PageCountFilter";

type GeneseProps = {
    UnitId: number,
    UnitTitle: string,
    UnitDateInitial: string,
    UnitDateFinal: string,
    Names: string[],
}

const ListPage = () => {

    const [filterName, setFilterName] = useState<string>("");

    const [limitPage, setLimitPage] = useState(10);

    const [totalCount, setTotalCount] = useState(0);

    const navigator = useNavigate();

    const [list, setList] = useState<GeneseProps[]>([]);

    const [currentList, setCurrentList] = useState<GeneseProps[]>([]);

    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem("currentPage") ?? "1"));

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

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

    const filterListBySubstring = (list: GeneseProps[], names: string[]) => {
        return list.filter((entry) =>
            entry.Names.some((name) => names.some((filterName) => {
                return name.includes(filterName);
            }))
        );
    };

    const handlePageChange = (nextPage: number | string) => {
        if (nextPage === 0) return;
        let next = typeof nextPage == 'string' ? parseInt(nextPage) : nextPage;
        const skip = (next - 1) * limitPage;

        let newList = list.filter((entry) => entry.UnitTitle.includes(filterName));

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
        handlePageChange(1);
    };

    const handleCreateEntry = () => {
        navigator('/genesis/new');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Inquirições de Genere</h1>
            <div className="flex flex-row justify-center">
                <div className="flex justify-between mb-4 w-9/12">
                    <button className="mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateEntry}>
                        New
                    </button>
                    <div className="w-full">
                        <SearchBar message="Search Names (separated by semi-comma)" onSubmit={changeFilterValue} />
                    </div>
                </div>
                <div className="align-middle ml-20">
                    <PageCountFilter handlePageChange={setLimitPage} />
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Unit ID</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Unit Title</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Date Initial</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">Date Final</th>
                    </tr>
                </thead>
                <tbody>
                    {currentList.map((entry) => (
                        <tr key={entry.UnitId} onClick={() => handleOnClick(entry.UnitId)} className="dark:md:hover:bg-blue-500">
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitId}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitTitle}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitDateInitial.slice(0, 10)}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitDateFinal.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-8">
                <Pagination totalCount={totalCount} pageSize={limitPage} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default ListPage;
