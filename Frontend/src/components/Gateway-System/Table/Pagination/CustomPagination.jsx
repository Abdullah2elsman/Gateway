import propTypes from "prop-types";
import MuiPagination from "@mui/material/Pagination";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  GridPagination,
} from "@mui/x-data-grid";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
      sx={{
        "& .MuiPaginationItem-root": {
          color: "var(--text-black)",
        },
        "& .MuiPaginationItem-page": {
          color: "var(--text-black)",
        },
        "& .Mui-selected": {
          fontWeight: 600,
        },
        "& .Mui-selected:focus": {
          fontWeight: 600,
        },
        "& .Mui-selected:hover": {},
        "& .Mui-disabled": {
          color: "var(--text-gray)",
        },
      }}
    />
  );
}

const CustomPagination = (props) => {
  return (
    <GridPagination
      ActionsComponent={Pagination}
      {...props}
      sx={{
        color: "var(--text-black)",
        "& .MuiSvgIcon-root": {
          color: "var(--text-black)",
        },
      }}
    />
  );
};

Pagination.propTypes = {
  page: propTypes.number,
  onPageChange: propTypes.func.isRequired,
  className: propTypes.string,
};

export default CustomPagination;
