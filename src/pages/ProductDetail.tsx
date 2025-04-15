import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Rating,
  Box,
  CircularProgress,
  Paper,
  Chip,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { Product } from '../types/product';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            />
            <ImageList sx={{ height: 200 }} cols={3} rowHeight={164}>
              {product.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
              {product.discountPercentage > 0 && (
                <Chip
                  label={`${product.discountPercentage}% OFF`}
                  color="error"
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.rating})
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Brand: <Chip label={product.brand} variant="outlined" />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Category: <Chip label={product.category} variant="outlined" />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Stock: <Chip label={`${product.stock} units`} color={product.stock > 0 ? "success" : "error"} />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
