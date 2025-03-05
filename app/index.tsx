// Index.tsx
import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { LocationService } from './bundles/LocationService';
import { NotificationService } from './bundles/NotificationService';
import { ContactService } from './bundles/ContactService';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';



const generateMessage = (location: any, insult: string) => {
  return `${insult}\n\nVient me chercher si tu veux : \nLat: ${location.coords.latitude}, \nLong: ${location.coords.longitude}`;
};

const Index = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const fetchedContacts = await ContactService.getContacts();
      setContacts(fetchedContacts);

      const storedClickCount = await AsyncStorage.getItem('clickCount');
      if (storedClickCount) {
        setClickCount(Number(storedClickCount));  // Mettre à jour l'état avec la valeur récupérée
      }
    })();
  }, []);

  const handleSendNotification = async () => {
    if (contacts.length > 0) {
      const randomContact = ContactService.getRandomContact(contacts);
      const randomPhone = randomContact.phoneNumbers?.[0]?.number;

      if (randomPhone) {
        const location = await LocationService.getLocation();
        if (location) {
          const insultesDevHard = [
            "Nique ta mère, sale fils de pute",
            "Fils de chienne, va sucer ton daron",
            "Ta mère la grosse salope du quartier",
            "Bâtard mal fini, t’es un avorton",
            "Va niquer ta grand-mère, sac à merde",
            "Ton père c’est une sous-pute à 2 balles",
            "Ta daronne suce des queues en boucle",
            "Espèce de chien, t’as bouffé ta sœur",
            "Nique ton cul, sale enculé de mes deux",
            "Ta mère la tepu, elle prend cher",
            "Fils de rat, t’es né dans une poubelle",
            "Ton daron c’est un pédé fini",
            "Ta reuss c’est une chienne galeuse",
            "Nique ta race, sale bâtard dégénéré",
            "Ta mère fait la pute pour des clopes",
            "T’es le sperme rance de ton vieux",
            "Va niquer ton chien, fils de truie",
            "Ta daronne c’est une poubelle à foutre",
            "Sale enculé, t’as pas de couilles",
            "Nique ta lignée, t’es une erreur"
          ];

          const insulte = `${insultesDevHard[Math.floor(Math.random() * insultesDevHard.length)]}`
          //const insulte = "Hello World"
          const message = generateMessage(location, insulte);
          const smsSent = await NotificationService.sendSMS(randomPhone, message);

          if (smsSent == "sent") {
            const newClickCount = clickCount + 1;
            setClickCount(newClickCount);

            await AsyncStorage.setItem('clickCount', newClickCount.toString());

            await NotificationService.scheduleNotification(message);
          }
        }
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5428',
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#FF5428',
          borderRadius: 200,
          width: 300,
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          borderWidth: 10,
          borderColor: 'white',
        }}
        onPress={handleSendNotification}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Envoie une insulte
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Tu as deja envoyee {clickCount} insultes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
