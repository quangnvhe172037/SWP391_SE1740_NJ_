import { Link } from 'react-router-dom'
import Price from './Price'
function MilkteaItem({ milktea }) {
    const handle = milktea.milk_tea_id
    const name = milktea.name
    const price = milktea.price
    const image_url = milktea.image_url

    return (
        <Link
            to={`/milktea/${handle}`}
        >
            <div className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
                <div className="h-72 border-b-2 border-palette-lighter relative">
                    <img
                        src={image_url}
                        alt={name}
                        layout="fill"
                        className="transform duration-500 ease-in-out hover:scale-110"
                    />
                </div>
                <div className="h-40 relative">
                    <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
                        {name}
                    </div>
                    <div
                        className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter
            rounded-tl-sm triangle"
                    >
                        <Price
                            currency="VND "
                            num={price}
                            numSize="text-lg"
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MilkteaItem