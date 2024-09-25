import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPosts();
    }, []);

    const onDeleteClick = (blog) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) {
            return;
        }
        axiosClient.delete(`/blog-posts/${blog.id}`).then(() => {
            getPosts();
        });
    };

    const getPosts = (page) => {
        setLoading(true);
        axiosClient
            .get(`/blog-posts?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                setPosts(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const fetchNextPrevPages = (link) => {
        const url = new URL(link);
        getPosts(url.searchParams.get("page"));
    };

    const renderPaginationLinks = () => {
        return (
            <ul className="pagination">
                {posts?.meta?.links?.map((link, index) => (
                    <li key={index} className="page-item">
                        <a
                            style={{ cursor: "pointer" }}
                            className={`page-link ${
                                link.active ? "active" : ""
                            }`}
                            onClick={() => fetchNextPrevPages(link.url)}
                        >
                            {link.label
                                .replace("&laquo;", "")
                                .replace("&raquo;", "")}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Blogs</h1>
                <Link className="btn-add" to="/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {posts?.data?.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.title}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/" + u.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) => onDeleteClick(u)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <div className="page-container">
                    <div>
                        Showing {posts?.meta?.from} to {posts?.meta?.to} from{" "}
                        {posts?.meta?.total} results.
                    </div>
                    &nbsp;
                    <div>{renderPaginationLinks()}</div>
                </div>
            </div>
        </div>
    );
}
