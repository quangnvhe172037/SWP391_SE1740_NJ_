import Header from "./Header";

export default function DefaultLayout({ children }) {
    return(
        <div>
            <Header/>
            <div className='mt-[80px]'>
                <div>{ children }</div>
            </div>
        </div>
    )
}