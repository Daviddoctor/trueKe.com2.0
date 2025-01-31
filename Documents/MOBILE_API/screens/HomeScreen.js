import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card, Title, Paragraph, Button, TextInput } from 'react-native-paper';

const HomeScreen = () => {
  const carouselItems = [
    {
      title: "Promoción 1",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Promoción 2",
      image: "https://via.placeholder.com/300",
    },
    // Añadir más promociones aquí
  ];

  return (
    <ScrollView>
      <Swiper style={styles.wrapper} showsButtons loop>
        {carouselItems.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        ))}
      </Swiper>

      <View style={styles.cardsContainer}>
        <Title style={styles.sectionTitle}>Categorías</Title>
        <ScrollView horizontal>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://via.placeholder.com/150' }} />
            <Card.Content>
              <Title>Categoría 1</Title>
              <Paragraph>Descripción de la categoría 1</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://via.placeholder.com/150' }} />
            <Card.Content>
              <Title>Categoría 2</Title>
              <Paragraph>Descripción de la categoría 2</Paragraph>
            </Card.Content>
          </Card>
          {/* Añadir más tarjetas aquí */}
        </ScrollView>
      </View>

      <View style={styles.contactForm}>
        <Title style={styles.sectionTitle}>Contáctanos</Title>
        <TextInput
          label="Nombre"
          style={styles.input}
        />
        <TextInput
          label="Correo electrónico"
          style={styles.input}
        />
        <TextInput
          label="Mensaje"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <Button mode="contained" onPress={() => console.log('Formulario enviado')}>
          Enviar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  carouselImage: {
    width: '100%',
    height: 150,
  },
  carouselText: {
    textAlign: 'center',
    marginTop: 10,
  },
  cardsContainer: {
    marginTop: 20,
  },
  card: {
    width: 150,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  contactForm: {
    marginTop: 20,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default HomeScreen;
