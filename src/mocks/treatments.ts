import { Treatment } from '../types';

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    patientId: '1',
    startDate: '2024-02-15',
    diagnosis: 'Entorse de la cheville droite',
    objectives: [
      'Réduction de la douleur',
      'Récupération de la mobilité',
      'Renforcement musculaire'
    ],
    prescriptionDetails: 'Séances de rééducation 3x/semaine pendant 6 semaines',
    sessions: [
      {
        id: '1',
        treatmentId: '1',
        date: '2024-02-15',
        exercises: [
          {
            id: '1',
            name: 'Mobilisation passive',
            description: 'Mobilisation de la cheville',
            duration: 15,
            repetitions: 10,
            sets: 3
          }
        ],
        notes: 'Première séance, patient coopératif',
        progress: 100
      },
      {
        id: '2',
        treatmentId: '1',
        date: '2024-02-17',
        exercises: [
          {
            id: '2',
            name: 'Renforcement proprioception',
            description: 'Exercices sur plateau instable',
            duration: 20,
            repetitions: 15,
            sets: 2
          }
        ],
        notes: 'Amélioration de la stabilité',
        progress: 75
      }
    ]
  },
  {
    id: '2',
    patientId: '2',
    startDate: '2024-03-01',
    diagnosis: 'Lombalgie chronique',
    objectives: [
      'Soulagement des douleurs',
      'Amélioration de la posture',
      'Renforcement musculaire du dos'
    ],
    prescriptionDetails: 'Séances de rééducation 2x/semaine pendant 8 semaines',
    sessions: [
      {
        id: '3',
        treatmentId: '2',
        date: '2024-03-01',
        exercises: [
          {
            id: '3',
            name: 'Étirements',
            description: 'Étirements des muscles lombaires',
            duration: 20,
            repetitions: 5,
            sets: 2
          }
        ],
        notes: 'Début du traitement',
        progress: 100
      }
    ]
  }
];