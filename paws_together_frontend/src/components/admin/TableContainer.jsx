const TableContainer = ({
  title,
  fieldset,
  data,
  RowComponent,
  setData,
  linkButton,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={fieldset.length} className="text-center">
            <div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0 items-center w-full p-2">
              <h1>{title}</h1>
              {linkButton}
            </div>
          </th>
        </tr>
        <tr className="hidden lg:table-row">
          {fieldset.map((field) => {
            return (
              <th className="lg:border px-8 py-2 text-center" key={field}>
                {field}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <>
            <tr className="hidden lg:table-row">
              <td colSpan={fieldset.length} className="text-center p-2">
                There's no {title.toLowerCase()}.
              </td>
            </tr>
            <p className="text-center lg:hidden">
              There's no {title.toLowerCase()}.
            </p>
          </>
        ) : (
          data.map((row) => {
            return (
              <RowComponent
                fieldset={fieldset}
                key={row.id}
                row={row}
                setData={setData}
              />
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TableContainer;
