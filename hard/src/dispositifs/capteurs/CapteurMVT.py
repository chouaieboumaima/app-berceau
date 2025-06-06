from communication.MouvementAPI import MouvementAPI
from dispositifs.capteurs.Capteur import Capteur
from gpiozero import MotionSensor  # Pour les capteurs de mouvement

class CapteurMouvement(Capteur):
    def __init__(self, pin=5):  # GPIO 4 par défaut
        self.mvt_sensor = MotionSensor(pin)
        self.api = MouvementAPI()

    def obtenir_mouvement(self, berceau_id):
        return self.api.get_mouvement_data(berceau_id)

    def lire_donnees(self):
        try:
            mouvement = self.mvt_sensor.value  # True si mouvement détecté, sinon False
            return mouvement
        except RuntimeError as e:
            print(f"Erreur de lecture du capteur de mouvement : {e}")
            return None

    
    def envoyer_donnees(self, berceau_id):
        mouvement = self.lire_donnees()
        if mouvement is not None:
            response = self.api.save_mouvement_data(berceau_id, (mouvement))  # Convertir en int (0 ou 1)
            print(f"Données envoyées : {response}")
        else:
            print("Échec de la lecture du capteur, données non envoyées.")

