import { useEffect } from 'react';
import { useTable, usePagination } from 'react-table';


export default function Table({ data, fetchData, columns, pageCount: controlledPageCount }) {

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, //? Pagina inicial
      manualPagination: true,   //? Paginación manual
      pageCount: controlledPageCount //? Numero de paginas 
    },
    usePagination //? Hook
  );

  const {
    canPreviousPage, //? Puedo ir a pagina anterior
    canNextPage, //? Puedo ir a pagina siguiente
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,  //? Pagina anterior
    nextPage, //? Pagina siguiente
    previousPage,
    state: { pageIndex } //? Pagina actual
  } = tableInstance;

  useEffect(() => {
    fetchData(pageIndex);
  }, [pageIndex, fetchData]);

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
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
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
}
