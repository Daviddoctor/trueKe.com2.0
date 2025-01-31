import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const notifications = [
  { id: '1', title: 'Promoción especial', body: 'Aprovecha un 20% de descuento en todos los productos.' },
  { id: '2', title: 'Nuevo Producto', body: 'Hemos añadido nuevos productos a nuestro catálogo.' },
  // Añadir más notificaciones aquí
];

const NotificationsScreen = () => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.body}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
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

export default NotificationsScreen;
