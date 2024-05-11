import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../../app/store";
import { addSearchItem, deleteSearchItem } from './searchHistorySlice';

const SearchHistoryComponent = () => {
  // const searchHistory = useSelector(getAllSearchItems);
  const [searchTerm, setSearchTerm] = useState('');

  const searchHistory = useSelector((state: RootState) => state.searchHistory.history);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (item: string) => {
    dispatch(deleteSearchItem(item));
    console.log(item);
  };
  const handleSearch = () => {
    if (searchTerm!==''){
    dispatch(addSearchItem(searchTerm));
    setSearchTerm('');
  }

  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <button onClick={handleSearch}>Search</button>

      {searchHistory.length>0 && ( 
        <ul>
          {searchHistory?.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleDelete(item)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistoryComponent;