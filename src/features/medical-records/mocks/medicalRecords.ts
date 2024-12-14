import { MedicalRecord } from '../types';

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patient: {
      id: '1',
      firstName: 'Sophie',
      lastName: 'Martin',
      dateOfBirth: '1985-03-15',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    bloodType: 'A+',
    allergies: ['Pénicilline'],
    medicalHistory: 'Antécédents d\'entorse de la cheville droite',
    documents: [
      {
        id: '1',
        name: 'Ordonnance.pdf',
        type: 'application/pdf',
        date: '2024-03-01',
        url: '/documents/ordonnance.pdf'
      },
      {
        id: '2',
        name: 'Radio_cheville.jpg',
        type: 'image/jpeg',
        date: '2024-02-28',
        url: '/documents/radio.jpg'
      }
    ],
    treatments: [
      {
        id: '1',
        patientId: '1',
        startDate: '2024-02-15',
        diagnosis: 'Entorse cheville droite',
        objectives: ['Réduction douleur', 'Mobilité'],
        sessions: [
          {
            id: '1',
            treatmentId: '1',
            date: '2024-02-15',
            progress: 100,
            exercises: []
          }
        ]
      }
    ],
    notes: [
      {
        id: '1',
        date: '2024-03-01',
        content: 'Première consultation suite à entorse',
        author: 'Dr. Martin'
      }
    ]
  }
];