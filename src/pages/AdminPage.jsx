import React, { useState } from "react";
import usePagination from "../hooks/usePagination";
import useFilters from "../hooks/useFilters";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Button from "../components/Button";
import {
  MdEdit,
  MdOutlineArrowForwardIos,
  MdReadMore,
  MdDelete,
} from "react-icons/md";
import AddUserForm from "../components/AddUserForm";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const navigate = useNavigate();

  // STATE ZA EDITOVANJE PODCASTA
  const [editingPodcasts, setEditingPodcasts] = useState({});
  const [podcastEdits, setPodcastEdits] = useState({});

  // USERS HOOKOVI
  const {
    filters: userFilters,
    setFilter: setUserFilter,
    clearFilters: clearUserFilters,
  } = useFilters({ query: "" });
  const {
    data: users,
    loading: loadingUsers,
    currentPage: userPage,
    totalPages: userTotalPages,
    goToPage: goToUserPage,
    fetchPage: fetchUsers,
  } = usePagination("users", 1, 5);

  // PODCASTS HOOKOVI
  const {
    filters: podcastFilters,
    setFilter: setPodcastFilter,
    clearFilters: clearPodcastFilters,
  } = useFilters({ query: "" });
  const {
    data: podcasts,
    loading: loadingPodcasts,
    currentPage: podcastPage,
    totalPages: podcastTotalPages,
    goToPage: goToPodcastPage,
    fetchPage: fetchPodcasts,
  } = usePagination("podcasts", 1, 5);

  // DELETE USER
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Da li sigurno želiš da obrišeš ovog korisnika?"))
      return;

    try {
      const token = sessionStorage.getItem("access_token");
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(1, userFilters.query ? { name: userFilters.query } : {});
      alert("Korisnik uspešno obrisan.");
    } catch (err) {
      console.error(
        "Greška pri brisanju korisnika:",
        err.response?.data || err
      );
      alert("Greška pri brisanju korisnika.");
    }
  };

  // DELETE PODCAST
  const handleDeletePodcast = async (id) => {
    if (!window.confirm("Da li sigurno želiš da obrišeš ovaj podkast?")) return;
    try {
      const token = sessionStorage.getItem("access_token");
      await api.delete(`podcasts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPodcasts(
        podcastPage,
        podcastFilters.query ? { title: podcastFilters.query } : {}
      );
    } catch (err) {
      alert("Greška pri brisanju podkasta.");
    }
  };

  // Funkcija za paginaciju dugmice
  const renderPagination = (
    currentPage,
    totalPages,
    goToPage,
    filters,
    setFilter
  ) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
        gap: "0.5rem",
      }}
    >
      <Button
        onClick={() => {
          setFilter("page", 1);
          goToPage(1, filters);
        }}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft />
      </Button>
      <Button
        onClick={() => {
          setFilter("page", currentPage - 1);
          goToPage(currentPage - 1, filters);
        }}
        disabled={currentPage === 1}
      >
        Prethodna
      </Button>
      <span style={{ margin: "0 1rem" }}>
        Strana {currentPage} od {totalPages}
      </span>
      <Button
        onClick={() => {
          setFilter("page", currentPage + 1);
          goToPage(currentPage + 1, filters);
        }}
        disabled={currentPage === totalPages}
      >
        Sledeća
      </Button>
      <Button
        onClick={() => {
          setFilter("page", totalPages);
          goToPage(totalPages, filters);
        }}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight />
      </Button>
    </div>
  );

  return (
    <Layout>
      <div
        className="admin-page"
        style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 20px" }}
      >
        <h1>Administracija</h1>

        {/* TAB NAVIGACIJA */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setActiveTab("users")}
            disabled={activeTab === "users"}
          >
            Korisnici
          </Button>
          <Button
            onClick={() => setActiveTab("podcasts")}
            disabled={activeTab === "podcasts"}
          >
            Podkasti
          </Button>
        </div>

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div>
            <h2>Korisnici</h2>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Pretraži po imenu"
                value={userFilters.query}
                onChange={(e) => setUserFilter("query", e.target.value)}
              />
              <Button
                onClick={() => fetchUsers(1, { name: userFilters.query })}
              >
                Pretraži
              </Button>
              <Button
                onClick={() => {
                  clearUserFilters();
                  fetchUsers(1, {});
                }}
              >
                Resetuj
              </Button>
              <Button onClick={() => setShowAddUserForm(true)}>
                Dodaj korisnika
              </Button>
            </div>

            {loadingUsers ? (
              <p>Učitavanje...</p>
            ) : (
              <>
                <table
                  border="1"
                  cellPadding="10"
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ime</th>
                      <th>Email</th>
                      <th>Uloga</th>
                      <th>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <MdDelete color="#4338d6ff" size={20} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Nema korisnika</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {renderPagination(
                  userPage,
                  userTotalPages,
                  goToUserPage,
                  userFilters,
                  setUserFilter
                )}
              </>
            )}

            {showAddUserForm && (
              <AddUserForm
                onClose={() => setShowAddUserForm(false)}
                onUserAdded={() =>
                  fetchUsers(
                    1,
                    userFilters.query ? { name: userFilters.query } : {}
                  )
                }
              />
            )}
          </div>
        )}

        {/* PODCASTS TAB */}
        {activeTab === "podcasts" && (
          <div>
            <h2>Podkasti</h2>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Pretraži po nazivu"
                value={podcastFilters.query}
                onChange={(e) => setPodcastFilter("query", e.target.value)}
              />
              <Button
                onClick={() =>
                  fetchPodcasts(1, { title: podcastFilters.query })
                }
              >
                Pretraži
              </Button>
              <Button
                onClick={() => {
                  clearPodcastFilters();
                  fetchPodcasts(1, {});
                }}
              >
                Resetuj
              </Button>
            </div>

            {loadingPodcasts ? (
              <p>Učitavanje...</p>
            ) : (
              <>
                <table
                  border="1"
                  cellPadding="10"
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Naziv</th>
                      <th>Opis</th>
                      <th>Kreator</th>
                      <th>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {podcasts.length > 0 ? (
                      podcasts.map((p) => {
                        const isEditing = editingPodcasts[p.id] || false;
                        const editedTitle =
                          podcastEdits[p.id]?.title ?? p.title;
                        const editedDescription =
                          podcastEdits[p.id]?.description ?? p.description;

                        const handleEditClick = () => {
                          setEditingPodcasts((prev) => ({
                            ...prev,
                            [p.id]: true,
                          }));
                          setPodcastEdits((prev) => ({
                            ...prev,
                            [p.id]: {
                              title: p.title,
                              description: p.description,
                            },
                          }));
                        };

                        const handleSaveClick = async () => {
                          try {
                            const token =
                              sessionStorage.getItem("access_token");
                            await api.post(
                              `podcasts/${p.id}?_method=PUT`,
                              {
                                title: editedTitle,
                                description: editedDescription,
                              },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
                            setEditingPodcasts((prev) => ({
                              ...prev,
                              [p.id]: false,
                            }));
                            fetchPodcasts(
                              podcastPage,
                              podcastFilters.query
                                ? { title: podcastFilters.query }
                                : {}
                            );
                          } catch (err) {
                            alert("Greška pri čuvanju podkasta.");
                          }
                        };

                        return (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editedTitle}
                                  onChange={(e) =>
                                    setPodcastEdits((prev) => ({
                                      ...prev,
                                      [p.id]: {
                                        ...prev[p.id],
                                        title: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              ) : (
                                p.title
                              )}
                            </td>
                            <td>
                              {isEditing ? (
                                <textarea
                                  value={editedDescription}
                                  onChange={(e) =>
                                    setPodcastEdits((prev) => ({
                                      ...prev,
                                      [p.id]: {
                                        ...prev[p.id],
                                        description: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              ) : (
                                p.description
                              )}
                            </td>
                            <td>{p.author || "N/A"}</td>
                            <td style={{ display: "flex", gap: "5px" }}>
                              {isEditing ? (
                                <button
                                  onClick={handleSaveClick}
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdOutlineArrowForwardIos
                                    color="#4338d6ff"
                                    size={20}
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={handleEditClick}
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdEdit color="#4338d6ff" size={20} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeletePodcast(p.id)}
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                }}
                              >
                                <MdDelete color="#4338d6ff" size={20} />
                              </button>
                              <button
                                onClick={() => navigate(`/podcasts/${p.id}`)}
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                }}
                              >
                                <MdReadMore color="#3d2ffeff" size={20} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5">Nema podkasta</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {renderPagination(
                  podcastPage,
                  podcastTotalPages,
                  goToPodcastPage,
                  podcastFilters,
                  setPodcastFilter
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AdminPage;
