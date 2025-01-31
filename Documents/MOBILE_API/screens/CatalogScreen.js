import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';

const products = [
  {
    id: '1',
    name: 'Producto 1',
    description: 'Descripción del Producto 1',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Producto 2',
    description: 'Descripción del Producto 2',
    image: 'https://via.placeholder.com/150',
  },
  // Añadir más productos aquí
];

const CatalogScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchbar: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default CatalogScreen;