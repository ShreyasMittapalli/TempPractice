import { useState,useEffect } from "react";

const Tabletask = () => {
    const [cols,setCols] = useState(0);
    const [data,setData] = useState([]);
    const [currdata,setCurrdata] = useState("");
    const [titles,setTitles] = useState("");
    const [unique,setUnique] = useState([]);
    const [unibtn,setUnibtn] = useState(false);
    const [sortedData, setSortedData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    const handlebutton = (currdata) => {
        setData((prevData) => [...prevData, currdata]);

        setCurrdata("");
    }

    useEffect(() => {
        const dupes = new Set();
        const uni = data.filter((item) => {
            const first = item.split(",")[0].trim();
            if(!dupes.has(first)){
                dupes.add(first);
                return true;
            }
            return false;
        });
        setUnique(uni);
    },[data]
    );

    const handleSort = () => {
        let rows = unibtn ? [...unique] : [...data];
        rows.sort((a, b) => {
            const colA = a.split(",")[1]?.trim() || "";
            const colB = b.split(",")[1]?.trim() || "";
            return colA.localeCompare(colB, undefined, { numeric: true });
        });
        setSortedData(rows);
        setIsSorted(true);
    };


    return(
        <>
            <label>
                Enter the number of columns : 
                <input 
                    type="number" 
                    value={cols} 
                    onChange={(e) => {
                        const value = Math.max(0, e.target.value);
                        setCols(value);
                    }}
                />
            </label>
            <br />
            <label>
                Enter column headers : 
                <input type="text" 
                value={titles} 
                onChange={(e) => {setTitles(e.target.value)}}/>
            </label>
            <br />
            <label>
                Enter rows of {cols} columns : 
                <input type="text" 
                value={currdata} 
                onChange={(e) => {setCurrdata(e.target.value)}}/>
                <button onClick={() => handlebutton(currdata)}>Add Row</button>
            </label>
            <table border={1}>
                <thead>
                    <tr>
                        {
                            titles.split(",").slice(0,cols).map((title, index) => (
                                <th key={index}>
                                    {title.trim()}
                                    {index === 0 && <button onClick={() => setUnibtn(!unibtn)}>Remove Duplicates</button>}
                                    {index === 1 && (
                                    <button onClick={handleSort}>Sort</button>
                                    )}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {(isSorted ? sortedData : unibtn ? unique : data).map((item, index) => {
                        const currData = item.split(",");
                        return (
                            <tr key={index}>
                                {currData.slice(0, cols).map((ele, i) => (
                                    <td key={i}>{ele.trim()}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Tabletask;