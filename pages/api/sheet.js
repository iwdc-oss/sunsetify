import { google } from 'googleapis'

const env = {
  GOOGLE_CLIENT_EMAIL: 'sunsetify@auth-7f2d0.iam.gserviceaccount.com',
  GOOGLE_CLIENT_ID: '110182692029179835484',
  GOOGLE_PRIVATE_KEY:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDC7S+oKMxZrA/G\nEi8sZcs/NYbKn3PeNtUXWtKZYxDFRNwTkmE5LFn0o6IA6AeDkd/UKmQSLd6HGMeX\n96cDVQsHBjzhkcdp2CJebqoQD4uonhC8nux31xrx7azimXZwCvmbRoaqB+X0kIAv\naaSHwNv8874spq3DWkx9OCZvNxCjm8mUXGerkvgLm/LJD2qIzCKpoa5u8YkXd6Y1\n06zvxF3FUeM/G2jPAr365oWBp+AdVwb6IaXrpHI0t635zuyv0cTboRD0kz2CCprz\nVsde88Ibw6ihJ0gtB/ZP6lSTSpfrB065bRVQem2IBYrA6qEBoShpZLqY2G7Cdk6K\npRn9rVuvAgMBAAECggEAGpRuKa96ggXI1tj27sZoqxNY8HtCuPvgHcGoMvtDt6qW\nmeKdeEbYc1f2yMna8HFtRIiNQb9YdzKFUO8Xqognq0sJ9TZEK2Yp9ZeAgBUmlZUM\nMjQ3iXXe+jtPFk0XzdppQ+efiELwc+NaX1y37zz4omr4NS17R0aiZHbKIuMu1Sg1\nPXnP8wrrD2zLuINirZbEFnQwL2O6wsn3eIeR1W5tlkQo1Yov1ghGP2Bl39AocGTz\nRsFtjz1RI+BAkAN8TDmfznuGmqVEoD5aeZkzsEAvxjazL6xAQ+w0AItKl+qvywav\nSE6izeEIYnPLoabrNjeID4jRA5XCCEMxdsJkI8BNiQKBgQD75BQVBJ5KpLbQ4YRP\n7X8jKQsEWhi8WToV+9T0htOfkGyGRxfageJrA88pUGUHswv97NZ9QZosFYi35MmT\n9wDsSmbiyeALyj7REayuYtr7q9ff9uP3LPXemZkSRJp9HeO7za6xh9gydpGYKBAO\nFpLFusWG0g1/xT+8OnXh+AURWQKBgQDGGzf3wsLUUqG5EELsZoVl6E9Q7lzXf9d8\n/ZBdBwEvgzVmFkdD/F5SUPrg1ZOtwkxrecIIde+B1H2ZC3dD2M1K+oXDBhQ6Bm5z\nq8odwXmkjRkpsdPTZPqlxxiMmKUy27wqUXSmfJ/udBBFABvgrOaHuGEqrx9zre1m\n1+p/phRsRwKBgQDS5HSD3GgDKsD9RbMXkEp/z58vt5c6KqJdQYlcaX3I/IxAKEmq\nYlCFNJ0/g9Xyik+h+6bhHAnOmwDqphy3S3h0XR6jBk4U0PGi7V9cadvaFlgZZYYb\nroL0KjlkeBe4ZUwEMwLuFERIi8j+UZyPjwq3jdZPOJKgxS7Fk1SbKqJjkQKBgQCD\nJd3FXeARI6sAku1bBvvk3Qg1MbewymdjzZFWpJ56T8h4DuOa9GWU5RtQ4NNlQq3I\nsNBtPXYTYxLK0LZh6hLuQi9vToTxbPSOCvpA/KaE8wvneFwdJEpymP19hkhHBQTq\nlwY8eWB/QcLLiyjpck0jKELbORf/QvNZFDOf0djPXQKBgFGIaPXKkjXJ9nut0YgB\nJV/IacAN3eIRdE+a98zs3h1O6MOSO+tTkZnlw5hvienr5UlsD0wLMCKsG6m8+MEx\nrFUaWTVY0l9VR8ydfJ2akMVrmfXQVb259M7T+T7NlOpVGuU/yW4nCbzqk/wCJmdp\n9bHxdtmyrfECRq7Hb9EefcRJ\n-----END PRIVATE KEY-----\n',
  GOOGLE_SPREADSHEET_ID: '1-9JzuGRvwVno_kJiHTcR18M0ksv4W152Nrclx0LbCzQ',
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_id: env.GOOGLE_CLIENT_ID,
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
      spreadsheetId: env.GOOGLE_SPREADSHEET_ID,
      range: 'Sheet1!A2:B2',
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
