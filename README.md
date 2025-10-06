# Meeting Minutes Extractor API

AI-powered backend service that extracts structured information from meeting notes using Google's Gemini API.

## 🚀 Features

- Extract **summary** (2-3 sentences)
- Extract **key decisions** made
- Extract **action items** with task, owner, and deadline
- Accepts both `.txt` file uploads and raw text in request body
- Clean, structured JSON output
- Comprehensive error handling
- Request logging with Morgan

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key ([Get it here](https://ai.google.dev/))

## 🛠️ Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
PORT=3000
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=development
```

## 🏃 Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### 1. Health Check
```bash
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Meeting Minutes Extractor API is running",
  "timestamp": "2024-05-26T10:30:00.000Z"
}
```

### 2. Process Meeting Notes

```bash
POST /api/process-meeting
```

## 📝 Usage Examples

### Option 1: Upload a .txt File

```bash
curl -X POST http://localhost:3000/api/process-meeting \
  -F "file=@samples/sample1.txt"
```

### Option 2: Send Raw Text in Body

```bash
curl -X POST http://localhost:3000/api/process-meeting \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Team Sync – May 26\n\n- We'\''ll launch the new product on June 10.\n- Ravi to prepare onboarding docs by June 5.\n- Priya will follow up with logistics team on packaging delay.\n- Beta users requested a mobile-first dashboard."
  }'
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "summary": "The team confirmed the product launch on June 10, assigned onboarding preparation and logistics follow-up, and discussed user feedback on mobile design.",
    "decisions": [
      "Launch set for June 10",
      "Need mobile-first dashboard for beta users"
    ],
    "actionItems": [
      {
        "task": "Prepare onboarding docs",
        "owner": "Ravi",
        "due": "June 5"
      },
      {
        "task": "Follow up with logistics team",
        "owner": "Priya"
      }
    ]
  }
}
```

## 🧪 Testing with Sample Files

Two sample files are provided in the `samples/` directory:

1. **sample1.txt** - Simple team sync meeting
2. **sample2.txt** - Detailed strategy meeting

Test them using:
```bash
curl -X POST http://localhost:3000/api/process-meeting \
  -F "file=@samples/sample1.txt"

curl -X POST http://localhost:3000/api/process-meeting \
  -F "file=@samples/sample2.txt"
```

## 📦 Project Structure

```
meeting-minutes-extractor/
├── src/
│   ├── config/
│   │   └── index.ts              # Configuration and env validation
│   ├── controllers/
│   │   └── meeting.controller.ts # Request handlers
│   ├── middlewares/
│   │   ├── error.middleware.ts   # Error handling
│   │   └── upload.middleware.ts  # File upload (Multer)
│   ├── routes/
│   │   └── meeting.routes.ts     # API routes
│   ├── services/
│   │   └── gemini.service.ts     # Gemini API integration
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── utils/
│   │   ├── logger.ts             # Custom logger
│   │   └── validator.ts          # Input/output validation
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── samples/
│   ├── sample1.txt               # Sample meeting notes
│   └── sample2.txt               # Sample meeting notes
├── .env.example                  # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Error Handling

The API handles various error scenarios:

- **Missing input**: Returns 400 with appropriate message
- **Invalid file type**: Only `.txt` files accepted
- **API timeout**: Returns timeout error message
- **API quota exceeded**: Returns quota error message
- **Invalid JSON from AI**: Handles parsing errors gracefully
- **Empty input**: Validates non-empty content

## 🛡️ Input Validation

- File size limit: 5MB
- Only `.txt` files accepted for uploads
- Text body must not be empty
- AI response validated for correct structure

## 🎯 Key Technologies

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Multer** - File upload handling
- **Morgan** - HTTP request logging
- **Google Gemini API** - AI processing
- **dotenv** - Environment configuration

## 📌 Notes

- The Gemini API requires an active API key with available quota
- Responses are non-deterministic (AI-generated) and may vary
- Large meeting notes may take longer to process
- File uploads are stored in memory (not persisted to disk)

## 🐛 Troubleshooting

**Issue: "GEMINI_API_KEY is required"**
- Ensure your `.env` file exists and contains a valid API key

**Issue: API timeout**
- Check your internet connection
- Verify Gemini API is accessible from your location

**Issue: Quota exceeded**
- Check your Gemini API usage limits
- Wait for quota reset or upgrade your plan

## 📄 License

MIT

## 👨‍💻 Developer

Built as an intern assignment for demonstrating AI integration in Node.js backend services.