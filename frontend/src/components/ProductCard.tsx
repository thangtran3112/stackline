import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductDetails } from "../stores/slices/productsSlice";
import { Box, Chip, Container, useTheme } from "@mui/material";

// https://mui.com/material-ui/react-card/#media
export default function ProductCard({ product }: { product: ProductDetails }) {
  return (
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
          sx={{ maxWidth: 400, height: 400 }}
          image={product.image}
          title="some product"
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
  );
}
