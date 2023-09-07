import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Intro from "../../../items/intro";
import Story from "../Story";
import About from "../About";
import Report from "../Report";
function Home() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.pathname.substring(1);
        if (hash) {
            const targetElement = document.getElementById(hash);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);
    return (
        <div>
            <Intro />
            <div id="stories" className="py-[20px]">
                <Story />
            </div>

            <div className="w-full bg-black">
                <div id='report' >
                    <Report />

                </div>
                <div id='about'>
                    <About />
                </div>
            </div>
        </div>
    );
}

export default Home;