const translations = {
    en: {
        "dashboard-title": "Dashboard",
        "stats": "Statistics",
        "report": "Report",
        "notifications": "Notifications",
        "settings": "Settings",
        "logout": "Logout",
        "total-balance": "Total Balance",
        "balance-amount": "₹0",
        "card-info": "Card Info: No Account Linked",
        "customer-services": "Customer Services",
        "offline-mode": "Simulate Offline Mode",
        "voice-query": "Voice Query",
        "service-ticket": "Service Ticket",
        "appointment": "Appointment"
    },
    hi: {
        "dashboard-title": "डैशबोर्ड",
        "stats": "सांख्यिकी",
        "report": "रिपोर्ट",
        "notifications": "सूचनाएं",
        "settings": "सेटिंग्स",
        "logout": "लॉग आउट",
        "total-balance": "कुल शेष राशि",
        "balance-amount": "₹0",
        "card-info": "कार्ड जानकारी: कोई खाता लिंक नहीं",
        "customer-services": "ग्राहक सेवाएँ",
        "offline-mode": "ऑफ़लाइन मोड सिमुलेट करें",
        "voice-query": "वॉयस क्वेरी",
        "service-ticket": "सेवा टिकट",
        "appointment": "नियुक्ति"
    },
    mr: {
        "dashboard-title": "डॅशबोर्ड",
        "stats": "सांख्यिकी",
        "report": "अहवाल",
        "notifications": "सूचना",
        "settings": "सेटिंग्ज",
        "logout": "बाहेर पडणे",
        "total-balance": "एकूण शिल्लक",
        "balance-amount": "₹0",
        "card-info": "कार्ड माहिती: कोणतेही खाते लिंक नाही",
        "customer-services": "ग्राहक सेवा",
        "offline-mode": "ऑफलाइन मोड अनुकरण करा",
        "voice-query": "व्हॉइस क्वेरी",
        "service-ticket": "सेवा तिकीट",
        "appointment": "अपॉइंटमेंट"
    }
};

function changeLanguage(lang) {
    Object.keys(translations[lang]).forEach(id => {
        document.getElementById(id).textContent = translations[lang][id];
    });
}
