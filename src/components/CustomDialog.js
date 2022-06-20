import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledBtn = styled(Button)({
  width: 100,
});

const StyledDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

StyledDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomDialog({
  isVisible,
  onClose = () => "",
  firstAction = () => "",
  firstBtn = "Save",
  secondAction = () => "",
  secondBtn = "Cancel",
  title = "Title",

  children,
}) {
  return (
    <div>
      <StyledDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isVisible}
        maxWidth={"lg"}
      >
        <StyledDialogTitle id="customized-dialog-title" onClose={onClose}>
          <Typography style={{ fontSize: "16pt" }}>{title}</Typography>
        </StyledDialogTitle>
        <DialogContent dividers>
          <div style={{ minWidth: 300, minHeight: 100 }}>{children}</div>
        </DialogContent>
        <DialogActions>
          <StyledBtn
            autoFocus
            onClick={firstAction}
            variant={"contained"}
            color={"secondary"}
          >
            {secondBtn}
          </StyledBtn>
          <StyledBtn
            autoFocus
            onClick={secondAction}
            variant={"contained"}
            color={"primary"}
          >
            {firstBtn}
          </StyledBtn>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
