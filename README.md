# Address-AI

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337381/projects/address-ai/hddbvlea6wueoipcdy9m.png)

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337381/projects/address-ai/a0tfxt8zmeofsfmtbtfi.png)

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337381/projects/address-ai/c8xd5fjjfqce7ut7budz.png)

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337383/projects/address-ai/ydrzfrhsm95clt5nlm1q.png)

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337382/projects/address-ai/vuqhducgbjecpbd1xcan.png)

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337386/projects/address-ai/dpqltufby6uztgi5gzxu.png)

![](https://res.cloudinary.com/dvovo1lfg/image/upload/v1735337383/projects/address-ai/vmiwol1svcj8pzuye2yl.png)

Address-AI is an innovative web application designed to solve the prevalent issue of incorrect address entries. By leveraging cutting-edge AI and OCR technologies, it ensures accurate and efficient address correction, reducing delays and enhancing delivery success rates. The platform detects mismatches in addresses, such as incorrect pin codes or area names, suggests corrections, and provides real-time visual feedback on corrected addresses.  

Whether you’re a postal worker, delivery company, or e-commerce platform, Address-AI simplifies address validation for single entries or bulk uploads with seamless integration options like CSV import, QR/barcode uploads, and live map visualizations.  

## Features 🎉

- 🏠 **Single Address Correction:** Effortlessly correct individual addresses with high accuracy and AI validation.  
- 📋 **Bulk Address Correction:** Process multiple addresses simultaneously with advanced bulk correction functionality.  
- 📂 **CSV File Import for Address Processing:** Import CSV files containing addresses and let the system handle corrections automatically.  
- 🔍 **AI-Powered OCR for Address Retrieval:** Extract addresses from uploaded images using Optical Character Recognition (OCR) technology.  
- 🧾 **QR or Barcode Uploader:** Retrieve address information directly by uploading QR codes or barcodes for seamless integration.  
- 📱 **QR Code Scanner for On-the-Go Retrieval:** Designed for postal workers to scan QR codes and access accurate address details instantly.  
- 🗺️ **Live Map Visualization for Corrected Addresses:** Get an interactive, real-time map view of corrected addresses for enhanced accuracy and verification.  
- ⚡ **Lightning-Fast Corrections:** Powered by advanced AI and optimized algorithms to ensure quick and reliable address validation.  
- 🔐 **Secure and Scalable Authentication:** Includes role-based secure authentication for different user types like postal workers, delivery agents, and admins.  
- 🌟 **Cloud Integration for Data Backup:** Never lose your data with automated cloud backups and restoration capabilities.  
- 📤 **Export Corrected Addresses:** Easily export validated and corrected addresses for downstream use.  
- 💻 **Modern, Responsive Design:** Built with TailwindCSS and ShadCN UI to ensure a seamless and user-friendly experience across devices.  
- 🚀 **Optimized API via Hono.js:** Experience fast and reliable backend performance, ensuring minimal downtime.  
- 🌍 **Deployed on Vercel for Reliability:** Enjoy fast, scalable, and globally accessible deployment.  

## Tech Stack 🛠️

- **Frontend:** Next.js, TypeScript  
- **Backend:** Drizzle ORM, Hono.js  
- **Database:** PostgreSQL  
- **AI/ML Integration:** Pinecone, LangChain  
- **Styles:** TailwindCSS, ShadCN UI  
- **Deployment:** Vercel  

## Installation

To set up and run Address-AI locally, follow these steps:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/Sourav-Goyal19/address-ai.git
   cd address-ai
   ```
2. Install the dependencies:
   
   ```bash
   npm install
   ```
3. Provide your own database connection string and API keys in the .env file:
   
   ```bash
   DATABASE_URL=""
   NEXT_PUBLIC_DATABASE_URL=""
   AUTH_DRIZZLE_URL=""
   GOOGLE_API_KEY=""
   PYTHON_SERVER_URL=""
   NEXTAUTH_URL=
   NEXTAUTH_SECRET=
   JWT_SECRET=
   JWT_SIGNING_KEY=
   JWT_ENCRYPTION_KEY=
   JWT_MAX_AGE=30d
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Start the development server:
   
   ```bash
   npm run dev
   ```

## Usage
- Log in to the platform to access the Address Verifier page.
- Use the interface to correct individual addresses, upload CSV files, or scan QR codes for address retrieval.

## Deployment
For deployment instructions, follow the typical Next.js deployment process. The application is live [here](https://address-ai.vercel.app).

## Contributing
Contributions are welcome! Please follow the standard fork-and-pull request workflow. Ensure your code adheres to the project's coding standards and passes all tests.
