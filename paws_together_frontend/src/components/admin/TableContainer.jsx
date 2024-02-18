// Table contianer component for both pet profiles and users
const TableContainer = ({ fieldset, data, RowComponent, setData }) => {
  return (
    <table className="mx-auto">
      <thead>
        <tr className="border">
          {fieldset.map((field) => {
            return (
              <th className="px-8 py-2 border text-center" key={field}>
                {field}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return <RowComponent key={row.id} row={row} setData={setData} />;
        })}
      </tbody>
    </table>
  );
};

export default TableContainer;
