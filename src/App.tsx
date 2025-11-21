import React, { useCallback } from "react";
import { PersonInfo } from "./components/PersonInfo";
import { useApiInfinite } from "./hooks/useApiInfinite";
import { PersonInfoType } from "./types";
import { SelectedItems } from "./components/SelectedItems";
import "./App.css";

function App() {
  const [selected, setSelected] = React.useState<PersonInfoType[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useApiInfinite();

  const handleSelectItem = useCallback(
    (selectedItem: PersonInfoType) => {
      setSelected((prevSelected) => {
        if (prevSelected.find((item) => item.id === selectedItem.id)) {
          return prevSelected.filter((item) => item.id !== selectedItem.id);
        } else {
          return [...prevSelected, selectedItem];
        }
      });
    },
    [setSelected]
  );

  const flattenedData = data?.pages.flat() ?? [];

  return (
    <div className="App">
      <SelectedItems items={selected} onItemClick={handleSelectItem} />
      <div className="scrollable-container">
        <h1>Contact list</h1>
        {status === "pending" && (
          <div className="spinner-wrapper">
            <span className="spinner" />
          </div>
        )}
        <ul className="contact-list">
          {flattenedData.map((personInfo) => (
            <PersonInfo
              key={personInfo.id}
              item={personInfo}
              onItemClick={handleSelectItem}
              isSelected={!!selected.find((item) => item.id === personInfo.id)}
            />
          ))}
        </ul>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetching || isFetchingNextPage}
            className="load-more-button"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
        {status === "error" && <p className="error">Error: {error?.message}</p>}
      </div>
    </div>
  );
}

export default App;
