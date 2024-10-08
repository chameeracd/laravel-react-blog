import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            getUsers();
        });
    };

    const getUsers = (page) => {
        setLoading(true);
        axiosClient
            .get(`/users?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const fetchNextPrevPages = (link) => {
        const url = new URL(link);
        getUsers(url.searchParams.get("page"));
    };

    const renderPaginationLinks = () => {
        return (
            <ul className="pagination">
                {users?.meta?.links?.map((link, index) => (
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
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
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
                            {users?.data?.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/users/" + u.id}
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
                        Showing {users?.meta?.from} to {users?.meta?.to} from{" "}
                        {users?.meta?.total} results.
                    </div>
                    &nbsp;
                    <div>{renderPaginationLinks()}</div>
                </div>
            </div>
        </div>
    );
}
