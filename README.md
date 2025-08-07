# Money Management Mobile App

A comprehensive money management mobile application built with React Native, Expo, and Supabase. This app provides a complete user portal system with authentication and powerful financial management features.

## Features

### 🔐 User Portal & Authentication
- **Secure Account Creation**: Email/password signup with strong password requirements
- **Multi-Factor Authentication**: Email verification for enhanced security
- **Biometric Login**: Fingerprint and face recognition support
- **Social Login**: Google and Apple authentication (ready for configuration)
- **Password Recovery**: Secure password reset via email
- **Profile Management**: Update personal information, currency preferences, and profile pictures

### 💰 Financial Management
- **Transaction Tracking**: Add, edit, and delete income/expense transactions
- **Receipt Management**: Upload and store receipt images
- **Category Management**: Predefined and custom categories
- **Account Management**: Track multiple accounts (Bank, Cash, Credit Cards)
- **Recurring Transactions**: Set up automatic recurring entries

### 📊 Budget & Goals
- **Budget Creation**: Set spending limits by category and time period
- **Budget Tracking**: Real-time progress monitoring with visual indicators
- **Financial Goals**: Set and track savings goals with deadlines
- **Goal Milestones**: Receive notifications for achievement milestones
- **Progress Visualization**: Interactive charts and progress bars

### 📈 Reports & Analytics
- **Financial Reports**: Monthly income, expense, and savings summaries
- **Data Visualization**: Interactive charts and graphs
- **Export Functionality**: Export reports as PDF/CSV
- **Spending Insights**: AI-powered spending analysis and recommendations
- **Trend Analysis**: Track financial patterns over time

### 🔔 Smart Notifications
- **Budget Alerts**: Notifications when approaching or exceeding budget limits
- **Goal Reminders**: Progress updates and milestone celebrations
- **Bill Reminders**: Never miss important payment dates
- **Recurring Transaction Alerts**: Automatic transaction processing notifications

### 🔒 Security & Privacy
- **Data Encryption**: AES-256 encryption for all sensitive data
- **Row-Level Security**: Database-level access control
- **Secure API Communication**: HTTPS-only data transmission
- **GDPR/CCPA Compliance**: Privacy regulation compliance
- **Automatic Backups**: Secure cloud backup and restore functionality

## Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Navigation**: React Navigation 6
- **State Management**: React Context API
- **Charts**: React Native Chart Kit
- **UI Components**: React Native Paper + Custom Components
- **Authentication**: Supabase Auth with biometric support
- **Database**: PostgreSQL with Row-Level Security
- **File Storage**: Supabase Storage for receipts and profile pictures

## Getting Started

### Prerequisites
- Node.js 16+ 
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)
- Supabase account

### Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd money-management-app
   npm install
   ```

2. **Configure Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `src/config/supabase.ts` with your credentials:
   ```typescript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

3. **Set Up Database**
   - Run the migration file in your Supabase SQL editor:
   ```sql
   -- Copy and paste the contents of supabase/migrations/create_initial_schema.sql
   ```

4. **Configure Authentication**
   - In Supabase Dashboard, go to Authentication > Settings
   - Configure email templates and providers as needed
   - Enable email confirmations if desired

5. **Start Development Server**
   ```bash
   npm start
   ```

6. **Run on Device**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or use iOS Simulator / Android Emulator

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── navigation/         # Navigation configuration
├── screens/           # Screen components
│   ├── auth/         # Authentication screens
│   └── main/         # Main app screens
├── types/            # TypeScript type definitions
├── config/           # Configuration files
└── utils/            # Utility functions

supabase/
└── migrations/       # Database migration files
```

## Key Features Implementation

### User Portal System
The app enforces a mandatory user portal where users must create an account before accessing any financial features. This ensures:
- Data security and privacy
- Personalized financial tracking
- Cloud synchronization across devices
- Secure backup and restore capabilities

### Real-time Data Synchronization
All financial data is synchronized in real-time across devices using Supabase's real-time capabilities, ensuring users always have access to their latest financial information.

### Offline Support
The app includes offline functionality, allowing users to:
- View previously loaded data when offline
- Add transactions offline (synced when online)
- Access core features without internet connection

### Security Features
- **Row-Level Security**: Database policies ensure users can only access their own data
- **Encrypted Storage**: All sensitive data is encrypted at rest
- **Secure Authentication**: Multi-factor authentication with biometric support
- **API Security**: All API communications use HTTPS with proper authentication

## Deployment

### Mobile App Deployment
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Or use EAS Build (recommended)
eas build --platform all
```

### Web Deployment (Optional)
```bash
# Build for web
expo build:web

# Deploy to Netlify, Vercel, or other static hosting
```

## Environment Variables

Create a `.env` file in the root directory:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [documentation](docs/)
- Contact the development team

## Roadmap

- [ ] Advanced analytics and insights
- [ ] Cryptocurrency tracking
- [ ] Investment portfolio management
- [ ] Bill splitting features
- [ ] Multi-currency support
- [ ] Bank account integration (Plaid)
- [ ] AI-powered financial advice
- [ ] Family account sharing
- [ ] Advanced reporting features
- [ ] Tax preparation assistance

---

Built with ❤️ using React Native, Expo, and Supabase