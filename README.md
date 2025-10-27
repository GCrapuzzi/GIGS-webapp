# GIGS Webapp

GIGS è una piattaforma full-stack che connette professionisti e clienti per lavoretti on-demand. Il progetto è nato come web app universitaria ma offre un'architettura moderna, un flusso di autenticazione passwordless e una user experience pronta per essere raccontata nel curriculum.

## Panoramica
- **Frontend**: Single Page Application in React con React Router, gestione dello stato locale e notifiche contestuali tramite React Toastify per offrire un'esperienza utente dinamica.
- **Backend**: API REST in Node.js/Express con persistenza su MongoDB (Mongoose), autenticazione via JWT su cookie HttpOnly e invio OTP tramite Vonage SMS.
- **Storage**: Upload di immagini gestito con Multer e salvato su file system, con path esposto come asset statico per i profili utente.

## Caratteristiche principali
- **Autenticazione senza password con OTP**: verifica del numero di telefono, generazione OTP con scadenza e invio SMS via Vonage, seguita da emissione di JWT e cookie sicuro lato server.
- **Gestione annunci di lavoro**: creazione annunci autenticata, prevenzione duplicati e associazione all'utente proprietario, con ricerca e filtro per città, categoria e fascia di prezzo.
- **Profilo personalizzato**: aggiornamento di dati anagrafici, biografia, cambio numero con doppia conferma e upload foto profilo con validazione del formato.
- **Esperienza cliente/professionista**: percorsi distinti per chi cerca o offre lavoretti, ricerca guidata con validazione dei dati e navigazione verso liste di annunci o schede profilo dettagliate.
- **Gestione sessione client-side**: stato di autenticazione persistito in `sessionStorage`, accesso condizionato alle sezioni protette e logout con cleanup dello stato locale.

## Struttura del progetto
```
GIGS-webapp/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── public/uploads
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── assets/
    │   └── App.js
    └── public/
```

## Requisiti
- Node.js 18+
- MongoDB (Atlas o istanza locale)
- Credenziali Vonage SMS per l'invio degli OTP

## Configurazione ambiente
Creare un file `.env` in `backend/` partendo dalle variabili utilizzate nella configurazione e nella connessione al database.

```bash
MONGO_URI="mongodb+srv://<user>:<password>@cluster"
MONGO_INITDB_ROOT_USERNAME="<user>"
MONGO_INITDB_ROOT_PASSWORD="<password>"
PORT=4000
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="super-secret-key"
VONAGE_API_KEY="your-api-key"
VONAGE_API_SECRET="your-api-secret"
```

## Avvio in locale
1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   L'API Express sarà disponibile su `http://localhost:4000` e servirà automaticamente gli upload da `/uploads`.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   L'app React sarà disponibile su `http://localhost:3000` e comunicherà con l'API tramite gli endpoint REST esposti dal backend.

## API principali
| Metodo | Endpoint | Descrizione |
| ------ | -------- | ----------- |
| `POST` | `/users/verify` | Invia OTP al numero fornito, registrando/aggiornando l'utente. |
| `POST` | `/users/authenticate` | Valida OTP e rilascia cookie JWT per la sessione. |
| `GET` | `/users/loggedin` | Verifica il token e restituisce lo stato autenticato. |
| `POST` | `/users/updateAccount` | Aggiorna dati profilo e numero di telefono con upload foto. |
| `POST` | `/annunci/createAnnuncio` | Crea un nuovo annuncio collegato all'utente autenticato. |
| `GET` | `/annunci/listing` | Restituisce annunci per città e tipo di lavoro. |
| `GET` | `/annunci/filtra` | Filtra annunci per prezzo, città e categoria. |

## Flussi utente
- **Onboarding**: l'utente inserisce il numero, riceve OTP via SMS e viene autenticato tramite cookie HttpOnly (sicurezza contro XSS).
- **Offerta di servizi**: dopo il login, il professionista compila il form guidato, carica una foto profilo e pubblica annunci visibili nei listing filtrati per città/lavoro.
- **Ricerca annunci**: i clienti cercano tramite città e categoria predefinita, ottenendo risultati navigabili con dettagli su biografia e contatti del professionista.

## Qualità e sicurezza
- Validazione dei parametri lato server per prevenire input non validi o incoerenti (prezzi, OTP, numeri di telefono).
- Cookie HttpOnly e CORS configurati per il dominio deployato, proteggendo la sessione da accessi non autorizzati.
- Upload immagini con limitazione formato/dimensione e storage dedicato nel backend.

## Spunti di estensione
- Scrivere test automatici Jest per i controller principali (lo script `npm test` è già configurato nel backend).
- Integrare un sistema di messaging in-app o recensioni per arricchire le interazioni tra clienti e professionisti.
- Containerizzazione con Docker per deployment multi-ambiente ripetibile.

## Autori
Crapuzzi Giovanni · Saracino Cristian · Stega Paolo Pio
