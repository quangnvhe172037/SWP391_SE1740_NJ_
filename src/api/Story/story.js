export default async function listBlog() {
    try {
        const response = await fetch("https://6th.onrender,com/home/all-blogs", {
            method: "get",
        });
        return await response.json();
    } catch (e){
        return console.log("listBlog: " + e);
    }
}
