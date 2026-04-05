# PCRM Menu Crosswalk and Locked Keys

## Muc tieu

Tai lieu nay khoa key chinh thuc cho menu PCRM hien tai, de Header/Footer dung chung mot nguon va de cac pass sau bo sung locale ma khong doi key.

## Top-level catalog (locked)

### Header top navigation

| Current menu label | Href | Locked key | Locale key |
|---|---|---|---|
| For Clinicians | /good-nutrition/nutrition-for-clinicians | topNav.forClinicians | topNav.forClinicians |
| For Medical Students | /good-nutrition/nutrition-for-clinicians/medical-students | topNav.forMedicalStudents | topNav.forMedicalStudents |
| For Scientists | /term/scientists | topNav.forScientists | topNav.forScientists |
| About Us | /about-us | topNav.aboutUs | topNav.aboutUs |

### Header main navigation

| Current menu label | Href | Locked key | Locale key |
|---|---|---|---|
| Good Nutrition | /good-nutrition | mainNav.goodNutrition | mainNav.goodNutrition |
| Health Topics | /health-topics | mainNav.healthTopics | mainNav.healthTopics |
| Ethical Science | /ethical-science | mainNav.ethicalScience | mainNav.ethicalScience |
| Our Research | /clinical-research | mainNav.ourResearch | mainNav.ourResearch |
| News | /news | mainNav.news | mainNav.news |
| Ways to Give | /donate | mainNav.waysToGive | mainNav.waysToGive |
| Take Action | /take-action | mainNav.takeAction | mainNav.takeAction |

### Footer utility navigation

| Current menu label | Href | Locked key | Locale key |
|---|---|---|---|
| Events | /events | utilityNav.events | utilityNav.events |
| Shop | /shop | utilityNav.shop | utilityNav.shop |
| Contact | /contact | utilityNav.contact | utilityNav.contact |
| Media Center | /news/media-center | utilityNav.mediaCenter | utilityNav.mediaCenter |
| Barnard Medical Center | /barnard-medical-center | utilityNav.barnardMedicalCenter | utilityNav.barnardMedicalCenter |
| Careers | /about-us/careers | utilityNav.careers | utilityNav.careers |
| Recursos en Espanol | https://www.pcrm.org/es | utilityNav.spanishResources | utilityNav.spanishResources |
| Ressources en Francais | https://www.pcrm.org/fr | utilityNav.frenchResources | utilityNav.frenchResources |

### Footer legal

| Current menu label | Href | Locked key | Locale key |
|---|---|---|---|
| Privacy Policy | /privacy-policy | footerLegal.privacyPolicy | footerLegal.privacyPolicy |
| Terms of Use | /terms-of-use | footerLegal.termsOfUse | footerLegal.termsOfUse |

## Full submenu key map (locked)

### Top utility submenu groups

| Group | Prefix | Locked keys |
|---|---|---|
| For Clinicians | topNavMenus.forClinicians.* | nutritionForClinicians, medicalStudents, nutritionInformation, protein, fiber |
| For Medical Students | topNavMenus.forMedicalStudents.* | overview, researchRecruitment, events, goodScienceDigest |
| For Scientists | topNavMenus.forScientists.* | overview, ethicalScience, clinicalResearch, innovativeScienceNews |
| About Us | topNavMenus.aboutUs.* | leadership, ourVictories, careers, internships, events, annualFinancialReports, barnardMedicalCenter, contactUs |

### Main dropdown submenu groups

| Group | Prefix | Locked keys |
|---|---|---|
| Good Nutrition (non-locale items) | goodNutritionMenu.* | overview, universalMeals, carbohydrateAdvantage, fiber, protein, soyAndHealth, loweringCholesterol, concernsAboutDairy, chicken, concernsWithEggs, processedMeat, veganDietEnvironment, nutritionForClinicians, programsPolicies |
| Good Nutrition (locale-backed) | goodNutrition.* | plantBasedDiets, threeReasonsToGoVegan, foodForLifeClasses, plantBasedNutritionFAQ, veganStarterKit, recipes, nutritionForAthletes, pregnancy, nutritionForKids, nutritionInformation, healthyCommunities, findADoctor, findADietitian |
| Health Topics | healthTopicsMenu.* | overview, alzheimers, arthritis, asthma, breastCancer, cancer, colorectalCancer, coronavirus, diabetes, gutBacteria, healthyAging, healthyBones, heartDisease, highBloodPressure, migraines, ovarianCancer, pcos, prostateCancer, weightLoss |
| Ethical Science | ethicalScienceMenu.* | overview, surgeryTraining, paramedicTraining, animalsInMedicalResearch, dogs, alzheimersWithoutAnimals, era21, animalTestingAlternatives, animalFreeAntibodies, chemicalTestingReform, crueltyFreeCosmetics, nura, humanTissueResearch |
| Research | researchMenu.* | overview, recruitment, t2dStudy, endometriosis, fightingHotFlashesWithDiet |
| News (non-locale items) | newsMenu.* | overview, podcast, allNews, innovativeScienceNews, goodScienceDigest, goodMedicine, newsReleases, yourBodyInBalance |
| News (locale-backed) | news.* | healthNutrition, mediaCenter |
| Ways to Give (non-locale items) | waysToGiveMenu.* | ourVictories, annualFinancialReports, careers |
| Ways to Give (locale-backed) | waysToGive.* | donate, donateNow |

## Khoa key chinh thuc

1. Key da khoa duoc dinh nghia trong `lib/navigation-catalog.ts`.
2. Khong doi ten key da khoa; neu doi copy thi chi sua value locale.
3. Neu them menu moi, bat buoc them key moi theo prefix dung nhom.
4. Header/Footer chi render theo key da khoa, khong hardcode label trong JSX.
