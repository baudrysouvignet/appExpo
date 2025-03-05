import * as Notifications from 'expo-notifications';
import * as SMS from 'expo-sms';
import * as Haptics from 'expo-haptics';

export class NotificationService {
  static async sendSMS(phone: string, message: string) {
    try {
      const { result } = await SMS.sendSMSAsync([phone], message);
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du SMS :', error);
      return "canceled";
    }
  }

  static async scheduleNotification(message: string) {
    try {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
          });
        
        
        Notifications.scheduleNotificationAsync({
            content: {
              title: "Une insulte envoye 🎉🎉",
              body: message,
            },
            trigger: null,
        });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Erreur lors de la programmation de la notification :', error);
    }
  }
}
