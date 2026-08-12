import { FaSearch } from "react-icons/fa";

function FacultySearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="card p-4 mb-6">
      <div className="search-box">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search by Name or Employee ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}

export default FacultySearch;