import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function BlogForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        id: null,
        title: "",
        content: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [file, setFile] = useState<File | null>(null);

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/blog-posts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setBlog(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (file) {
            blog.image = file;
        } else {
            delete blog.image;
        }

        if (blog.id) {
            blog._method = "PUT";
            axiosClient
                .post(`/blog-posts/${blog.id}`, blog, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    navigate("/blogs");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/blog-posts", blog, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    navigate("/");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {blog.id && <h1>Update Blog: {blog.title}</h1>}
            {!blog.id && <h1>New Blog</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={blog.title}
                            onChange={(ev) =>
                                setBlog({ ...blog, title: ev.target.value })
                            }
                            placeholder="Title"
                        />
                        <textarea
                            value={blog.content}
                            placeholder="Content"
                            onChange={(ev) =>
                                setBlog({ ...blog, content: ev.target.value })
                            }
                        />
                        <div className="input-group">
                            <input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
