import classnames from "classnames";
import { useMemo } from "react";
import "./App.css"
import "./Pagination.css"

function range(start: number, end: number) {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
}

function usePagination(props: { currentPage: number, totalCount: number, siblingCount: number, pageSize: number }): (string | number)[] {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(props.totalCount / props.pageSize);

        const totalPageNumbers = props.siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, 1);
        const rightSiblingIndex = Math.min(
            props.currentPage + props.siblingCount,
            totalPageCount,
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * props.siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, '...', totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * props.siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, '...', ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }

    }, [props.totalCount, props.pageSize, props.siblingCount, props.currentPage]) as (number | string)[];

    return paginationRange;
}

const Pagination = (props: { onPageChange: (selectedPage: number | string) => void; totalCount: number; siblingCount?: 1 | undefined; currentPage: number; pageSize: number; }) => {

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrev = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (

        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
                <li onClick={onPrev} className={classnames("px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer", {
                    disabled: currentPage === 1
                })}>
                    Previous
                </li>

                {paginationRange.map(pageNumber => {
                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === '...') {
                        return (<li key={pageNumber} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                            ...
                        </li>);
                    }

                    else if (pageNumber !== currentPage) {
                        // Render our Page Pills
                        return (
                            <li key={pageNumber}
                                className={classnames("px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer", {
                                    selected: pageNumber === currentPage
                                })}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </li>
                        );
                    } else {
                        // Render our Page Pills
                        return (
                            <li key={pageNumber}
                                className={classnames("px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer", {
                                    selected: pageNumber === currentPage
                                })}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </li>
                        );
                    }
                })}
                <li onClick={onNext} className={classnames("px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer", {
                    disabled: currentPage === lastPage
                })}>
                    Next
                </li>
            </ul>
        </nav>

    );

}

export default Pagination;
