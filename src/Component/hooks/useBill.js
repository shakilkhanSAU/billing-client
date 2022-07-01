import { useEffect, useState } from 'react';

const useBill = () => {
    let pageinitial = 0;
    const [bills, setBills] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(pageinitial);
    const size = 10
    const url = `http://localhost:5000/billing-list?page=${page}&&size=${size}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBills(data.billing)
                const count = data.count
                const pageNumber = Math.ceil(count / size)
                setPageCount(pageNumber)
            })
    }, [url, bills]);
    return {
        bills,
        setBills,
        pageCount,
        setPage,
        page
    }
}
export default useBill;
