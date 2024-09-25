import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function SinglePost() {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        id: null,
        title: "",
        content: "",
    });
    const [loading, setLoading] = useState(false);

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setBlog(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    return (
        <>
            {blog.id && <h1>{blog.title}</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {!loading && (
                    <>
                        {blog.image && (
                            <div>
                                <img src={blog.image?.original_url} style={{width:'100%'}}/>
                            </div>
                        )}
                        <div
                            style={{ textAlign: "left" }}
                            dangerouslySetInnerHTML={{
                                __html: blog.content,
                            }}
                        ></div>
                        &nbsp;
                        <a href="/posts">Back</a>
                    </>
                )}
            </div>
        </>
    );
}
