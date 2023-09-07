import { useEffect, useState } from "react";
import listBlog from "../../../api/Story/story";

function Story() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await listBlog();
            setBlogs(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {blogs && blogs.map((blog) => (
                <div key={blog.blog_id} className="flex items-start w-full justify-center bottom-0 left-0 z-20 p-4 border-t shadow dark:bg-gray-800 dark:border-gray-600">
                    <img src={blog.image_url} alt="Ảnh" className="w-full max-w-[600px]" />
                    <div className="mx-[20px] ">
                        <h2 className="font-bold text-[20px] ">{blog.title}</h2>
                        <p className="text-gray-900 ">{blog.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Story;
