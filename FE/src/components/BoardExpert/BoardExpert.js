import React, { useState, useEffect } from "react";

import userapi from "../../api/userapi";
const BoardExpert = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        userapi.getExpertBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                if (error.response && error.response.status === 403) {
                    setContent("Bạn không có quyền truy cập trang này");
                } else {
                    const _content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setContent(_content);
                }
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default BoardExpert;