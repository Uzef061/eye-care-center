// Initial Stock & Inventory Seed Database
export const INITIAL_STOCKS = [
  {
    sku: "STK-FRM-101",
    name: "VISION X Apex Titanium Frame",
    category: "Prescription Frames",
    unitCost: 65.00,
    unitPrice: 185.00,
    quantity: 18,
    reorderLevel: 5,
    supplier: "Lumina Craft Optics Ltd.",
    status: "In Stock"
  },
  {
    sku: "STK-LNS-202",
    name: "HD High Index 1.67 Aspheric Lens Blank",
    category: "Optical Lens Stock",
    unitCost: 45.00,
    unitPrice: 210.00,
    quantity: 4,
    reorderLevel: 10,
    supplier: "Precision Wavefront Optics",
    status: "Low Stock"
  },
  {
    sku: "STK-SUN-303",
    name: "Solar Shield Polarized Aviator",
    category: "Sunglasses",
    unitCost: 50.00,
    unitPrice: 165.00,
    quantity: 22,
    reorderLevel: 8,
    supplier: "Solaris UV Eyewear",
    status: "In Stock"
  },
  {
    sku: "STK-BLU-404",
    name: "OptiBlue 450nm Digital Shield Glasses",
    category: "Computer Glasses",
    unitCost: 35.00,
    unitPrice: 120.00,
    quantity: 3,
    reorderLevel: 6,
    supplier: "Digital Care Corp",
    status: "Low Stock"
  },
  {
    sku: "STK-CNT-505",
    name: "AcuMoist Daily Contact Lenses (30 Box)",
    category: "Contact Lenses",
    unitCost: 18.00,
    unitPrice: 48.00,
    quantity: 45,
    reorderLevel: 15,
    supplier: "Hydrogel Care Inc.",
    status: "In Stock"
  },
  {
    sku: "STK-ACC-606",
    name: "Ultrasonic Lens Cleaning & Microfiber Kit",
    category: "Accessories",
    unitCost: 4.50,
    unitPrice: 15.00,
    quantity: 2,
    reorderLevel: 10,
    supplier: "OptiClean Supplies",
    status: "Reorder Required"
  }
];
