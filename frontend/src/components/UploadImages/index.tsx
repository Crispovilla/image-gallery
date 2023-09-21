import { Upload } from "@mui/icons-material";
import { Button, Box, Typography, CircularProgress } from "@mui/material";

interface UploadImagesProps {
  file?: File | null;
  sending?: boolean;
  onSelectFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendFile?: () => void;
}

const UploadImages = ({
  file = null,
  sending = false,
  onSelectFile = () => {},
  onSendFile = () => {},
}: UploadImagesProps) => {
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectFile(event);
    //console.log(event.target.files?.[0]);
  };
  const handleSendFile = () => {
    onSendFile();
  };
  return (
    <>
      <Box display="flex" justifyContent="center" mt={4}>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={handleSelectFile}
          style={{ display: "none" }}
        />
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            Seleccionar imagen
          </Button>
        </label>
        <Button
          disabled={!file}
          variant="contained"
          color="success"
          startIcon={<Upload />}
          onClick={handleSendFile}
          sx={{ ml: 1 }}
        >
          Subir {sending && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Button>
      </Box>
      {file && (
        <Typography component="p" variant="caption" mt={2} textAlign="center">
          Selected file: {file?.name}
        </Typography>
      )}
    </>
  );
};

export default UploadImages;
