import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [topBookmarks, setTopBookmarks] = useState([]);

  useEffect(() => {
    const getTopBookmarks = async () => {
      const {data} = await axios.get('/api/home/topfive');
      setTopBookmarks(data);
    }
    getTopBookmarks();
  }, []);

  return(
    <>
    <h1>Welcome to the Bookmarks App</h1>
    <h3>Top 5 Bookmarked Links</h3>
    <table className="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th>Url</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
       {topBookmarks.map(b => <tr key={b.url}>
         <td>
           <a href={b.url} target="_blank">{b.url}</a>
         </td>
         <td>{b.count}</td>
       </tr>)}
      </tbody>
    </table>
    </>
  )
}

export default Home;