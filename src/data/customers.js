// Initial Seed Customer Database
export const INITIAL_CUSTOMERS = [
  {
    id: "CUST-1001",
    fullName: "Eleanor Vance",
    phone: "+1 (555) 234-5678",
    email: "eleanor.vance@example.com",
    address: "742 Evergreen Terrace, Cityville",
    lastVisit: "2026-07-20",
    totalPurchases: "$485.00",
    prescription: {
      sphOD: "-2.50",
      cylOD: "-0.75",
      axisOD: "90°",
      sphOS: "-2.25",
      cylOS: "-0.50",
      axisOS: "85°",
      pd: "63mm"
    },
    notes: "Prefers ultra-lightweight titanium frames with anti-reflective coating.",
    createdAt: "2025-11-12"
  },
  {
    id: "CUST-1002",
    fullName: "Marcus Sterling",
    phone: "+1 (555) 876-5432",
    email: "m.sterling@example.com",
    address: "108 Ocean Drive, Bay City",
    lastVisit: "2026-08-01",
    totalPurchases: "$210.00",
    prescription: {
      sphOD: "+1.75",
      cylOD: "-1.25",
      axisOD: "180°",
      sphOS: "+1.50",
      cylOS: "-1.00",
      axisOS: "175°",
      pd: "66mm"
    },
    notes: "High cylinder astigmatism check. Computer blue-light filter added.",
    createdAt: "2026-01-15"
  },
  {
    id: "CUST-1003",
    fullName: "Sophia Chen",
    phone: "+1 (555) 345-6789",
    email: "sophia.chen@example.com",
    address: "42 Wall Street, Suite 900",
    lastVisit: "2026-08-10",
    totalPurchases: "$340.00",
    prescription: {
      sphOD: "-4.00",
      cylOD: "0.00",
      axisOD: "-",
      sphOS: "-3.75",
      cylOS: "-0.25",
      axisOS: "45°",
      pd: "61mm"
    },
    notes: "Purchased high-index 1.67 progressive power glasses.",
    createdAt: "2026-03-22"
  }
];
