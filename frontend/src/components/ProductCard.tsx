import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductDetails } from "../stores/slices/productsSlice";
import { Box, Chip, Container } from "@mui/material";

// https://mui.com/material-ui/react-card/#media
export default function ProductCard({ product }: { product: ProductDetails }) {
  return (
    <Card
      sx={{
        margin: 2,
        paddingTop: 6,
        paddingBottom: 2,
        paddingRight: 2,
        paddingLeft: 2,
        maxWidth: 420,
        maxHeight: 600,
      }}
    >
      <CardMedia
        sx={{ maxWidth: 400, height: 400, padding: 2 }}
        image={product.image}
        title="some product"
      />

      <CardContent>
        <Container>
          <Typography gutterBottom variant="h5" component="div">
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
