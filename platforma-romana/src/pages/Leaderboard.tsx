import { useEffect, useState } from "react";
import { UserLeaderboard } from "../props/Props";
import { fetchLeaderboard } from "../functions/useApi";

const Leaderboard = () => {
  const [users, setUsers] = useState<UserLeaderboard[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    async function getLeaderboard() { 
      const users_ = await fetchLeaderboard();
      setUsers(users_);
    }

    getLeaderboard();
  }, []);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (users) {
      if (indexOfLastUser < users.length) {
        setCurrentPage(currentPage + 1);
      }
    } 
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Total experience</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user, index) => (
            <tr key={user.Id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.Name}</td>
              <td>{user.Experience}</td>
              <td>{Math.floor(user.Experience/1000) + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ◀ Înapoi
        </button>
        <span>Page {currentPage}</span>
        {users && <button onClick={nextPage} disabled={indexOfLastUser >= users.length}>
          Înainte ▶
        </button>}
      </div>
    </div>
  );
};

export default Leaderboard;

