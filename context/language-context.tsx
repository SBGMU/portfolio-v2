"use client"

/**
 * Language Context — provides French / English i18n across the whole app.
 * The toggle uses a circular French flag button (liquid glass styled)
 * placed next to the Light Side / Dark Side toggle.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type Locale = "en" | "fr"

interface LanguageContextValue {
  locale: Locale
  toggleLocale: () => void
  t: (key: string) => string
}

/* ------------------------------------------------------------------ */
/*  Translation dictionary                                             */
/* ------------------------------------------------------------------ */
const translations: Record<Locale, Record<string, string>> = {
  en: {
    /* Navbar */
    "nav.presentation": "Presentation",
    "nav.about": "About",
    "nav.experiences": "Experiences",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",
    "nav.lightSide": "Light Side",
    "nav.darkSide": "Dark Side",

    /* Hero / Presentation */
    "hero.name": "Stephen Kouanga",
    "hero.bio":
      "Data enthusiast focused on automation and intelligent solutions, transforming complex data into impactful insights.",
    "hero.contactMe": "Contact Me",
    "hero.getInTouch": "Get in Touch",
    "hero.expertArea": "My Expert area",

    /* About */
    "about.title": "About Me",
    "about.description":
      "Data professional specializing in process automation and data visualization. I have mastered the complete data lifecycle: from collection, cleaning, transformation (ETL), and modeling to interactive reporting. My expertise includes Python (Pandas, NumPy), SQL, Power BI (DAX, Power Query), VBA, and other technologies to ensure data reliability and optimize operational performance.",
    "about.stat1": "Adaptability",
    "about.stat2": "Pedagogical skills",
    "about.stat3": "Team player mindset",
    "about.stat4": "Analytical rigour",

    /* Experiences */
    "exp.title": "Experiences",
    "exp.seeMore": "See more",
    "exp.close": "Close",

    /* Experience 1 */
    "exp.1.title": "Data Coordinator & ATM Migration Project",
    "exp.1.company": "2SF Cash Services",
    "exp.1.city": "La Plaine Saint-Denis",
    "exp.1.date": "Sep 2024 - Present",
    "exp.1.duration": "1.5 years",
    "exp.1.preview":
      "Designed interactive and dynamic dashboards to monitor over 1300 ATM migrations to Cash Services in real time.",
    "exp.1.desc":
      "Designed interactive and dynamic dashboards to monitor over 1300 ATM migrations to Cash Services in real time, providing strategic and accurate visibility on key operational data. Coordinated pre-migration interventions including infrastructure setup with property owners, Bouygues Telecom, Orange Business, BRINKS, and Loomis.\n\nBuild and automate complex processes using VBA to optimize the management of project and ATM databases.\n\nDeveloped and led advanced statistical analyses (migration time by technician, incident tracking, and regional performance trends). Enhanced data reliability through advanced cross-referencing in Excel, ensuring high-quality traceability and alignment across partner decision-making teams.",

    /* Experience 2 */
    "exp.2.title": "Database Manager",
    "exp.2.company": "Vinci Construction GeoInfrastructure",
    "exp.2.city": "Nanterre",
    "exp.2.date": "Aug 2024 - Sep 2024",
    "exp.2.duration": "2 months",
    "exp.2.preview":
      "Maintained and optimised the HR onboarding integration database for VCGI using VBA and Index-Match formulas.",
    "exp.2.desc":
      "Maintained and optimised the HR onboarding integration database for VCGI using VBA and Index-Match formulas to collect and input employee data.\n\nUpdated and validated records to ensure data accuracy and compliance within the VCGI system.\n\nSecured sensitive information in line with GDPR standards.",

    /* Experience 3 */
    "exp.3.title": "PHP Developer",
    "exp.3.company": "Luteciel",
    "exp.3.city": "Paris 1er",
    "exp.3.date": "Jan 2018 - Jan 2020",
    "exp.3.duration": "2 years",
    "exp.3.preview":
      "Rebuilt online ticket booking platform using PHP. Created Excel VBA macros and queried SQL databases for reporting.",
    "exp.3.desc":
      "Rebuilt online ticket booking platform using PHP.\n\nCreated Excel VBA macros. Queried SQL databases for commercial reporting.\n\nManaged digital communication and automated client data integration.\n\nWeb forms and UI improvements led to a 40% increase in user interaction.",

    /* Experience 4 */
    "exp.4.title": "Web Developer",
    "exp.4.company": "Auto-Ecole de la Gare",
    "exp.4.city": "Saint-Gratien",
    "exp.4.date": "Nov 2016 - Dec 2016",
    "exp.4.duration": "2 months",
    "exp.4.preview":
      "Designed a showcase website using PHP and MySQL. Integrated Google Maps API for locating 3 branches.",
    "exp.4.desc":
      "Designed a showcase website using PHP and MySQL. Integrated Google Maps API for locating 3 branches.\n\nCreated an online contact and information request form.\n\nIncreased potential student inquiries via email by 40% over the year 2017.",

    /* Certifications */
    "cert.title": "Certifications",
    "cert.1.title": "DataCamp Python Professional Certificate",
    "cert.1.year": "2025",
    "cert.1.desc":
      "Strong in OOP and advanced data analysis with Python (pandas, NumPy), ensuring clean, reliable insights and robust predictive foundations.",
    "cert.2.title": "DataCamp Advanced SQL & Relational Data Analysis Certification",
    "cert.2.year": "2025",
    "cert.2.desc":
      "Advanced SQL expertise: complex queries, joins, set theory, subqueries, and structured aggregation for high-performance data extraction and analysis.",
    "cert.3.title": "Mimo SQL Fundamentals & Relational Database Management Certification",
    "cert.3.year": "2024",
    "cert.3.desc":
      "Solid foundation in SQL: table creation, data retrieval, and core relational database management practices.",

    /* Contact */
    "contact.title": "Let's Work Together",
    "contact.description":
      "I would be honored to discuss how my approach could bring value to your project.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.github": "GitHub",

    /* Footer */
    "footer.rights": "2026 Stephen Kouanga. All rights reserved.",

    /* Download */
    "download.resume": "Download my Resume",

    /* Sticky */
    "sticky.getInTouch": "Get in Touch",
  },

  fr: {
    /* Navbar */
    "nav.presentation": "Presentation",
    "nav.about": "A propos",
    "nav.experiences": "Experiences",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",
    "nav.lightSide": "Mode Clair",
    "nav.darkSide": "Mode Sombre",

    /* Hero / Presentation */
    "hero.name": "Stephen Kouanga",
    "hero.bio":
      "Passionné de données, spécialisé dans l'automatisation et les solutions intelligentes, transformant des données complexes en insights percutantes.",
    "hero.contactMe": "Me Contacter",
    "hero.getInTouch": "Entrer en Contact",
    "hero.expertArea": "Mes domaines d'expertise",

    /* About */
    "about.title": "A propos",
    "about.description":
      "Professionnel de la data spécialisé dans l'automatisation des processus et la visualisation de données. J'ai maîtrisé le cycle de vie complet des données : de la collecte, nettoyage, transformation (ETL) et modélisation jusqu'au reporting interactif. Mon expertise inclut Python (Pandas, NumPy), SQL, Power BI (DAX, Power Query), VBA et d'autres technologies pour garantir la fiabilité des données et optimiser la performance opérationnelle.",
    "about.stat1": "Adaptabilité",
    "about.stat2": "Compétences pédagogiques",
    "about.stat3": "Esprit d'équipe",
    "about.stat4": "Rigueur analytique",

    /* Experiences */
    "exp.title": "Expériences",
    "exp.seeMore": "Voir plus",
    "exp.close": "Fermer",

    /* Experience 1 */
    "exp.1.title": "Coordinateur Data & Projet Migration DAB",
    "exp.1.company": "2SF Cash Services",
    "exp.1.city": "La Plaine Saint-Denis",
    "exp.1.date": "Sep 2024 - Présent",
    "exp.1.duration": "1,5 ans",
    "exp.1.preview":
      "Conception de tableaux de bord interactifs et dynamiques pour suivre en temps réel la migration de plus de 1300 DAB vers Cash Services.",
    "exp.1.desc":
      "Conception de tableaux de bord interactifs et dynamiques pour suivre en temps réel la migration de plus de 1300 DAB vers Cash Services, offrant une visibilité stratégique et précise sur les données opérationnelles clés. Coordination des interventions pré-migration incluant la mise en place d'infrastructures avec les propriétaires, Bouygues Telecom, Orange Business, BRINKS et Loomis.\n\nConstruction et automatisation de processus complexes en VBA pour optimiser la gestion des bases de données projets et DAB.\n\nDéveloppement et conduite d'analyses statistiques avancées (temps de migration par technicien, suivi des incidents et tendances de performance régionale). Amélioration de la fiabilité des données par des recoupements avancés dans Excel, assurant une traçabilité de haute qualité et un alignement entre les équipes décisionnelles partenaires.",

    /* Experience 2 */
    "exp.2.title": "Gestionnaire de Base de Données",
    "exp.2.company": "Vinci Construction GeoInfrastructure",
    "exp.2.city": "Nanterre",
    "exp.2.date": "Août 2024 - Sep 2024",
    "exp.2.duration": "2 mois",
    "exp.2.preview":
      "Maintenance et optimisation de la base de données d'intégration RH pour VCGI à l'aide de VBA et de formules Index-Match.",
    "exp.2.desc":
      "Maintenance et optimisation de la base de données d'intégration RH pour VCGI à l'aide de VBA et de formules Index-Match pour collecter et saisir les données des employés.\n\nMise à jour et validation des enregistrements pour assurer l'exactitude des données et la conformité au sein du système VCGI.\n\nSécurisation des informations sensibles conformément aux normes RGPD.",

    /* Experience 3 */
    "exp.3.title": "Développeur PHP",
    "exp.3.company": "Luteciel",
    "exp.3.city": "Paris 1er",
    "exp.3.date": "Jan 2018 - Jan 2020",
    "exp.3.duration": "2 ans",
    "exp.3.preview":
      "Refonte de la plateforme de réservation de billets en ligne en PHP. Création de macros VBA Excel et requêtes SQL pour le reporting.",
    "exp.3.desc":
      "Refonte de la plateforme de réservation de billets en ligne en PHP.\n\nCréation de macros VBA Excel. Requêtes sur des bases de données SQL pour le reporting commercial.\n\nGestion de la communication digitale et automatisation de l'intégration des données clients.\n\nLes formulaires web et améliorations UI ont conduit à une augmentation de 40% de l'interaction utilisateur.",

    /* Experience 4 */
    "exp.4.title": "Développeur Web",
    "exp.4.company": "Auto-Ecole de la Gare",
    "exp.4.city": "Saint-Gratien",
    "exp.4.date": "Nov 2016 - Déc 2016",
    "exp.4.duration": "2 mois",
    "exp.4.preview":
      "Conception d'un site vitrine en PHP et MySQL. Intégration de l'API Google Maps pour localiser 3 agences.",
    "exp.4.desc":
      "Conception d'un site vitrine en PHP et MySQL. Intégration de l'API Google Maps pour localiser 3 agences.\n\nCréation d'un formulaire de contact et de demande d'information en ligne.\n\nAugmentation de 40% des demandes de renseignements d'étudiants potentiels par email sur l'année 2017.",

    /* Certifications */
    "cert.title": "Certifications",
    "cert.1.title": "Certificat Professionnel Python DataCamp",
    "cert.1.year": "2025",
    "cert.1.desc":
      "Solide en POO et analyse de données avancée avec Python (pandas, NumPy), garantissant des insights fiables et des fondations prédictives robustes.",
    "cert.2.title": "Certification SQL Avancé & Analyse de Données Relationnelles DataCamp",
    "cert.2.year": "2025",
    "cert.2.desc":
      "Expertise SQL avancée : requêtes complexes, jointures, théorie des ensembles, sous-requêtes et agrégation structurée pour l'extraction et l'analyse de données haute performance.",
    "cert.3.title": "Certification Fondamentaux SQL & Gestion de Bases de Données Relationnelles Mimo",
    "cert.3.year": "2024",
    "cert.3.desc":
      "Base solide en SQL : création de tables, extraction de données et pratiques essentielles de gestion de bases de données relationnelles.",

    /* Contact */
    "contact.title": "Travaillons Ensemble",
    "contact.description":
      "Je serais honoré de discuter de la manière dont mon approche pourrait apporter de la valeur à votre projet.",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.location": "Localisation",
    "contact.github": "GitHub",

    /* Footer */
    "footer.rights": "2026 Stephen Kouanga. Tous droits réservés.",

    /* Download */
    "download.resume": "Télécharger mon CV",

    /* Sticky */
    "sticky.getInTouch": "Entrer en Contact",
  },
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "fr" : "en"))
  }, [])

  /** Look up a translation key — falls back to the key itself. */
  const t = useCallback(
    (key: string) => translations[locale]?.[key] ?? key,
    [locale],
  )

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
