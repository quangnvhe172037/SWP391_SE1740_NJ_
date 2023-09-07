import {findMilkteaById} from "../../../api/Milktea/milktea";
import {useState, useEffect} from "react";
import MilkteaImage from "../../../items/MikteaImage";
import MilkteaForm from "../../../items/MilkteaForm";
import MilkteaInfor from "../../../items/MilkteaInfor";
import {useLocation} from "react-router-dom";

export default function MilkteaDetail() {
    const location = useLocation();
    const path = location.pathname;
    const mteaCode = path.substring(path.lastIndexOf("/") + 1);
    const [errorMessage, setErrorMessage] = useState("");
    const [milkTea, setMilkTea] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await findMilkteaById(mteaCode);
            if (result.success) {
                setMilkTea(result.data);
            } else {
                setErrorMessage(result.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen py-12 sm:pt-20">
            <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
                {milkTea && (
                    <MilkteaImage
                        image={milkTea.milkTea.image_url}
                        name={milkTea.milkTea.name}
                    />
                )}
                <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
                    {milkTea && <MilkteaInfor milkTea={milkTea.milkTea} />}
                    {milkTea && <MilkteaForm MTea={milkTea} />}
                    {errorMessage && <p className="text-red-700">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}