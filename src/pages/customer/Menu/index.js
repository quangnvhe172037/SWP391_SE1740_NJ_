import Searchbar from "../../../items/Searchbar";
import {listMilktea, SearchMilktea} from "../../../api/Milktea/milktea";
import MilkteaItem from "../../../items/MilkteaItem";
import { useState, useEffect } from "react";

function Menu() {
    const [filteredMilkTeaList, setFilteredMilkTeaList] = useState([]);
    const [errorMessage, setErrorMessage]= useState('');
    useEffect(() => {
        const fetchData = async () => {
            const response = await listMilktea();
            setFilteredMilkTeaList(response);
            if (typeof filteredMilkTeaList === "string") {
                setErrorMessage(filteredMilkTeaList)
            }
        };
        fetchData();
    }, []);

    const handleSearchMilktea = (data) => {
        setFilteredMilkTeaList(data)
    };


    return (
        <div>
            <div className="flex flex-col justify-between min-h-screen">
                <div>
                    <Searchbar sendDataSearch={handleSearchMilktea} />
                </div>
                <div className="mt-[5px] mx-auto max-w-6xl">
                    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                        {typeof filteredMilkTeaList !== "string" &&
                            filteredMilkTeaList
                                ?.filter((milktea) => milktea.enabled === true)
                                ?.map((milktea, index) => (
                                    <MilkteaItem key={index} milktea={milktea} />
                                ))}
                        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;