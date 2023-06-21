import { useEffect, useState } from "react";
import { instance } from "./App";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

type GeneseProps = {
    UnitId: number,
    UnitTitle: string,
    UnitDateInitial: string,
    UnitDateFinal: string,
}

const ListPage = () => {
    const [limitPage, setLimitPage] = useState(10);

    const [pageCount, setPageCount] = useState(0);

    const navigator = useNavigate();

    const [list, setList] = useState<GeneseProps[]>([]);

    const [currentList, setCurrentList] = useState<GeneseProps[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        instance.get('/api/genesis')
            .then((response) => {
                console.log(response.data);
                const newList = response.data.slice(0, limitPage);
                setCurrentList(newList);
                setList(response.data);


                const pageCount = Math.ceil(response.data.length / limitPage);
                console.log(pageCount);
                setPageCount(pageCount);
            }).catch((error) => {
                console.log(error);
            });
    }, [limitPage]);

    const handlePageChange = (nextPage: number | string) => {
        if (nextPage === 0 || nextPage === pageCount + 1) return;
        let next = typeof nextPage == 'string' ? parseInt(nextPage) : nextPage;
        const skip = (next - 1) * limitPage;
        const newList = list.slice(skip, skip + limitPage);

        console.log(next);

        setCurrentList(newList);

        setCurrentPage(next);
    }

    const handleOnClick = (id: number) => {
        return navigator('/genesis/' + id);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">List Page</h1>
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
                        <tr key={entry.UnitId} onClick={() => handleOnClick(entry.UnitId)} className="dark:md:hover:bg-fuchsia-600">
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitId}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitTitle}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitDateInitial.slice(0, 10)}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{entry.UnitDateFinal.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-8">
                <Pagination totalCount={pageCount} pageSize={limitPage} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default ListPage;
