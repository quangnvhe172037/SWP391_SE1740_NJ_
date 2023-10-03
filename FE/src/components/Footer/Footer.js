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
                                Thách thức bản thân, tăng cường kiến thức
                            </h1>
                        </div>
                        <h3 className="text-tuyn-gray mb-2 text-sm">
                            Điện thoại: 0246.329.1102
                        </h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">
                            Email: quangnvhe172037@fpt.edu.vn
                        </h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">
                            Địa chỉ: Khu Giáo dục và Đào tạo Khu Công nghệ cao Hòa Lạc Km29,
                            Đại lộ Thăng Long, Thạch Hoà, Thạch Thất, Hà Nội 13100
                        </h3>
                    </div>
                    <div>
                        <h1 className="capitalize font-bold text-white mb-3">VỀ Quizzi</h1>
                        <h3 className="text-tuyn-gray mb-2 text-sm">Giới thiệu</h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">Cơ hội việc làm</h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">Đối tác</h3>
                    </div>
                    <div>
                        <h1 className="capitalize font-bold text-white mb-3">HỖ TRỢ</h1>
                        <h3 className="text-tuyn-gray mb-2 text-sm">Liên hệ</h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">Bảo mật</h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">Điều khoản</h3>
                    </div>
                    <div>
                        <h1 className="capitalize font-bold text-white mb-3 a">
                            CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC QUIZZI
                        </h1>
                        <h3 className="text-tuyn-gray mb-2 text-sm">
                            Mã số thuế: 0109922901
                        </h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">
                            Ngày thành lập: 04/03/2022
                        </h3>
                        <h3 className="text-tuyn-gray mb-2 text-sm">
                            Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát
                            triển những sản phẩm mạng lại giá trị cho cộng đồng.
                        </h3>
                    </div>
                </section>
                <section className="flex mt-5">
                    <h3 className="text-tuyn-gray mb-2 text-sm">
                        © 2018 - 2022 Quizzi. All rights reserved.
                    </h3>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
