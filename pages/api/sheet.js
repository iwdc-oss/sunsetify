import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
  ],
})

const sheets = google.sheets({ version: 'v4', auth })

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { message, datetime } = req.body
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID,
      range: `${process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_NAME}!A2:B2`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[message, datetime]],
      },
    })
    res.status(200).json({
      response,
      message: 'Successfully submitted feedback',
    })
  }
}

export default handler
