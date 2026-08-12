function DepartmentFilters({
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="card p-4 mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default DepartmentFilters;