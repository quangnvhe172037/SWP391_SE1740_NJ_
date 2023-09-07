function MilkteaImage({ image,name }) {
    return (
        <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg grid justify-center items-center h-96">
            <img
                src={image}
                alt={name}
                layout="fill"
                className="transform duration-500 ease-in-out hover:scale-105"
            />
        </div>
    );
}

export default MilkteaImage