import propsTypes from "prop-types";
import Menu from "@mui/material/Menu";

const CustomizedMenus = ({ children, isOpen, handlerClose, width }) => {
  const open = Boolean(isOpen);

  return (
    <div>
      <Menu
        // elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: width || 180,
            maxWidth: width || 180,
            padding: "5px 0",
            borderRadius: "5px",
            marginTop: "8px",

            "@media (max-width: 768px)": {
              "&": {
                minWidth: "90% !important",
                maxWidth: "90% !important",
              },
            },
          },
          "& .MuiMenuItem-root": {
            "&:hover": {},
          },
        }}
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={isOpen}
        open={open}
        onClose={handlerClose}
      >
        {children}
      </Menu>
    </div>
  );
};

CustomizedMenus.propTypes = {
  children: propsTypes.node.isRequired,
  isOpen: propsTypes.any,
  handlerClose: propsTypes.func.isRequired,
  width: propsTypes.any,
};

export default CustomizedMenus;
