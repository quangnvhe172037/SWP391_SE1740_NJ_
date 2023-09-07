import Price from "./Price";

function MilkteaInfor({ milkTea }) {
    const name = milkTea?.name;
    const price = milkTea?.price;

    return (
        <div className="font-primary">
            <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
                {name}
            </h1>
            <div className="text-xl text-palette-primary font-medium py-4 px-1">
                <Price currency="VND" num={price} numSize="text-2xl" />
            </div>
        </div>
    );
}

export default MilkteaInfor;