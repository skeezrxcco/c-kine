import { PrismaClient } from "@prisma/client";
import { addDays, subDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.$transaction([
    prisma.teleClaim.deleteMany(),
    prisma.bill.deleteMany(),
    prisma.exercise.deleteMany(),
    prisma.session.deleteMany(),
    prisma.note.deleteMany(),
    prisma.document.deleteMany(),
    prisma.medicalRecord.deleteMany(),
    prisma.treatment.deleteMany(),
    prisma.appointment.deleteMany(),
    prisma.patient.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create users (kinésithérapeutes)
  const user1 = await prisma.user.create({
    data: {
      email: "thomas.dubois@cabinet-kine.fr",
      firstName: "Thomas",
      lastName: "Dubois",
      role: "KINE",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "marie.laurent@cabinet-kine.fr",
      firstName: "Marie",
      lastName: "Laurent",
      role: "KINE",
    },
  });

  // Create patients
  const patient1 = await prisma.patient.create({
    data: {
      firstName: "Sophie",
      lastName: "Martin",
      email: "sophie.martin@email.fr",
      phone: "+33612345678",
      dateOfBirth: new Date("1990-05-15"),
      address: "123 Avenue des Champs-Élysées, 75008 Paris",
      socialSecurityNumber: "290055913812345",
      prescribingDoctor: "Dr. Bernard",
      emergencyContact: "Pierre Martin +33687654321",
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      firstName: "Lucas",
      lastName: "Petit",
      email: "lucas.petit@email.fr",
      phone: "+33623456789",
      dateOfBirth: new Date("1985-08-22"),
      address: "45 Rue de la République, 69001 Lyon",
      socialSecurityNumber: "185087513912345",
      prescribingDoctor: "Dr. Rousseau",
      emergencyContact: "Marie Petit +33698765432",
    },
  });

  const today = new Date("2024-12-14");

  // Create appointments
  await prisma.appointment.createMany({
    data: [
      {
        patientId: patient1.id,
        kineId: user1.id,
        datetime: new Date(subDays(today, 2).setHours(9, 0, 0)),
        duration: 30,
        type: "INITIAL",
        status: "COMPLETED",
        notes: "Bilan initial - Lombalgie chronique",
      },
      {
        patientId: patient1.id,
        kineId: user1.id,
        datetime: new Date(today.setHours(14, 0, 0)),
        duration: 30,
        type: "FOLLOWUP",
        status: "SCHEDULED",
        notes: "Séance de rééducation",
      },
      {
        patientId: patient2.id,
        kineId: user2.id,
        datetime: new Date(addDays(today, 1).setHours(11, 0, 0)),
        duration: 45,
        type: "INITIAL",
        status: "SCHEDULED",
        notes: "Bilan initial post-opératoire genou",
      },
    ],
  });

  // Create treatments
  const treatment1 = await prisma.treatment.create({
    data: {
      patientId: patient1.id,
      kineId: user1.id,
      diagnosis: "Lombalgie chronique",
      prescriptionDetails: "Rééducation rachis lombaire, 15 séances",
      startDate: subDays(today, 2),
      endDate: addDays(today, 40),
      objectives: [
        "Diminution de la douleur",
        "Renforcement musculaire",
        "Amélioration de la posture",
        "Éducation thérapeutique"
      ],
    },
  });

  const treatment2 = await prisma.treatment.create({
    data: {
      patientId: patient2.id,
      kineId: user2.id,
      diagnosis: "Rééducation post-opératoire LCA genou droit",
      prescriptionDetails: "Rééducation post-opératoire, 25 séances",
      startDate: addDays(today, 1),
      endDate: addDays(today, 60),
      objectives: [
        "Récupération des amplitudes articulaires",
        "Renforcement musculaire",
        "Reprise de la marche",
        "Proprioception"
      ],
    },
  });

  // Create sessions
  const session1 = await prisma.session.create({
    data: {
      date: subDays(today, 2),
      treatmentId: treatment1.id,
      notes: "Première séance - Bilan",
      progress: 10,
      ngapCode: "AMK7",
      coefficient: 1
    },
  });

  const session2 = await prisma.session.create({
    data: {
      date: today,
      treatmentId: treatment1.id,
      notes: "Exercices de renforcement",
      progress: 20,
      ngapCode: "AMK7",
      coefficient: 1
    },
  });

  // Create bills
  const bill1 = await prisma.bill.create({
    data: {
      patientId: patient1.id,
      sessionId: session1.id,
      treatmentId: treatment1.id,
      amount: 16.13,
      status: "PENDING",
      date: subDays(today, 2),
      coefficient: 1,
      coverageRate: 70.0,
      partObligatoire: 11.29,
      tierPayant: false
    },
  });

  const bill2 = await prisma.bill.create({
    data: {
      patientId: patient1.id,
      sessionId: session2.id,
      treatmentId: treatment1.id,
      amount: 16.13,
      status: "PENDING",
      date: today,
      coefficient: 1,
      coverageRate: 70.0,
      partObligatoire: 11.29,
      tierPayant: false
    },
  });

  // Create TeleClaim
  await prisma.teleClaim.create({
    data: {
      transmissionDate: subDays(today, 2),
      amount: 16.13,
      type: "CPAM",
      status: "PENDING",
      patient: {
        connect: {
          id: patient1.id
        }
      },
      bill: {
        connect: {
          id: bill1.id
        }
      }
    },
  });

  // Create medical records
  const medicalRecord1 = await prisma.medicalRecord.create({
    data: {
      patientId: patient1.id,
      bloodType: "A+",
      allergies: ["Pénicilline", "Pollen"],
      medicalHistory: "Antécédents de lombalgie chronique, pas d'intervention chirurgicale"
    },
  });

  const medicalRecord2 = await prisma.medicalRecord.create({
    data: {
      patientId: patient2.id,
      bloodType: "O-",
      allergies: ["Latex"],
      medicalHistory: "Intervention chirurgicale genou droit (LCA) en 2023"
    },
  });

  // Create documents
  await prisma.document.createMany({
    data: [
      {
        name: "Radiographie Lombaire",
        type: "RADIOGRAPHY",
        url: "https://storage.example.com/radiography-123.jpg",
        date: subDays(today, 30),
        medicalRecordId: medicalRecord1.id
      },
      {
        name: "IRM Genou Droit",
        type: "MRI",
        url: "https://storage.example.com/mri-456.jpg",
        date: subDays(today, 15),
        medicalRecordId: medicalRecord2.id
      },
      {
        name: "Prescription Kinésithérapie",
        type: "PRESCRIPTION",
        url: "https://storage.example.com/prescription-789.pdf",
        date: subDays(today, 5),
        medicalRecordId: medicalRecord2.id
      }
    ]
  });

  // Create exercises
  const exercises = await prisma.exercise.createMany({
    data: [
      {
        name: "Étirements lombaires",
        description: "Étirements doux de la région lombaire",
        duration: 10,
        repetitions: 10,
        sets: 3,
        instructions: "Position allongée, ramener les genoux vers la poitrine"
      },
      {
        name: "Renforcement quadriceps",
        description: "Exercices de renforcement du quadriceps",
        duration: 15,
        repetitions: 15,
        sets: 3,
        instructions: "Position assise, extension du genou avec résistance élastique"
      },
      {
        name: "Proprioception",
        description: "Exercices de proprioception sur plateau instable",
        duration: 5,
        repetitions: 1,
        sets: 3,
        instructions: "Maintenir l'équilibre sur plateau instable, progression yeux fermés"
      }
    ]
  });

  // Create notes
  await prisma.note.createMany({
    data: [
      {
        content: "Première séance : patient motivé, bonne compréhension des exercices",
        date: subDays(today, 2),
        medicalRecordId: medicalRecord1.id,
        authorId: user1.id
      },
      {
        content: "Évolution favorable, diminution de la douleur au repos",
        date: today,
        medicalRecordId: medicalRecord1.id,
        authorId: user1.id
      },
      {
        content: "Bilan pré-opératoire effectué, programme de rééducation établi",
        date: subDays(today, 10),
        medicalRecordId: medicalRecord2.id,
        authorId: user2.id
      }
    ]
  });

  // Update sessions with exercises
  await prisma.session.update({
    where: { id: session1.id },
    data: {
      exercises: {
        connect: [
          { id: (await prisma.exercise.findFirst({ where: { name: "Étirements lombaires" } }))?.id },
          { id: (await prisma.exercise.findFirst({ where: { name: "Renforcement quadriceps" } }))?.id }
        ]
      }
    }
  });

  await prisma.session.update({
    where: { id: session2.id },
    data: {
      exercises: {
        connect: [
          { id: (await prisma.exercise.findFirst({ where: { name: "Étirements lombaires" } }))?.id },
          { id: (await prisma.exercise.findFirst({ where: { name: "Proprioception" } }))?.id }
        ]
      }
    }
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
