import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

// Sheet ID provided by user
const SPREADSHEET_ID = '1J7sZVZ80NJlzP4GwcN2BwFekKmYJ5OPW1PVKGkxVKDw';

const sheetService = {
  async appendConsultation(data) {
    try {
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        console.warn('⚠️ Google Sheet credentials missing. Skipping sheet update.');
        return;
      }

      // Initialize auth - this is how google-spreadsheet v4 works
      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });

      const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

      await doc.loadInfo(); // loads document properties and worksheets

      const sheet = doc.sheetsByIndex[0]; // use the first sheet

      // Append row
      await sheet.addRow({
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Type: data.consultation_type,
        Description: data.description || '',
        Date: new Date().toISOString(),
        Status: 'Pending'
      });

      console.log('✅ Added to Google Sheet');
    } catch (error) {
      console.error('❌ Google Sheet Error:', error.message);
      // Don't throw error to prevent failing the API response
    }
  }
};

export default sheetService;
