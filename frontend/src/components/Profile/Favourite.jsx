import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';

function Favourite() {
    const [favouriteBooks, setFavouriteBooks] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetchFavouriteBooks = async () => {
            const response = await axios.get("http://localhost:1000/api/get-favourite-books", { headers });
            setFavouriteBooks(response.data.data);
        };
        fetchFavouriteBooks();
    }, [favouriteBooks]);  // Empty dependency array to run only once

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {favouriteBooks &&
            favouriteBooks.map((item, i) => (
                <div key={i}>
                    <BookCard data={item} favourite={true} />
                </div>
            ))
        }
    </div>
    );
}

export default Favourite;
