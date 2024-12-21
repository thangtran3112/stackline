import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductDetails } from "../stores/slices/productsSlice";
import { Backdrop, Box, Chip, Container } from "@mui/material";
import { useState } from "react";

// https://mui.com/material-ui/react-card/#media
export default function ProductCard({ product }: { product: ProductDetails }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 420,
          maxHeight: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Container>
          <CardMedia
            sx={{ maxWidth: 400, height: 400, marginTop: 4 }}
            image={product.image}
            title="some product"
            onClick={handleOpen}
          />
        </Container>
        <CardContent>
          <Container>
            <Typography gutterBottom variant="h4" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.subtitle}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </Box>
          </Container>
        </CardContent>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img src={product.image} alt="Product" />
      </Backdrop>
    </>
  );
}
