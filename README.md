### **Responsive Personal Finance Web App**

I would like to build a **responsive web application** to track personal finances. The app should adapt to various device types and screen sizes (mobile, tablet, desktop) using modern responsive design principles.

---

### **Tech Stack Requirements**

* **Frontend**: React (must be used for the entire UI)
* **Backend & Database**: Supabase (for authentication and database storage)
* **Hosting**: Vercel (the app will be deployed here)

---

### **Project Progress**

- [x] Set up React project with Vite
- [x] Installed Supabase client library
- [x] Created Login/Sign-up UI components
- [x] Implemented Profile Management UI
- [x] Created Financial Data Entry form

### **1. User Authentication**

* On first launch, show a **Login / Sign-up screen**.
* Use **Supabase Auth** for email/password-based user authentication.
* After successful login:

  * If the user already has one or more profiles created, they should be **prompted to select a profile**.
  * If no profiles exist, show a message like: **“Click + to add profiles.”**

---

### **2. Profile Management**

* A user can create **multiple profiles** representing themselves or family members.
* Each profile contains:
  * Name

* Profiles are stored in Supabase and linked to the user account.

---

### **3. Financial Data Entry**

* After selecting a profile:

  * If **no financial data** exists for the profile, prompt the user to **enter new financial details**.
  * If **data already exists**, **pre-fill the form** with the most recent entry for that profile.

* Users must select a **date** for the financial entry.

* All financial fields:

  * Accept **numeric values**, including **decimals**
  * Are denominated in **Indian Rupees (₹)**

#### Financial data includes the following categories:

##### **High & Medium Risk Assets**

* Direct Equity
* ESOPs
* Equity PMS
* ULIP
* Real Estate
* Real Estate Funds
* Private Equity
* Equity Mutual Funds
* Structured Products - Equity
* **Total High & Medium Risk Assets** (auto-calculated)

##### **Low Risk Assets**

* Bank Balance
* Debt Mutual Funds
* Endowment Plans
* Fixed Deposits
* NPS
* Employee Provident Fund (EPF)
* Public Provident Fund (PPF)
* Structured Products - Debt
* Gold ETFs / Funds
* **Total Low Risk Assets** (auto-calculated)

##### **Total Assets**

* Calculated as the sum of all high/medium + low risk assets

---

### **4. Visual Analytics**

* This is shown on a **separate screen from the data entry form**.
* For each profile, the following should be displayed:

  * A **pie chart** showing the distribution between High/Medium Risk and Low Risk assets
  * A **line graph** showing the change in total assets over time
* Include filters for viewing data by time periods (e.g., last 30 days, 3 months, 1 year)

---

### **5. Combined Portfolio View**

* The user should also have access to a **dashboard showing combined data** from all their profiles.
* It must include:

  * Aggregate totals of all financial categories
  * Combined pie chart of risk distribution
  * Line graph showing trends in the overall portfolio

---

### **6. Design & Responsiveness**

* The app must be fully **responsive**:

  * Optimized for mobile, tablet, and desktop views

---

### **7. Database & Data Handling (Supabase)**

* All data (users, profiles, and financial entries) should be stored in Supabase tables
* Financial entries must:

  * Be linked to a specific profile ID
  * Include a timestamped **date field**
* Full **CRUD operations** should be supported for profiles and financial records