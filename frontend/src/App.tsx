import { ThemeProvider, createTheme } from "@mui/material";
import { useState, useEffect } from "react";
import ImageList from "./components/ImageList";
import UploadImages from "./components/UploadImages";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const theme = createTheme({});

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleSendFile = async () => {
    try {
      setSending(true);
      const formData = new FormData();
      formData.append("file", file!);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      setSending(false);
      setFile(null);
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getImages = async () => {
    const response = await fetch("http://localhost:5000/images");
    const data = await response.json();
    setImages(data.images);
  };
  useEffect(() => {
    getImages();
  }, [sending]);

  return (
    <ThemeProvider theme={theme}>
      <UploadImages
        file={file}
        sending={sending}
        onSelectFile={handleSelectFile}
        onSendFile={handleSendFile}
      />
      <ImageList images={images} />
    </ThemeProvider>
  );
};

export default App;
