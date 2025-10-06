
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
- Postman ([Download here](https://www.postman.com/downloads/))
- Google Gemini API key ([Get it here](https://ai.google.dev/))

## 🛠️ Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
````

3.  **Set up environment variables**

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

### 1\. Health Check

```bash
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "Meeting Minutes Extractor API is running",
  "timestamp": "2025-10-06T12:00:00.000Z"
}
```

### 2\. Process Meeting Notes

```bash
POST /api/process-meeting
```

## 🧪 Testing with Postman

Once the server is running, you can use Postman to test the API endpoints. Two sample files are provided in the `samples/` directory for testing file uploads.

### Option 1: Upload a .txt File

1.  Open Postman and create a new request.
2.  Set the request method to `POST`.
3.  Enter the request URL: `http://localhost:3000/api/process-meeting`
4.  Navigate to the **Body** tab and select the `form-data` option.
5.  In the key-value table below:
      - In the `KEY` column, enter `file`.
      - Hover over the `KEY` field, and a dropdown will appear. Change its type from `Text` to `File`.
      - In the `VALUE` column, click **Select Files** and choose a file from the `samples/` directory (e.g., `sample1.txt` or `sample2.txt`).
6.  Click the **Send** button to submit the request.

### Option 2: Send Raw Text in Body

1.  Open Postman and create a new request.
2.  Set the request method to `POST`.
3.  Enter the request URL: `http://localhost:3000/api/process-meeting`
4.  Navigate to the **Headers** tab and add a new header:
      - **KEY**: `Content-Type`
      - **VALUE**: `application/json`
5.  Navigate to the **Body** tab, select the `raw` option, and choose `JSON` from the dropdown menu on the right.
6.  Paste the following JSON payload into the text area:
    ```json
    {
      "text": "Team Sync – May 26\n\n- We'll launch the new product on June 10.\n- Ravi to prepare onboarding docs by June 5.\n- Priya will follow up with logistics team on packaging delay.\n- Beta users requested a mobile-first dashboard."
    }
    ```
7.  Click the **Send** button.

### Sample Response

A successful request will yield a response similar to this:

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

**Issue: "GEMINI\_API\_KEY is required"**

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

```
```