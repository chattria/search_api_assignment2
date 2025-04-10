import { FormEvent, useState, ChangeEvent } from "react";
import "./App.css";
import axios from "axios";
import { IItem } from "./models/IItem";
import Pagination from "./component/Pagination";

function App() {
  const [textInput, setTextInput] = useState<string>("");
  const [items, setItems] = useState<IItem[] | null>(null);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const handelSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            q: textInput,
            key: "AIzaSyAXyiELEJUwl-mkXNQ28jwBqutGSlpajMA",
            cx: "475bb7935e3574618",
          },
        }
      );
      console.log(response.data);
      if (response.data.items === undefined) {
        throw new Error("No search resulte");
      }
      setCurrentPage(1);
      setItems(response.data.items);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      }
      console.log(error);
    }
  };

  const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items
    ? items.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Search API</h1>
      <section className="my-4 flex space-x-2">
        <input
          type="text"
          placeholder="search"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTextInput(e.target.value);
          }}
        />
        <button
          className="text-white bg-purple-700 rounded-lg px-4 hover:bg-purple-500 transition"
          onClick={handelSearch}
        >
          SEARCH
        </button>
      </section>

      <h2 className="text-xl font-semibold my-4">Results</h2>
      {error && <p>{error}</p>}

      <section className="w-full px-4 flex flex-wrap">
        {currentItems.map((item) => (
          <div
            key={item.title}
            className="max-w-md mx-auto my-4 content-center"
          >
            <section className="flex rounded-lg shadow-lg overflow-hidden items-center min-h-80">
              {item.pagemap.cse_thumbnail && (
                <img
                  src={item.pagemap.cse_thumbnail[0].src}
                  className="w-full object-cover h-48"
                />
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-black">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-4">{item.snippet}</p>
                <button className="text-white bg-purple-700 rounded-lg py-2 px-4 hover:bg-purple-500 transition">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    To Product
                  </a>
                </button>
              </div>
            </section>
          </div>
        ))}
      </section>
      {items && items.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default App;
