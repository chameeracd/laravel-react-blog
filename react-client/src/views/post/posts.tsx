import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import blankImg from "../../../public/blank-img.jpg";
import axiosClient from "../../axiosClient";

export default function posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = (page) => {
        setLoading(true);
        axiosClient
            .get(`/posts?page=${page}`)
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
        <>
            {!loading && (
                <div className="flex-container">
                    {posts?.data?.map((p) => (
                        
                            <div
                                key={p.id}
                                className="card"
                                style={{ display: "block" }}
                            >
                                {p.image ? (
                                    <img
                                        className="thumb"
                                        src={p.image?.original_url}
                                    />
                                ) : (
                                    <img className="thumb" src={blankImg} />
                                )}
                                <div className="container">
                                    <h4>
                                        <b>{p.title}</b>
                                    </h4>
                                    <Link key={p.id} to={`/posts/${p.id}`}>Read More</Link>
                                </div>
                                <p>
                                    {p.created} by {p.created_by}
                                </p>
                            </div>
                        
                    ))}

                    <div className="page-container">
                        <div>
                            Showing {posts?.meta?.from} to {posts?.meta?.to}{" "}
                            from {posts?.meta?.total} results.
                        </div>
                        &nbsp;
                        <div>{renderPaginationLinks()}</div>
                    </div>
                </div>
            )}
        </>
    );
}
