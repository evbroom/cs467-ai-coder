// table container used by both managing pet profiles and managing users

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
        {data.map((item) => {
          return <RowComponent key={item.id} item={item} setData={setData} />;
        })}
      </tbody>
    </table>
  );
};

export default TableContainer;
