import { Patient } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    dateOfBirth: '1980-05-15',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    address: '123 rue de Paris, 75001 Paris',
    socialSecurityNumber: '1 80 05 75 123 456',
    prescribingDoctor: 'Dr. Martin',
    medicalHistory: 'Antécédents d\'entorse de la cheville droite',
    notes: 'Patient régulier, bon suivi des exercices'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Laurent',
    dateOfBirth: '1992-09-23',
    email: 'marie.laurent@email.com',
    phone: '06 98 76 54 32',
    address: '45 avenue des Champs-Élysées, 75008 Paris',
    socialSecurityNumber: '2 92 09 75 789 123',
    prescribingDoctor: 'Dr. Bernard',
    medicalHistory: 'Lombalgie chronique',
    notes: 'Nécessite un suivi régulier'
  },
  // Ajouter d'autres patients...
];