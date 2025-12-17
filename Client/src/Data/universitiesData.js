// University and Faculty/College data structure
// Based on onboarding.md specifications

export const universities = [
  {
    id: 'knust',
    name: 'Kwame Nkrumah University of Science and Technology',
    abbreviation: 'KNUST',
    faculties: [
      'College of Agriculture and Natural Resources',
      'College of Art and Built Environment',
      'College of Engineering',
      'College of Health Sciences',
      'College of Humanities and Social Sciences',
      'College of Science'
    ]
  },
  {
    id: 'ug',
    name: 'University of Ghana',
    abbreviation: 'UG',
    faculties: [
      'College of Basic & Applied Sciences',
      'College of Health Sciences',
      'College of Education',
      'College of Humanities'
    ]
  },
  {
    id: 'ucc',
    name: 'University of Cape Coast',
    abbreviation: 'UCC',
    faculties: [
      'College of Agriculture and Natural Sciences',
      'College of Health and Allied Sciences',
      'College of Humanities & Legal Studies',
      'College of Education Studies'
    ]
  },
  {
    id: 'uew',
    name: 'University of Education, Winneba',
    abbreviation: 'UEW',
    faculties: [
      'Faculty of Educational Studies',
      'Faculty of Foreign Languages Education',
      'Faculty of Home Economics Education',
      'Faculty of Science Education',
      'Faculty of Social Sciences Education',
      'School of Business',
      'School of Communication and Media Studies',
      'School of Creative Arts'
    ]
  },
  {
    id: 'umat',
    name: 'University of Mines and Technology',
    abbreviation: 'UMaT',
    faculties: [
      'Faculty of Mining and Minerals Technology',
      'Faculty of Engineering',
      'Faculty of Computing and Mathematical Sciences',
      'Faculty of Integrated Management Studies',
      'Faculty of Geosciences and Environmental Studies',
      'School of Petroleum Studies'
    ]
  },
  {
    id: 'ashesi',
    name: 'Ashesi University',
    abbreviation: 'Ashesi',
    faculties: [
      'Engineering',
      'Economics & Business Administration',
      'Computer Science & Information Systems',
      'Law, Humanities & Social Sciences'
    ]
  },
  {
    id: 'uhas',
    name: 'University of Health and Allied Sciences',
    abbreviation: 'UHAS',
    faculties: [
      'School of Medicine',
      'School of Nursing & Midwifery',
      'School of Allied Health Sciences',
      'School of Public Health'
    ]
  },
  {
    id: 'other',
    name: 'Other/International',
    abbreviation: 'Other',
    faculties: []
  }
];

// Level of Study options
export const studyLevels = [
  'Level 100',
  'Level 200',
  'Level 300',
  'Level 400',
  'Level 500',
  'Level 600',
  'Alumni'
];

// Sample programs by faculty (this would need to be expanded with full program lists)
// For now, providing a structure that can be expanded
export const programsByFaculty = {
  'College of Engineering': [
    'BSc. Civil Engineering',
    'BSc. Mechanical Engineering',
    'BSc. Electrical/Electronic Engineering',
    'BSc. Computer Engineering',
    'BSc. Chemical Engineering',
    'BSc. Aerospace Engineering',
    'BSc. Materials Engineering'
  ],
  'College of Science': [
    'BSc. Computer Science',
    'BSc. Mathematics',
    'BSc. Physics',
    'BSc. Chemistry',
    'BSc. Biochemistry',
    'BSc. Statistics',
    'BSc. Actuarial Science'
  ],
  'College of Health Sciences': [
    'Doctor of Optometry',
    'BSc. Human Biology',
    'BSc. Nursing',
    'BSc. Medical Laboratory Technology',
    'BSc. Pharmacy',
    'BSc. Physiotherapy'
  ],
  'College of Art and Built Environment': [
    'BSc. Construction Technology and Management',
    'BSc. Architecture',
    'BSc. Quantity Surveying',
    'BSc. Land Economy',
    'BSc. Planning'
  ],
  'College of Agriculture and Natural Resources': [
    'BSc. Agriculture',
    'BSc. Agricultural Engineering',
    'BSc. Natural Resources Management',
    'BSc. Forest Resources Technology'
  ],
  'College of Humanities and Social Sciences': [
    'BA. Economics',
    'BA. Sociology',
    'BA. Geography',
    'BA. History',
    'BA. Political Science',
    'BA. Psychology'
  ],
  'College of Basic & Applied Sciences': [
    'BSc. Computer Science',
    'BSc. Mathematics',
    'BSc. Physics',
    'BSc. Chemistry',
    'BSc. Statistics'
  ],
  'College of Education': [
    'B.Ed. Mathematics',
    'B.Ed. Science',
    'B.Ed. Social Studies',
    'B.Ed. English'
  ],
  'College of Humanities': [
    'BA. Economics',
    'BA. Sociology',
    'BA. Geography',
    'BA. History',
    'BA. Political Science'
  ],
  'College of Agriculture and Natural Sciences': [
    'BSc. Agriculture',
    'BSc. Natural Resources Management'
  ],
  'College of Health and Allied Sciences': [
    'BSc. Nursing',
    'BSc. Medical Laboratory Technology',
    'BSc. Public Health'
  ],
  'College of Humanities & Legal Studies': [
    'BA. Economics',
    'BA. Sociology',
    'LLB. Law'
  ],
  'College of Education Studies': [
    'B.Ed. Mathematics',
    'B.Ed. Science',
    'B.Ed. Social Studies'
  ],
  'Faculty of Educational Studies': [
    'B.Ed. Educational Studies',
    'B.Ed. Early Childhood Education'
  ],
  'Faculty of Science Education': [
    'B.Ed. Science Education',
    'B.Ed. Mathematics Education'
  ],
  'Faculty of Social Sciences Education': [
    'B.Ed. Social Studies Education',
    'B.Ed. Economics Education'
  ],
  'School of Business': [
    'BSc. Business Administration',
    'BSc. Accounting',
    'BSc. Marketing'
  ],
  'Faculty of Engineering': [
    'BSc. Mining Engineering',
    'BSc. Geological Engineering',
    'BSc. Minerals Engineering'
  ],
  'Faculty of Computing and Mathematical Sciences': [
    'BSc. Computer Science',
    'BSc. Mathematics',
    'BSc. Statistics'
  ],
  'Engineering': [
    'BSc. Computer Engineering',
    'BSc. Electrical Engineering',
    'BSc. Mechanical Engineering'
  ],
  'Computer Science & Information Systems': [
    'BSc. Computer Science',
    'BSc. Management Information Systems'
  ],
  'Economics & Business Administration': [
    'BA. Economics',
    'BSc. Business Administration',
    'BSc. Accounting'
  ],
  'School of Medicine': [
    'MBChB. Medicine and Surgery'
  ],
  'School of Nursing & Midwifery': [
    'BSc. Nursing',
    'BSc. Midwifery'
  ],
  'School of Allied Health Sciences': [
    'BSc. Medical Laboratory Science',
    'BSc. Physiotherapy',
    'BSc. Radiography'
  ],
  'School of Public Health': [
    'BSc. Public Health',
    'MPH. Master of Public Health'
  ]
};

