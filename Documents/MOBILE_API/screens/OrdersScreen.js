import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const orders = [
  {
    id: '1',
    date: '2023-01-01',
    status: 'Entregado',
    items: [
      { name: 'Producto 1', quantity: 2 },
      { name: 'Producto 2', quantity: 1 },
    ],
  },
  {
    id: '2',
    date: '2023-01-05',
    status: 'En camino',
    items: [
      { name: 'Producto 3', quantity: 1 },
    ],
  },
  // Añadir más pedidos aquí
];

const OrdersScreen = () => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Pedido #{item.id}</Title>
        <Paragraph>Fecha: {item.date}</Paragraph>
        <Paragraph>Estado: {item.status}</Paragraph>
        <Paragraph>Artículos:</Paragraph>
        {item.items.map((product, index) => (
          <Paragraph key={index}>{product.quantity} x {product.name}</Paragraph>
        ))}
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log('Reordenar')}>Reordenar</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
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
  card: {
    marginBottom: 10,
  },
});

export default OrdersScreen;
