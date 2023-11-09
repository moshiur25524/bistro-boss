import { useState } from "react";
import ReactPaginate from "react-paginate";
import useMenu from "../../hooks/useMenu";

const PaginatedItems = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const [menu] = useMenu();

  console.log(`Items offset from ${itemOffset} to ${endOffset}`);

  const menuItems = menu.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(menu.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % menu.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
