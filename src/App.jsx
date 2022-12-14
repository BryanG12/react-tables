import { useCallback, useMemo, useState } from 'react';
import fetchUsers from './assets/fechtUser';
import Table from './Table';

const App = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback(async function (page) {
    setIsLoading(true);
    const json = await fetchUsers(page + 1);
    setUsers(json.data);
    setPageCount(json.total_pages);
    setIsLoading(false);
  }, []);


  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Nombre",
        accessor: "first_name"
      }
    ], []);


  return (
    <div className="wenas">

      <div className="App">
        <h1>
          <span role="img" aria-label="heart">
            💛
          </span>{" "}
          Hola React Table!
        </h1>

        <Table
          columns={columns}
          data={users}
          fetchData={fetchData}
          pageCount={pageCount}
        />
        {isLoading && <div>Cargando...</div>}

      </div>
    </div>
  );
};

export default App;
