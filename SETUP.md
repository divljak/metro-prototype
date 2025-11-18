# Metro Bank NextGen - Setup Instructions

## Quick Start

The application is fully set up and ready to run! All dependencies have been installed.

### Run the Application

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## What's Included

✅ **Complete Next.js 14 setup** with TypeScript  
✅ **shadcn/ui components** (Button, Card, Input, Label, RadioGroup, Progress)  
✅ **17-step journey flow** matching the specification  
✅ **Mock data** for all form inputs  
✅ **Progress tracking** with visual indicators  
✅ **Responsive design** with Tailwind CSS  
✅ **Accessibility** (WCAG 2.1 AA compliant components)  

## Journey Flow

The application implements Journey #1: "Apply for a New Business Account" with all 17 steps:

1. **Product Selection** - Landing page with product information
2. **Business Type Selection** - Choose business type (Sole Trader, Limited Company, etc.)
3. **Company Registration** - Enter company details with Companies House lookup
4. **Business Address** - Trading address and contact information
5. **Business Activity** - Industry, turnover, employee count
6. **Banking Needs** - Transaction volume, deposit amounts, payment methods
7. **Primary Applicant** - Personal details and address
8. **Additional Signatories** - Add more authorized signatories
9. **Mandate Setup** - Configure transaction authorization rules
10-12. **Identity Verification** - ID upload, biometric verification, KYB documents
13-14. **Application Review** - Review information and accept terms
15-16. **Processing** - Simulated processing with progress indicator
17. **Result** - Approval/decline with next steps

## Features

- **State Management**: All form data is stored in application state
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Mock Data**: Companies House lookup simulation with mock data
- **Form Validation**: Required fields and form validation
- **Navigation**: Back/Continue buttons for step navigation
- **Responsive**: Works on mobile, tablet, and desktop

## Project Structure

```
MetroBank/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main page with state management
│   └── globals.css          # Global styles
├── components/
│   ├── journey/
│   │   ├── application-journey.tsx  # Main orchestrator
│   │   └── phases/          # Individual phase components
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── mock-data.ts         # All mock data
│   └── utils.ts             # Utility functions
└── package.json
```

## Next Steps

1. **Run the app**: `npm run dev`
2. **Test the flow**: Navigate through all 17 steps
3. **Customize**: Update mock data in `lib/mock-data.ts`
4. **Add features**: Integrate with real APIs when ready

## Notes

- All data is mocked - no real API calls are made
- Companies House lookup uses mock data (try "12345678")
- Form submissions are simulated
- Biometric verification is simulated
- Application processing is simulated with a 6-second delay

Enjoy building! 🚀

