import img from "../../images/logo.png";

function LoginSlidebar({children}) {
    return (
        <div className="bg-[#F8F8F8] h-[100vh] flex">
            <div className="container m-auto h-[85vh] items-center bg-white rounded-md shadow-md">
                <div className="lg:grid grid-cols-2 gap-5 items-center">
                    <div className="hidden lg:block h-[80vh] p-4">
                        <div className="bg-[#F6F6F6] rounded-sm text-center items-center">
                            <img className="w-full" src={img} alt="login image" />
                        </div>
                    </div>
                    {children }
                </div>
            </div>
        </div>
    );
}

export default LoginSlidebar;