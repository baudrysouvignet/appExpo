import * as Contacts from 'expo-contacts';

export class ContactService {
  static async getContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });
      return data;
    }
    return [];
  }

  static getRandomContact(contacts: Contacts.Contact[]) {
    return contacts[Math.floor(Math.random() * contacts.length)];
  }
}