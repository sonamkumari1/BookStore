import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from '../components/BookCard/BookCard'

function AllBook() {

  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='p-5 bg-zinc-900'>
      <h4 className="text-5xl font-semibold text-center text-yellow-100 my-10">All books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 p-5">
        {data &&
          data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllBook
