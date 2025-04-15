import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  CardActionArea,
  CircularProgress,
  Box,
} from '@mui/material';
import { Product } from '../types/product';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Products
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={3}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            flexBasis={{
              xs: '100%',
              sm: '48%',
              md: '30%',
            }}
            sx={{ flexGrow: 1 }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={`/product/${product.id}`}
                aria-label={`View details for ${product.title}`}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph noWrap>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating})
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
