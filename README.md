# 🛡️ Bhumi-Surokkha (Land Protection)
**A Smart Land Management & Verification System**
*Developed for Daffodil Land Tech Hackathon 2026*

**👨‍💻 Team Name:** ROOTx
**Developers:**
- **MD. Jahid Hasan Topu** ([GitHub Profile](https://github.com/topu-10j))
- **Easin Farhad Rishad**

---

## 📌 Problem Statement
In Bangladesh, land disputes account for over 80% of civil cases, causing immense financial and emotional distress to citizens. The primary issues include:
- **Double Selling & Forgery:** Selling the same land to multiple buyers using forged documents.
- **Complex Record Chains:** Ordinary people struggle to navigate the complex historical records (CS → SA → RS → BRS).
- **Mutation (Namjari) Issues:** Failure to update land records after inheritance or purchase, leading to legal vulnerabilities.
- **Illegal Acquisition:** Buying government *Khas* land or disputed land without knowing its legal status.

## 💡 Our Solution
**Bhumi-Surokkha** is a **Plug-and-Play, Interactive Map-Based Timeline Tracker**. 
We are not replacing the government's land database; instead, we are converting complex government data into a simple, user-friendly visual interface. Our solution can be easily integrated with the Ministry of Land's existing e-Porcha or Land Record systems.

## ✨ Key Features
- **🗺️ Interactive Map & Timeline:** Click on any land plot on the map to instantly view its entire ownership history (CS to BRS) without dealing with dropdown menus.
- **🚨 Visual Fraud Alerts:** Land plots are color-coded on the map:
  - 🟢 **Green:** Safe / General Land
  - 🔴 **Red:** Government *Khas* Land (Purchase prohibited)
  - 🟣 **Purple:** Disputed / Court-case Land (Sale restricted)
- **🎙️ AI Voice Assistant:** Users can simply speak commands (e.g., "Go to Dhaka", "Zoom in", "Show Rahim's land") to navigate the map, making it accessible for illiterate or elderly citizens.
- **📷 AI OCR Scanner (Demo):** Users can upload deed images to verify authenticity and extract text.
- **⚖️ Islamic Inheritance Calculator:** Simplifies the complex distribution of land among heirs according to Islamic law (Sharia).
- **🌐 Bilingual Support:** Understands both Bengali and English inputs for location and owner searches.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6)
- **Mapping Library:** Leaflet.js (OpenStreetMap & Satellite view)
- **AI & Voice:** Web Speech API (Speech Recognition & Synthesis)
- **UI/UX:** Custom Glassmorphism Design, Responsive Mobile-First Layout

## 🚀 How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/topu-10j/Bhumi-Surokkha.git
