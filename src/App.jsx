import { useMemo } from "react";
import { Column, useTable, useGlobalFilter, useSortBy } from "react-table";
import data from "./data";

const App = () => {

  const columns = useMemo(
    () => [
      {
        Header: "Informacion Personal",
        Footer: "Informacion Personal",
        columns: [
          {

            Header: "Id",
            Footer: "Id",
            accessor: "id",
            Cell: ({ value }) => <strong>{value}</strong>
          },
          {
            Header: "Nombre",
            Footer: "Nombre",
            accessor: "name"
          },
          {
            Header: "Correo",
            Footer: "Correo",
            accessor: "email"
          },
          {
            Header: "Edad",
            Footer: (info) => {
              const media = useMemo(
                () => info.data.reduce((sum, data) => data.age + sum, 0), [info.data]
              );
              return <>Media: {media / info.data.length} </>
            },

            accessor: "age",
          }
        ]
      },
      {
        Header: 'Informacion laboral',
        Footer: "Información Laboral",
        columns: [

          {
            Header: "companía",
            Footer: "companía",
            accessor: "company"
          },
          {
            Header: "Lenguaje",
            Footer: "Lenguaje",
            accessor: "languaje"
          },
        ]
      },
    ], []);

  const tableInstance = useTable({ columns, data }, useGlobalFilter,
    useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state
  } = tableInstance;


  return (
    <div className="wenas">

      <div className="App">
        <h1>
          <span role="img" aria-label="heart">
            💛
          </span>{" "}
          Hola React Table!
        </h1>

        <table {...getTableProps()}>

          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="xd">{column.render("Header")}
                    <span>
                      {
                        column.isSorted
                          ? column.isSortedDesc
                            ? "🔻"
                            : "🔺"
                          : ""
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            {footerGroups.map((group) => (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>

        </table>
        <div>
          <p>Total de registros: {preGlobalFilteredRows.length} </p>
          <input type="text"
            value={state.globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
