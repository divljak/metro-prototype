# Metro Bank NextGen - Business Account Application

A Next.js application for the Metro Bank business account application journey, built with shadcn/ui components.

## Features

- Multi-step application form with progress tracking
- Mocked data for all form inputs
- Responsive design with Tailwind CSS
- Accessible components following WCAG 2.1 AA standards
- Journey-based flow matching the specification

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app directory
- `/components/journey` - Journey flow components
- `/components/ui` - shadcn/ui components
- `/lib` - Utilities and mock data
- `/journey-01-apply-for-new-business-account.md` - Journey specification

## Journey Flow

The application follows the 17-step journey defined in the specification:

1. Product Selection
2. Business Type Selection
3. Company Registration
4. Business Address
5. Business Activity
6. Banking Needs
7. Primary Applicant
8. Additional Signatories
9. Mandate Setup
10-12. Identity Verification (ID, Biometric, KYB)
13-14. Application Review & Consent
15-16. Processing
17. Result

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives

