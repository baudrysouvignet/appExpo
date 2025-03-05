import * as Location from 'expo-location';

export class LocationService {
  static async getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission non accordée pour la localisation');
      return null;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      console.error('Erreur lors de la récupération de la localisation :', error);
      return null;
    }
  }
}
