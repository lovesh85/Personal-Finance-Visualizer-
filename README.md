# Personal Finance Visualizer

A simple web application for tracking personal finances.

## Features

### Stage 1: Basic Transaction Tracking
- Add, edit, and delete transactions (amount, date, description)
- Transaction list view
- Monthly expenses bar chart
- Basic form validation

### Stage 2: Categories
- All Stage 1 features
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards: total expenses, category breakdown, most recent transactions

### Stage 3: Budgeting
- All Stage 2 features
- Set monthly category budgets
- Budget vs actual comparison chart
- Simple spending insights

## Technology Stack
- Next.js
- React
- shadcn/ui
- Recharts
- MongoDB

## Setup and Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up MongoDB:
   - Ensure you have MongoDB installed and running locally, or provide a MongoDB URI.
   - Create a `.env.local` file in the root directory with the following content:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to use the app.

## Usage

- Add transactions with amount, date, description, and category.
- View transactions in a list and edit or delete them.
- Visualize monthly expenses and category breakdowns with charts.
- Set monthly budgets per category and compare actual spending against budgets.

## Notes

- No authentication or login features are implemented as per the project requirements.
- The UI is responsive and includes error handling for form inputs and API requests.

## Deployment

You can deploy this app to any platform that supports Next.js applications, such as Vercel or Netlify.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [Lovesh Sharma] at [slovesh52@gmail.com].
