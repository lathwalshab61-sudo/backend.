require('dotenv').config();
const mongoose = require('mongoose');
const Case = require('./models/Case');
const Analysis = require('./models/Analysis');

const dummyCases = [
  {
    caseId: 'CASE-2024-001',
    title: 'EXH-042 — Latent Lift Analysis',
    examiner: 'J. Morrison',
    status: 'Verified',
    tag: 'Right Thumb · Whorl',
    notes: 'Latent print recovered from glassware. Minutiae matched with 98% confidence.',
  },
  {
    caseId: 'CASE-2024-002',
    title: 'REF-991 — Tenprint Comparison',
    examiner: 'A. Reyes',
    status: 'Pending Review',
    tag: 'Left Index · Loop',
    notes: 'Comparison against state automated fingerprint identification system (AFIS).',
  },
  {
    caseId: 'CASE-2024-003',
    title: 'EXH-039 — Partial Print Recovery',
    examiner: 'J. Morrison',
    status: 'Anomaly',
    tag: 'Unknown · Arch',
    notes: 'Distorted friction ridge pattern. Requires secondary specialist validation.',
  },
  {
    caseId: 'CASE-2024-004',
    title: 'LAT-017 — Smudged Ridge Analysis',
    examiner: 'C. Park',
    status: 'Verified',
    tag: 'Right Middle · Loop',
    notes: 'Enhancement applied with CLAHE filter. Core delta verified.',
  },
  {
    caseId: 'CASE-2023-099',
    title: 'CMP-088 — Cross-Reference Study',
    examiner: 'A. Reyes',
    status: 'Verified',
    tag: 'Comparative · Whorl/Loop',
    notes: 'Dual print comparison for forensic training benchmark.',
  },
];

const dummyAnalyses = [
  {
    caseId: 'FS-2024-081',
    imageUrl: '/uploads/sample_thumb.jpg',
    originalName: 'latent_lift_exh042.jpg',
    qualityScore: 92,
    patternType: 'Whorl (Accidental)',
    confidence: '98%',
    status: 'verified',
    minutiaePoints: [
      {
        id: '01',
        type: 'circle',
        label: 'Ridge Ending (Central)',
        confidence: '98%',
        color: 'text-primary',
        borderColor: 'border-primary',
      },
      {
        id: '02',
        type: 'square',
        label: 'Bifurcation (Upper-Left)',
        confidence: '91%',
        color: 'text-secondary',
        borderColor: 'border-secondary',
      },
    ],
  },
  {
    caseId: 'FS-2024-080',
    imageUrl: '/uploads/sample_index.jpg',
    originalName: 'tenprint_card_scan.jpg',
    qualityScore: 88,
    patternType: 'Loop (Radial)',
    confidence: '91%',
    status: 'pending',
    minutiaePoints: [
      {
        id: '01',
        type: 'circle',
        label: 'Core Delta',
        confidence: '94%',
        color: 'text-primary',
        borderColor: 'border-primary',
      },
    ],
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database:', mongoose.connection.name);

    // Clear existing dummy data if any to avoid duplicates
    await Case.deleteMany({});
    await Analysis.deleteMany({});
    console.log('Cleaned up previous sample collections.');

    // Insert dummy cases
    const insertedCases = await Case.insertMany(dummyCases);
    console.log(`✅ Successfully seeded ${insertedCases.length} forensic Cases!`);

    // Insert dummy analyses
    const insertedAnalyses = await Analysis.insertMany(dummyAnalyses);
    console.log(`✅ Successfully seeded ${insertedAnalyses.length} Analysis records!`);

    console.log('\n--- Sample Inserted Case from MongoDB ---');
    console.log(JSON.stringify(insertedCases[0], null, 2));

    await mongoose.disconnect();
    console.log('\nDatabase disconnected cleanly. Seed completed successfully! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

seedDatabase();
