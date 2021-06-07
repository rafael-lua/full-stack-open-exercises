import React from "react";
import { useQuery } from "@apollo/client";

import { ALL_RECOMMENDED_BOOKS } from "../queries";

const Recommended = ({ show, user }) => {
  const recommendedBooks = useQuery(ALL_RECOMMENDED_BOOKS, {
    pollInterval: 2000,
  });

  if (!show) {
    return null;
  } else if (recommendedBooks.loading) {
    return <div>loading...</div>;
  } else if (!recommendedBooks.data.allRecommendedBooks) {
    return <div>no recommendentions yet...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        based on your favorite genre: <strong>{user.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.data.allRecommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
