import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import propTypes from "prop-types";

const Simple = ({ cloumns, rows, height }) => {
  return (
    <>
      {rows.length === 0 && (
        <div style={{ textAlign: "center", paddingBottom: "30px" }}>
          <p style={{ color: "var(--text-black)" }}> This list is empty</p>
        </div>
      )}
      {rows.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "var(--bg-sidebar)",
            width: "100%",
            maxHeight: height || "100%",
            overflow: "auto",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {cloumns?.length > 0 &&
                  cloumns?.map((value, index) => (
                    <TableCell key={index} sx={{ color: "var(--text-black)" }}>
                      {value}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

Simple.propTypes = {
  cloumns: propTypes.any,
  rows: propTypes.any,
  height: propTypes.string,
};

export default Simple;
