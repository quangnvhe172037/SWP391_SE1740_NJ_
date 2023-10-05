// Footer.js
import React from "react";

const Footer = () => {
    return (
        <footer className="py-8 lg:pt-16 lg:pb-10 bg-[rgb(24,24,33)] px-4">
            <div className="mx-auto ">
                <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:justify-items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                className="h-10 w-10"
                                src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.15752-9/352418349_278492141385603_6785204458197370940_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=xVx3DAYE2coAX--M-WZ&_nc_ht=scontent.fhan15-1.fna&oh=03_AdTAVEvLC9XYryl9detjHO7bUmdvXXfs7rU1Qz7b4yt20A&oe=653A0373"
                                alt=""
                            />
                            <h1 className="capitalize font-bold text-white">
                                Challenge Yourself, Enhance Your Knowledge
                            </h1>
                        </div>
                        <h3 className="text-gray-500 mb-2 text-sm">
                            Phone: 0246.329.1102
                        </h3>
                        <h3 className="text-gray-500 mb-2 text-sm">
                            Email: quangnvhe172037@fpt.edu.vn
                        </h3>
                        <h3 className="text-gray-500 mb-2 text-sm">
                            Address: High-Tech Education and Training Zone Hòa Lạc Km29,
                            Thăng Long Avenue, Thạch Hoà, Thạch Thất, Hanoi 13100
                        </h3>
                    </div>
                    <div>
                        <h1 className="capitalize font-bold text-white mb-3">About Quizzi</h1>
                        <h3 className="text-gray-500 mb-2 text-sm">Introduction</h3>
                        <h3 className="text-gray-500 mb-2 text-sm">Job Opportunities</h3>
                        <h3 className="text-gray-500 mb-2 text-sm">Partnerships</h3>
                    </div>
                    <div>
                        <h1 className="capitalize font-bold text-white mb-3">Support</h1>
                        <h3 className="text-gray-500 mb-2 text-sm">Contact</h3>
                        <h3 className="text-gray-500 mb-2 text-sm">Privacy</h3>
                        <h3 className="text-gray-500 mb-2 text-sm">Terms</h3>
                    </div>
                    <div>
                        <h1 className="capitalize font-bold text-white mb-3 a">
                            QUIZZI EDUCATIONAL TECHNOLOGY CORPORATION
                        </h1>
                        <h3 className="text-gray-500 mb-2 text-sm">
                            Tax ID: 0109922901
                        </h3>
                        <h3 className="text-gray-500 mb-2 text-sm">
                            Founded: 03/04/2022
                        </h3>
                        <h3 className="text-gray-500 mb-2 text-sm">
                            Fields: Technology, Education, Programming. F8 builds and develops products that bring value to the community.
                        </h3>
                    </div>
                </section>
                <section className="flex mt-5">
                    <h3 className="text-gray-500 mb-2 text-sm">
                        © 2018 - 2022 Quizzi. All rights reserved.
                    </h3>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
