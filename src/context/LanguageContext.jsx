import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation
    nav_brand: "VISION",
    nav_home: "Home",
    nav_eyecheckup: "Eye Check-Up",
    nav_eyewear: "Eyewear & Power Lenses",
    nav_fitting: "Frame Fitting",
    nav_services: "Services",
    nav_all_services: "All Services",
    nav_dropdown_eyecheckup: "Eye Check-Up & Refraction",
    nav_dropdown_eyewear: "Eyewear & Power Lenses",
    nav_dropdown_fitting: "Precision Frame Fitting",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_book: "Book Appointment",
    nav_manager: "Manager Panel",
    nav_customer_site: "Customer Site",
    
    // Hero
    hero_badge: "VISION X Ophthalmic & Optical Center",
    hero_title_1: "Precision Vision Care & ",
    hero_title_highlight: "Luxury Eyewear",
    hero_desc: "Experience world-class eye check-ups, automated refraction power measurements, custom digital progressive lenses, and handcrafted titanium frame fittings by certified doctors.",
    hero_book_btn: "Book an Eye Check-Up",
    hero_explore_btn: "Explore Eyewear",
    hero_accuracy: "99.8% Prescription Accuracy",
    hero_certified: "Certified Doctors & Opticians",
    hero_patients_count: "15k+ Patients",
    hero_retinal_diag: "Advanced Retinal Diagnostics",

    // Trust Features
    trust_certified_doc: "Certified Optometrists",
    trust_certified_doc_desc: "Licensed clinical eye specialists performing in-depth ocular exams.",
    trust_power_lenses: "Precision Power Lenses",
    trust_power_lenses_desc: "High-index 1.67 aspheric & anti-reflective blue light optics.",
    trust_titanium: "Titanium Frames",
    trust_titanium_desc: "Aerospace-grade lightweight, hypoallergenic frame collections.",
    trust_delivery: "Express Fitting & Delivery",
    trust_delivery_desc: "Same-day power glass assembly and customized alignment.",

    // Check-Up Section
    checkup_badge: "Advanced Ophthalmology Diagnostics",
    checkup_title: "Comprehensive Eye Check-Up & Refraction Exams",
    checkup_desc: "Our vision care unit uses computerised auto-refractometers, slit-lamp biomicroscopy, and non-contact tonometer glaucoma testing.",
    checkup_book_now: "Book Eye Check-Up Slot",
    checkup_feat_1: "Computerized Auto-Refraction & Visual Acuity",
    checkup_feat_2: "Retinal Digital Scanning & Glaucoma Triage",
    checkup_feat_3: "Astigmatism & Cylinder Axis Alignment",
    checkup_feat_4: "Binocular Vision & Presbyopia Evaluation",

    // Eyewear Section
    eyewear_badge: "Optical Eyewear Catalog",
    eyewear_title: "Power Glasses & Designer Collections",
    eyewear_desc: "Explore precision optics designed for high cylindrical/spherical powers, anti-blue light shields, and titanium full-rim frames.",
    eyewear_cat_all: "All Eyewear",
    eyewear_cat_prescription: "Prescription Glasses",
    eyewear_cat_power: "Power Glasses",
    eyewear_cat_sunglasses: "Sunglasses",
    eyewear_cat_computer: "Computer Glasses",
    eyewear_cat_kids: "Kids' Frames",
    eyewear_cat_contacts: "Contact Lenses",
    eyewear_in_stock: "In Stock",
    eyewear_out_of_stock: "Out of Stock",
    eyewear_enquire: "Enquire / Book Fitting",

    // Fitting Section
    fitting_badge: "Ergonomic Customization",
    fitting_title: "3D Digital Frame Fitting & Bridge Alignment",
    fitting_desc: "Achieve zero temple pressure and optical center alignment matching your exact Pupillary Distance (PD).",
    fitting_book_btn: "Book Precision Fitting",

    // Services Section
    services_badge: "Full Spectrum Care",
    services_title: "Clinical Services & Optical Specialties",
    services_desc: "From pediatric visual therapy to complex progressive power lens assembly.",

    // Appointments Form
    appt_badge: "Schedule Your Visit",
    appt_title: "Book an Eye Check-Up or Fitting",
    appt_desc: "Select your preferred service, specialist date, and time slot. Our clinic team will confirm your booking instantly.",
    form_fullname: "Full Name *",
    form_phone: "Phone Number *",
    form_email: "Email Address *",
    form_service: "Service Required *",
    form_date: "Preferred Date *",
    form_time: "Preferred Time *",
    form_notes: "Vision Concerns / Additional Notes (Optional)",
    form_submit: "Submit Appointment Request",
    form_submitting: "Confirming Booking...",
    form_success_title: "Appointment Successfully Created!",
    form_success_desc: "Your appointment details have been recorded in our clinic system and Supabase cloud database.",
    ticket_ref: "Reference ID",
    ticket_patient: "Patient Name",
    ticket_service: "Service",
    ticket_date: "Date",
    ticket_time: "Time Slot",
    ticket_print: "Print Ticket",
    ticket_done: "Done",

    // Admin / Manager Portal
    admin_login_badge: "VISION X Security Gate",
    admin_login_title: "Manager Portal Authentication",
    admin_login_desc: "Please sign in with administrator credentials to access patient records and inventory databases.",
    admin_username: "Username *",
    admin_password: "Password *",
    admin_login_btn: "Authenticate & Enter",
    admin_back_btn: "Back to Customer Site",
    admin_dashboard_title: "Database & Management Dashboard",
    admin_tab_customers: "Customers DB",
    admin_tab_stocks: "Stock & Inventory",
    admin_tab_appts: "Appointments",
    admin_tab_catalog: "Catalog",
    admin_tab_services: "Services",
    admin_tab_settings: "Settings",

    // Footer
    footer_desc: "Premier optical health center providing comprehensive vision testing, power glasses customization, precision frame fittings, and high-end eyewear.",
    footer_hours: "Clinic Hours",
    footer_contact: "Contact Info",
    footer_rights: "VISION X Eye Care & Optical Center. All rights reserved."
  },

  ne: {
    // Navigation
    nav_brand: "VISION",
    nav_home: "गृह (Home)",
    nav_eyecheckup: "आँखा जाँच",
    nav_eyewear: "चश्मा र पावर लेन्स",
    nav_fitting: "फ्रेम फिटिङ",
    nav_services: "सेवाहरू",
    nav_all_services: "सबै सेवाहरू",
    nav_dropdown_eyecheckup: "आँखा जाँच र पावर परीक्षण",
    nav_dropdown_eyewear: "चश्मा र पावर लेन्स",
    nav_dropdown_fitting: "सटिक फ्रेम फिटिङ",
    nav_about: "हाम्रो बारेमा",
    nav_contact: "सम्पर्क",
    nav_book: "अपोइन्टमेन्ट बुक गर्नुहोस्",
    nav_manager: "प्रबन्धक पोर्टल",
    nav_customer_site: "ग्राहक साइट",
    
    // Hero
    hero_badge: "VISION X दृष्टि र अप्टिकल सेन्टर",
    hero_title_1: "सटिक आँखा स्वास्थ्य र ",
    hero_title_highlight: "आधुनिक चश्मा",
    hero_desc: "प्रमाणित चिकित्सकहरूद्वारा कम्प्युटराइज्ड आँखा जाँच, स्वचालित पावर मापन, डिजिटल प्रोग्रेसिभ लेन्स, र टाइटेनियम फ्रेम फिटिङको अनुभव लिनुहोस्।",
    hero_book_btn: "आँखा जाँच बुक गर्नुहोस्",
    hero_explore_btn: "चश्मा संकलन हेर्नुहोस्",
    hero_accuracy: "९९.८% पावर मापन सटिकता",
    hero_certified: "प्रमाणित डाक्टर र अप्टिशियनहरू",
    hero_patients_count: "१५ हजार+ बिरामीहरू",
    hero_retinal_diag: "उन्नत रेटिना परीक्षण",

    // Trust Features
    trust_certified_doc: "प्रमाणित नेत्र विशेषज्ञ",
    trust_certified_doc_desc: "विस्तृत आँखा जाँच गर्ने अनुमतिप्राप्त डाक्टरहरू।",
    trust_power_lenses: "सटिक पावर लेन्सहरू",
    trust_power_lenses_desc: "१.६७ एस्फेरिक र नीलो प्रकाश रोक्ने लेन्सहरू।",
    trust_titanium: "टाइटेनियम फ्रेमहरू",
    trust_titanium_desc: "हल्का, टिकाउ र एलर्जी-मुक्त टाइटेनियम संग्रह।",
    trust_delivery: "द्रुत फिटिङ र डेलिभरी",
    trust_delivery_desc: "सोही दिन पावर चश्मा निर्माण र मिलाउने सेवा।",

    // Check-Up Section
    checkup_badge: "उन्नत नेत्र निदान",
    checkup_title: "समग्र आँखा जाँच र पावर परीक्षण",
    checkup_desc: "हाम्रो दृष्टि केन्द्रले कम्प्युटराइज्ड अटो-रिफ्र्याक्टोमिटर र अत्याधुनिक उपकरणहरूद्वारा आँखा जाँच गर्दछ।",
    checkup_book_now: "समय बुक गर्नुहोस्",
    checkup_feat_1: "कम्प्युटराइज्ड अटो-रिफ्र्याक्सन र दृष्टि जाँच",
    checkup_feat_2: "रेटिना डिजिटल स्क्यानिङ र जलविन्दु जाँच",
    checkup_feat_3: "विषम दृष्टि (Astigmatism) र पावर मिलाउने",
    checkup_feat_4: "दुवै आँखाको दृष्टि र उमेर अनुसारको जाँच",

    // Eyewear Section
    eyewear_badge: "अप्टिकल चश्मा क्याटलग",
    eyewear_title: "पावर चश्मा र डिजाइन संकलन",
    eyewear_desc: "उच्च सिलिन्ड्रिकल/स्फेरिकल पावर, कम्प्युटर प्रोटेक्सन लेन्स, र टाइटेनियम फ्रेमहरू हेर्नुहोस्।",
    eyewear_cat_all: "सबै चश्मा",
    eyewear_cat_prescription: "पावर चश्मा",
    eyewear_cat_power: "हाइ-पावर लेन्स",
    eyewear_cat_sunglasses: "घामको चश्मा (Sun)",
    eyewear_cat_computer: "कम्प्युटर चश्मा",
    eyewear_cat_kids: "बालबालिकाको फ्रेम",
    eyewear_cat_contacts: "कन्ट्याक्ट लेन्स",
    eyewear_in_stock: "उपलब्ध छ",
    eyewear_out_of_stock: "स्टक सकियो",
    eyewear_enquire: "सोधपुछ / फिटिङ बुक",

    // Fitting Section
    fitting_badge: "विशेष फिटिङ",
    fitting_title: "थ्री-डी डिजिटल फ्रेम फिटिङ र साइज मिलाउने",
    fitting_desc: "तपाईंको Pupillary Distance (PD) अनुसार आरामदायक र सटिक फिटिङ प्राप्त गर्नुहोस्।",
    fitting_book_btn: "सटिक फिटिङ बुक गर्नुहोस्",

    // Services Section
    services_badge: "पूर्ण आँखा सेवा",
    services_title: "क्लिनिकल सेवाहरू र अप्टिकल सुविधाहरू",
    services_desc: "बालबालिकाको आँखा जाँच देखि जटिल प्रोग्रेसिभ लेन्स निर्माण सम्म।",

    // Appointments Form
    appt_badge: "समय तालिका मिलाउनुहोस्",
    appt_title: "आँखा जाँच वा फिटिङ बुक गर्नुहोस्",
    appt_desc: "तपाईंको रोजाइको सेवा, मिति र समय छान्नुहोस्। हाम्रो टोलीले तुरुन्तै पुष्टि गर्नेछ।",
    form_fullname: "पुरा नाम *",
    form_phone: "फोन नम्बर *",
    form_email: "इमेल ठेगाना *",
    form_service: "आवश्यक सेवा *",
    form_date: "रोजेको मिति *",
    form_time: "रोजेको समय *",
    form_notes: "दृष्टि सम्बन्धी विवरण / थप टिप्पणी (ऐच्छिक)",
    form_submit: "अपोइन्टमेन्ट पेश गर्नुहोस्",
    form_submitting: "पुष्टि हुँदैछ...",
    form_success_title: "अपोइन्टमेन्ट सफलतापूर्वक बुक भयो!",
    form_success_desc: "तपाईंको विवरण हाम्रो क्लिनिक प्रणाली र सुपारेस (Supabase) डाटाबेसमा सुरक्षित गरिएको छ।",
    ticket_ref: "सन्दर्भ आईडी",
    ticket_patient: "बिरामीको नाम",
    ticket_service: "सेवा",
    ticket_date: "मिति",
    ticket_time: "समय",
    ticket_print: "टिकट प्रिन्ट गर्नुहोस्",
    ticket_done: "सम्पन्न भयो",

    // Admin / Manager Portal
    admin_login_badge: "VISION X सुरक्षा द्वार",
    admin_login_title: "प्रबन्धक पोर्टल प्रमाणीकरण",
    admin_login_desc: "बिरामीको रेकर्ड र स्टक डाटाहरू हेर्न प्रशासक खाताबाट लगइन गर्नुहोस्।",
    admin_username: "प्रयोगकर्ता नाम *",
    admin_password: "पासवर्ड *",
    admin_login_btn: "लगइन गर्नुहोस्",
    admin_back_btn: "ग्राहक साइटमा फर्कनुहोस्",
    admin_dashboard_title: "डाटाबेस र व्यवस्थापन ड्यासबोर्ड",
    admin_tab_customers: "ग्राहक डाटाबेस",
    admin_tab_stocks: "स्टक र सामान",
    admin_tab_appts: "अपोइन्टमेन्टहरू",
    admin_tab_catalog: "क्याटलग",
    admin_tab_services: "सेवाहरू",
    admin_tab_settings: "सेटिङहरू",

    // Footer
    footer_desc: "समग्र दृष्टि परीक्षण, पावर चश्मा निर्माण, र गुणस्तरीय अप्टिकल सेवा प्रदान गर्ने प्रमुख आँखा केन्द्र।",
    footer_hours: "क्लिनिक खुल्ने समय",
    footer_contact: "सम्पर्क जानकारी",
    footer_rights: "VISION X आँखा स्वास्थ्य र अप्टिकल सेन्टर। सर्वाधिकार सुरक्षित।"
  },

  hi: {
    // Navigation
    nav_brand: "VISION",
    nav_home: "मुख्य पृष्ठ (Home)",
    nav_eyecheckup: "नेत्र जांच (Check-Up)",
    nav_eyewear: "चश्मा और पावर लेंस",
    nav_fitting: "फ्रेम फिटिंग",
    nav_services: "सेवाएं",
    nav_all_services: "सभी सेवाएं",
    nav_dropdown_eyecheckup: "नेत्र जांच और विजन टेस्ट",
    nav_dropdown_eyewear: "चश्मा और पावर लेंस",
    nav_dropdown_fitting: "सटीक फ्रेम फिटिंग",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क करें",
    nav_book: "अपॉइंटमेंट बुक करें",
    nav_manager: "मैनेजर पोर्टल",
    nav_customer_site: "ग्राहक साइट",
    
    // Hero
    hero_badge: "VISION X नेत्र चिकित्सा और ऑप्टिकल केंद्र",
    hero_title_1: "सटीक नेत्र देखभाल और ",
    hero_title_highlight: "लक्जरी आईवियर",
    hero_desc: "प्रमाणित डॉक्टरों द्वारा कंप्यूटर चालित नेत्र जांच, स्वचालित पावर मापन, डिजिटल प्रोग्रेसिव लेंस और हस्तनिर्मित टाइटेनियम फ्रेम फिटिंग का अनुभव करें।",
    hero_book_btn: "आंखों की जांच बुक करें",
    hero_explore_btn: "आईवियर संग्रह देखें",
    hero_accuracy: "99.8% पावर मापन सटीकता",
    hero_certified: "प्रमाणित डॉक्टर और ऑप्टिशियंस",
    hero_patients_count: "15,000+ मरीज",
    hero_retinal_diag: "उन्नत रेटिना जांच",

    // Trust Features
    trust_certified_doc: "प्रमाणित नेत्र विशेषज्ञ",
    trust_certified_doc_desc: "गहन नेत्र परीक्षण करने वाले लाइसेंस प्राप्त नैदानिक विशेषज्ञ।",
    trust_power_lenses: "सटीक पावर लेंस",
    trust_power_lenses_desc: "1.67 एस्फेरिक और एंटी-रिफ्लेक्टिव ब्लू लाइट लेंस।",
    trust_titanium: "टाइटेनियम फ्रेम्स",
    trust_titanium_desc: "हल्के, टिकाऊ और एंटी-एलर्जी टाइटेनियम फ्रेम कलेक्शन।",
    trust_delivery: "फास्ट फिटिंग और डिलीवरी",
    trust_delivery_desc: "उसी दिन पावर ग्लास असेंबली और कस्टम अलाइनमेंट।",

    // Check-Up Section
    checkup_badge: "उन्नत नेत्र निदान",
    checkup_title: "संपूर्ण नेत्र जांच और दृष्टि परीक्षण",
    checkup_desc: "हमारी दृष्टि देखभाल इकाई कम्प्यूटरीकृत ऑटो-रिफ्रैक्टोमीटर और आधुनिक उपकरणों से जांच करती है।",
    checkup_book_now: "जांच का समय बुक करें",
    checkup_feat_1: "कम्प्यूटरीकृत ऑटो-रिफ्रैक्शन और दृष्टि जांच",
    checkup_feat_2: "रेटिना डिजिटल स्कैनिंग और मोतियाबिंद/ग्लूकोमा जांच",
    checkup_feat_3: "एस्टिग्मैटिज्म और सिलेंडर एक्सिस अलाइनमेंट",
    checkup_feat_4: "द्विनेत्री दृष्टि और दूर/पास की नजर जांच",

    // Eyewear Section
    eyewear_badge: "ऑप्टिकल आईवियर कैटलॉग",
    eyewear_title: "पावर ग्लासेज और डिजाइनर कलेक्शन",
    eyewear_desc: "उच्च बेलनाकार/गोलाकार पावर, एंटी-ब्लू लाइट प्रोटेक्शन और टाइटेनियम फुल-रिम फ्रेम देखें।",
    eyewear_cat_all: "सभी चश्मे",
    eyewear_cat_prescription: "नंबर का चश्मा",
    eyewear_cat_power: "हाई-पावर लेंस",
    eyewear_cat_sunglasses: "धूप का चश्मा (Sun)",
    eyewear_cat_computer: "कंप्यूटर चश्मा",
    eyewear_cat_kids: "बच्चों के फ्रेम",
    eyewear_cat_contacts: "कांटेक्ट लेंस",
    eyewear_in_stock: "उपलब्ध है",
    eyewear_out_of_stock: "आउट ऑफ स्टॉक",
    eyewear_enquire: "पूछताछ / फिटिंग बुक",

    // Fitting Section
    fitting_badge: "एर्गोनॉमिक कस्टमाइजेशन",
    fitting_title: "3D डिजिटल फ्रेम फिटिंग और साइज अलाइनमेंट",
    fitting_desc: "अपनी सटीक प्यूपिलरी डिस्टेंस (PD) के अनुसार शून्य दबाव और आरामदायक फिटिंग पाएं।",
    fitting_book_btn: "सटीक फिटिंग बुक करें",

    // Services Section
    services_badge: "संपूर्ण नेत्र सेवाएं",
    services_title: "नैदानिक सेवाएं और ऑप्टिकल विशेषज्ञता",
    services_desc: "बच्चों की दृष्टि थेरेपी से लेकर जटिल प्रोग्रेसिव लेंस निर्माण तक।",

    // Appointments Form
    appt_badge: "समय निर्धारित करें",
    appt_title: "आंखों की जांच या फिटिंग बुक करें",
    appt_desc: "अपनी पसंदीदा सेवा, तिथि और समय चुनें। हमारी टीम तुरंत पुष्टि करेगी।",
    form_fullname: "पूरा नाम *",
    form_phone: "फोन नंबर *",
    form_email: "ईमेल पता *",
    form_service: "आवश्यक सेवा *",
    form_date: "पसंदीदा तारीख *",
    form_time: "पसंदीदा समय *",
    form_notes: "दृष्टि संबंधी विवरण / अतिरिक्त नोट (वैकल्पिक)",
    form_submit: "अपॉइंटमेंट सबमिट करें",
    form_submitting: "पुष्टि हो रही है...",
    form_success_title: "अपॉइंटमेंट सफलतापूर्वक बुक हो गया!",
    form_success_desc: "आपका विवरण हमारे क्लिनिक सिस्टम और सुपाबेस (Supabase) डेटाबेस में सुरक्षित हो गया है।",
    ticket_ref: "रेफरेंस आईडी",
    ticket_patient: "मरीज का नाम",
    ticket_service: "सेवा",
    ticket_date: "तारीख",
    ticket_time: "समय",
    ticket_print: "टिकट प्रिंट करें",
    ticket_done: "हो गया",

    // Admin / Manager Portal
    admin_login_badge: "VISION X सुरक्षा द्वार",
    admin_login_title: "मैनेजर पोर्टल प्रमाणीकरण",
    admin_login_desc: "मरीजों के रिकॉर्ड और इन्वेंट्री डेटा देखने के लिए व्यवस्थापक खाते से साइन इन करें।",
    admin_username: "उपयोगकर्ता नाम *",
    admin_password: "पासवर्ड *",
    admin_login_btn: "लॉगिन करें",
    admin_back_btn: "ग्राहक साइट पर वापस जाएं",
    admin_dashboard_title: "डेटाबेस और प्रबंधन डैशबोर्ड",
    admin_tab_customers: "ग्राहक डेटाबेस",
    admin_tab_stocks: "स्टॉक और इन्वेंट्री",
    admin_tab_appts: "अपॉइंटमेंट्स",
    admin_tab_catalog: "कैटलॉग",
    admin_tab_services: "सेवाएं",
    admin_tab_settings: "सेटिंग्स",

    // Footer
    footer_desc: "व्यापक दृष्टि परीक्षण, पावर ग्लास कस्टमाइजेशन और प्रीमियम चश्मे प्रदान करने वाला प्रमुख नेत्र केंद्र।",
    footer_hours: "क्लिनिक का समय",
    footer_contact: "संपर्क जानकारी",
    footer_rights: "VISION X आई केयर एंड ऑप्टिकल सेंटर। सर्वाधिकार सुरक्षित।"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('visionx_language') || 'en';
  });

  const changeLanguage = (newLang) => {
    if (['en', 'ne', 'hi'].includes(newLang)) {
      setLang(newLang);
      localStorage.setItem('visionx_language', newLang);
    }
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const formatPrice = (amountUSD) => {
    if (typeof amountUSD !== 'number' || isNaN(amountUSD)) return amountUSD;

    if (lang === 'ne') {
      const npr = Math.round(amountUSD * 133);
      return `रु ${npr.toLocaleString('ne-NP')}`;
    } else if (lang === 'hi') {
      const inr = Math.round(amountUSD * 83);
      return `₹${inr.toLocaleString('hi-IN')}`;
    } else {
      return `$${amountUSD.toFixed(2)}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
