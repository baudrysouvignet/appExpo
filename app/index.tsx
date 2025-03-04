import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StatusBar } from "react-native";
import * as Contacts from 'expo-contacts';
import Card from "./components/Card";
import { Button } from "react-native-paper";
import * as Notifications from 'expo-notifications';
import * as SMS from 'expo-sms';

const sendPushNotification = async () => {
  // Demande d'autorisation pour les notifications
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission non accordée pour les notifications');
    return;
  }

  let insulte = "Hello World"
  try {
    const { result } = await SMS.sendSMSAsync(
      ['+33782604856'],
      insulte
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS :', error);
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Insulte envoye',
        body: insulte ,
      },
      trigger: null,
    });
    console.log('Notification programmée avec succès');
  } catch (error) {
    console.error('Erreur lors de la programmation de la notification :', error);
  }
};

export default function Index() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);


  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });
        setContacts(data);
      }

    })();
  }, []);

  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <Card phone={item.phoneNumbers?.map(phone => phone.number).join(', ') ?? ''} name={item.name} />
  );


  return (
    <View >
      <Button
        onPress={sendPushNotification}
        style={{
          margin: 10,
          backgroundColor: 'red',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Envoie une insulte</Text>  {/* Texte blanc */}
      </Button>
    </View>
  );
}