import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Notifications from 'expo-notifications';
import * as SMS from 'expo-sms';



interface CardProps {
    name: string;
    phone: string;
}

const sendPushNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission non accordée pour les notifications');
        return;
    }
    

    const { result } = await SMS.sendSMSAsync(
        ['+33782604856'],
        'Hello World' 
    );


    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      
     
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Look at that notification',
          body: "I'm so proud of myself!",
        },
        trigger: null,
      });
};


export default function Card(props: CardProps) {
    
    return (
        <TouchableOpacity onPress={sendPushNotification}>
            <View style={styles.card}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.phone}>{props.phone}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 6,
        marginHorizontal: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    phone: {
        fontSize: 14,
        color: "#666",
    },
});
