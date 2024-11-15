// src/app/storeVaccineData.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


const vaccineData = [
  
    {
        
        "name":"Pfizer-BioNTech (Comirnaty)",
        "type":"mRNA vaccine",
        "Age_Group":"6 months and older",
        "protection_Against":"COVID-19",
        "doses":" "

    },
    {
        "name":"Moderna (Spikevax)",
        "type":"mRNA vaccine",
        "Age_Group":": 6 months and older",
        "protection Against": "COVID-19",
        "doses":"2 doses, 28 days apart (Booster available)"

    },
    {
        "name":"AstraZeneca (Vaxzevria)",
        "type":"Viral vector vaccine",
        "Age_Group":"18 years and older",
        "protection_Against": "COVID-19",
        "doses":"2 doses, 8-12 weeks apart"

    },
    {
        "name":"Johnson & Johnson (Janssen)",
        "type":"Viral vector vaccine",
        "Age-_Group":"18 years and older",
        "protection_Against": "COVID-19",
        "doses":"1 dose (Booster recommended after 2 months"

    },
    {
        "name":" Sinopharm (BBIBP-CorV)",
        "type":"Inactivated virus vaccine",
        "Age_Group":"18 years and older",
        "protection_Against": "COVID-19",
        "doses":"2 doses, 3-4 weeks apart"

    },
    {
        "name":"Fluzone",
        "type":"Inactivated virus vaccine",
        "Age_Group":"6 months and older",
        "protection_Against": "Influenza (Flu)",
        "doses":"1 dose annually"

    },
    {
        "name":"FluMist",
        "type":"Live attenuated intranasal vaccine",
        "Age_Group":"2 to 49 years old",
        "protection_Against": "Influenza (Flu)",
        "doses":"1 dose annually"


    },
    {
        "name":"MMR II",
        "type":"Live attenuated vaccine",
        "Age_Group":"12 months and older",
        "protection_Against": "Measles, Mumps, Rubella",
        "doses":"2 doses (first at 12-15 months, second at 4-6 years)"

    },
    {
        "name":"Priorix",
        "type":"Live attenuated vaccine",
        "Age_Group":"12 months and older",
        "protection_Against": "Measles, Mumps, Rubella",
        "doses":"2 doses (first at 12-15 months, second at 4-6 years)"

    },
    {
        "name":"IPOL",
        "type":"Inactivated poliovirus vaccine",
        "Age_Group":"6 weeks and older",
        "protection_Against": "Poliovirus",
        "doses":"4 doses (at 2, 4, 6-18 months, and a booster at 4-6 years)"
    },
    {
        "name":"Oral Polio Vaccine (OPV)",
        "type":"Live attenuated oral vaccine",
        "Age Group":"Used in areas with endemic polio",
        "protection_Against": "Poliovirus",
        "doses":"Oral drops"

    },
    {
        "name":"Hepatitis A (Havrix, Vaqta)",
        "type":"Inactivated virus vaccine",
        "Age_Group":"12 months and older",
        "protection_Against": "Hepatitis A",
        "doses":"2 doses, 6 months apart"

    },
    {
        "name":"Hepatitis B (Engerix-B, Recombivax HB)",
        "type":"Recombinant protein vaccine",
        "Age_Group":"Birth and older",
        "protection_Against": "Hepatitis B",
        "doses":" 3 doses (at birth, 1-2 months, and 6-18 months for pediatric)"

    },
    {
        "name":"Gardasil",
        "type":"Recombinant protein vaccine",
        "Age_Group":"9 to 45 years old",
        "protection_Against": " Human Papillomavirus (HPV), Cervical cancer, Genital warts",
        "doses":"2 doses (ages 9-14),3 doses (15 years and older)"

    },
    {
        "name":"Cervarix",
        "type":"Recombinant protein vaccine",
        "Age_Group":"9 to 25 years old",
        "protection_Against": "Human Papillomavirus (HPV), Cervical cancer",
        "doses":"3 doses over 6 months"

    },
    {
        "name":" Varivax",
        "type":"Live attenuated vaccine",
        "Age_Group":"12 months and older",
        "protection_Against": "Varicella (Chickenpox)",
        "doses":"2 doses (first at 12-15 months, second at 4-6 years)"

    },
    {
        "name":"Boostrix",
        "type":"Inactivated toxoid vaccine",
        "Age_Group":"10 years and older",
        "protection_Against": ": Pneumococcal disease (infections like pneumonia, meningitis)",
        "doses":"4 doses (2, 4, 6, and 12-15 months for infants)"

    },
    {
        "name":"Pneumovax 23",
        "type":"Polysaccharide vaccine",
        "Age_Group":"65 years and older (or younger for those at risk)",
        "protection_Against": "Pneumococcal disease",
        "doses":"1 dose for adults (additional dose for high-risk individuals)"

    },
    {
        "name":" Rotarix",
        "type":"Live attenuated oral vaccine",
        "Age_Group":"Infants",
        "protection_Against": ": Rotavirus (severe diarrhea in infants)",
        "doses":"2 doses (at 2 and 4 months)"

    },
    {
        "name":"COVID-19 Vaccine (mRNA - Pfizer/BioNTech)",
        "type":"mRNA vaccine",
        "Age_Group":"6 months and older",
        "protection_Against": "COVID-19",
        "doses":"2 primary doses + booster"

    },
    {
        "name":"DTP Vaccine (Diphtheria, Tetanus, Pertussis)",
        "type":"Toxoid/Inactivated bacterial vaccine",
        "Age_Group":"2, 4, 6 months, 15-18 months, 4-6 years",
        "protection_Against": "Diphtheria, Tetanus, Pertussis",
        "doses":"5 doses (childhood)"

    },
    {
        "name":"HPV Vaccine (Human Papillomavirus)",
        "type":"Recombinant vaccine",
        "Age_Group":"9-45 years",
        "protection_Against": "HPV-related cancers and genital warts",
        "doses":" 2-3 doses (depending on age)"


    },
    {
        "name":"Meningococcal Vaccine (MenACWY)",
        "type":"Conjugate vaccine",
        "Age_Group":"11-12 years, 16 years",
        "protection_Against": "Meningitis (A, C, W, Y strains)",
        "doses":"2 doses"

    },
    {
        "name":"Haemophilus Influenzae Type B (Hib) Vaccine",
        "type":"Conjugate vaccine",
        "Age_Group":"2, 4, 6, 12-15 months",
        "protection_Against": "Meningitis, epiglottitis, pneumonia",
        "doses":"3-4 doses"

    },
    {
        "name":"Typhoid Vaccine",
        "type":"Inactivated or live attenuated",
        "Age_Group":"2 years and older",
        "protection_Against": "Typhoid fever",
        "doses":"Single dose or oral (multiple doses)"


    },
    {
        "name":"Rabies Vaccine",
        "type":"Inactivated virus",
        "Age_Group":"All ages (post-exposure)",
        "protection_Against": "Rabies",
        "doses":"3 doses"

    },
    {
        "name":"Japanese Encephalitis Vaccine",
        "type":"Inactivated virus",
        "Age_Group":"2 months and older",
        "protection_Against": "Japanese Encephalitis",
        "doses":"2 doses"

    },
    {
        "name":"Yellow Fever Vaccine",
        "type":"Live attenuated virus",
        "Age_Group":"9 months and older",
        "protection_Against": "Yellow fever",
        "doses":"Single dose"

    },
    {
        "name":"Shingles (Herpes Zoster) Vaccine (Shingrix)",
        "type":"Recombinant vaccine",
        "Age_Group":"50 years and older",
        "protection_Against": "Shingles",
        "doses":" 2 doses"

    },
    {
        "name":"Tdap (Tetanus, Diphtheria, Pertussis)",
        "type":"Toxoid/inactivated bacterial",
        "Age_Group":"11-12 years (booster for adults)",
        "protection_Against": "Tetanus, Diphtheria, Pertussis",
        "doses":"Booster every 10 years"

    }

    
];

const storeVaccineData = async () => {
  try {
    const vaccineCollection = collection(db, "vaccines"); 
    
    for (const vaccine of vaccineData) {
      await addDoc(vaccineCollection, vaccine);
      console.log(`Added: ${vaccine.name}`);
    }

    console.log("All vaccines added to Firestore!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default storeVaccineData;
