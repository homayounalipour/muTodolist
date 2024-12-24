import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { UserProps } from "@/app/page";

export type DialogProps = {
  isViewOpen: boolean;
  handleCloseView: () => void;
  viewUser: UserProps | null;
};
export const ViewDialog = (props: DialogProps) => {
  const { handleCloseView, viewUser, isViewOpen } = props;
  return (
    <Dialog
      open={isViewOpen}
      onClose={handleCloseView}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": { borderRadius: "12px", padding: "16px" },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        User Details
      </DialogTitle>

      <DialogContent>
        {viewUser ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "16px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="body1">
              <strong>Name:</strong> {viewUser.name}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {viewUser.age}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {viewUser.country}
            </Typography>
            <Typography variant="body1">
              <strong>Favorite Genres:</strong>{" "}
              {viewUser.favoriteGenres.join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Is Try Catch:</strong>{" "}
              {viewUser.isTryCatch ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Yes ✅
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>No ❌</span>
              )}
            </Typography>
          </Box>
        ) : (
          <Typography textAlign="center" color="textSecondary">
            No user selected
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={handleCloseView}
          variant="contained"
          color="primary"
          sx={{ paddingX: 4, borderRadius: "8px" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
