const CommonTable = ({ data = [], columns }) => {
  return (
    <table className="table mb-0" style={{
      minHeight: "400px",
      overflow: "auto"
    }}>
      <thead style={{ background: "#4D007D" }}>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="text-white">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, i) => (
          <tr key={i}>
            {columns?.map((col) => (
              <td key={col.key}>
                {col.renderCell
                  ? col.renderCell(col.key === 'srNo' ? i + 1 : row[col.key], row)
                  : col.key === 'srNo'
                    ? i + 1
                    : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default CommonTable;