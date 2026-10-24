/**
 * SMART ADVERTISING FLEX PRINTING - INSTANT QUOTE ESTIMATOR
 * All rates are customizable below.
 */

// ========================================================
// PRICING RATE CONSTANTS (TODO: Update these with your exact shop prices)
// All rates are in INR (₹)
// ========================================================
const RATES = {
  // Flex banners (per sq.ft)
  normal_flex: 12,              // Standard Frontlit 260-280 GSM
  star_flex: 22,                // Star Frontlit High-Grade Heavy Duty
  backlit_flex: 38,             // Translucent Backlit Flex for Lightboxes
  blackout_flex: 28,            // Black Backing Blockout Flex

  // Vinyl & Sunboards (per sq.ft)
  regular_vinyl: 35,            // Self-Adhesive Vinyl with Gloss/Matte Lamination
  vinyl_sunboard_3mm: 65,       // Vinyl printed + pasted on 3mm Sunboard
  vinyl_sunboard_5mm: 85,       // Vinyl printed + pasted on 5mm Sunboard
  one_way_vision: 70,           // Perforated One Way Vision Glass Film

  // Signboards (per sq.ft)
  glow_sign_box: 180,           // Standard LED Backlit Glow Sign Board Box
  acrylic_letters: 250,         // 3D Acrylic LED Letter Board

  // Fixed item products (per unit)
  standee_standard_6x3: 850,    // Standard 6x3 ft Roll-up Standee with Flex & Base
  standee_premium_6x3: 1350,    // Premium Heavy Aluminium Standee 6x3 ft
  visiting_cards_1000: 600,     // 1000 Business Cards (350 GSM Double-side)
  visiting_cards_500: 400,      // 500 Business Cards (350 GSM)

  // Finishing Add-ons (per unit or banner)
  finishing_eyelets: 20,        // Metal Eyelets / Grommets on corners
  finishing_stitching: 30,      // Reinforced perimeter border stitching
  finishing_wooden_frame: 45    // Wooden framing support (per running foot approx)
};

// Material Descriptions for WhatsApp message & Summary
const MATERIAL_NAMES = {
  normal_flex: 'Normal Flex Banner (Standard 280 GSM)',
  star_flex: 'Star Flex Banner (Heavy Duty High-Res)',
  backlit_flex: 'Backlit Flex Banner (For Glow Signs)',
  blackout_flex: 'Blackout Flex Banner (Opaque Backing)',
  regular_vinyl: 'Vinyl Print with Lamination',
  vinyl_sunboard_3mm: 'Vinyl with 3mm Sunboard Sheet',
  vinyl_sunboard_5mm: 'Vinyl with 5mm Sunboard Sheet',
  one_way_vision: 'One Way Vision Glass Film',
  glow_sign_box: 'LED Glow Signboard Box',
  acrylic_letters: '3D Acrylic Raised LED Letters',
  standee_standard_6x3: 'Roll-up Standee 6x3 ft (Standard)',
  standee_premium_6x3: 'Roll-up Standee 6x3 ft (Premium)',
  visiting_cards_1000: 'Visiting Cards (1,000 pcs)',
  visiting_cards_500: 'Visiting Cards (500 pcs)'
};

document.addEventListener('DOMContentLoaded', () => {
  const materialSelect = document.getElementById('estMaterial');
  const widthInput = document.getElementById('estWidth');
  const heightInput = document.getElementById('estHeight');
  const unitSelect = document.getElementById('estUnit');
  const quantityInput = document.getElementById('estQuantity');
  const dimensionGroup = document.getElementById('dimensionFieldsGroup');
  
  const chkEyelets = document.getElementById('optEyelets');
  const chkStitching = document.getElementById('optStitching');
  const chkLamination = document.getElementById('optLamination');
  
  // Summary UI elements
  const summaryMaterial = document.getElementById('sumMaterial');
  const sumDimensions = document.getElementById('sumDimensions');
  const sumArea = document.getElementById('sumArea');
  const sumRate = document.getElementById('sumRate');
  const sumQuantity = document.getElementById('sumQuantity');
  const sumFinishing = document.getElementById('sumFinishing');
  const sumTotalPrice = document.getElementById('sumTotalPrice');
  const btnSendWhatsApp = document.getElementById('btnSendQuoteWhatsApp');

  if (!materialSelect) return;

  function isFixedProduct(matKey) {
    return matKey.startsWith('standee_') || matKey.startsWith('visiting_cards_');
  }

  function calculateQuote() {
    const materialKey = materialSelect.value;
    const isFixed = isFixedProduct(materialKey);
    let qty = parseInt(quantityInput.value, 10) || 1;
    if (qty < 1) qty = 1;

    let width = parseFloat(widthInput.value) || 0;
    let height = parseFloat(heightInput.value) || 0;
    const unit = unitSelect ? unitSelect.value : 'ft';

    let areaSqFt = 0;
    let unitPrice = 0;
    let finishingCost = 0;
    let finishingList = [];

    if (isFixed) {
      if (dimensionGroup) dimensionGroup.style.display = 'none';
      unitPrice = RATES[materialKey] || 0;
      
      if (materialKey.includes('standee')) {
        sumDimensions.textContent = '6 ft × 3 ft';
        sumArea.textContent = '18 sq.ft';
      } else {
        sumDimensions.textContent = 'Standard (3.5 × 2 in)';
        sumArea.textContent = 'Box package';
      }

      sumRate.textContent = `₹${unitPrice} / unit`;
    } else {
      if (dimensionGroup) dimensionGroup.style.display = 'block';
      
      // Calculate sq.ft
      if (unit === 'in') {
        areaSqFt = (width * height) / 144;
      } else {
        areaSqFt = width * height;
      }

      // Minimum billable area 4 sq.ft per banner
      if (areaSqFt > 0 && areaSqFt < 4) {
        areaSqFt = 4;
      }

      const ratePerSqFt = RATES[materialKey] || 15;
      sumRate.textContent = `₹${ratePerSqFt} / sq.ft`;
      sumDimensions.textContent = `${width} ${unit} × ${height} ${unit}`;
      sumArea.textContent = `${areaSqFt.toFixed(2)} sq.ft`;

      // Check finishing add-ons
      if (chkEyelets && chkEyelets.checked) {
        finishingCost += RATES.finishing_eyelets;
        finishingList.push('Eyelets');
      }
      if (chkStitching && chkStitching.checked) {
        finishingCost += RATES.finishing_stitching;
        finishingList.push('Stitching');
      }
      if (chkLamination && chkLamination.checked) {
        finishingCost += (areaSqFt * 8); // ₹8 per sq.ft extra lamination
        finishingList.push('Gloss/Matte Lamination');
      }

      unitPrice = (areaSqFt * ratePerSqFt) + finishingCost;
    }

    let grandTotal = Math.round(unitPrice * qty);
    if (grandTotal < 100 && !isFixed) grandTotal = 100; // minimum bill ₹100

    // Update Summary in DOM
    summaryMaterial.textContent = MATERIAL_NAMES[materialKey] || materialKey;
    sumQuantity.textContent = `${qty} pcs`;
    sumFinishing.textContent = finishingList.length > 0 ? finishingList.join(', ') : 'Standard trimming';
    sumTotalPrice.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

    // Prepare WhatsApp message
    const msg = `Hello Smart Advertising,\n\nI used your Website Quote Estimator and would like to confirm my order:\n- *Service/Material*: ${MATERIAL_NAMES[materialKey] || materialKey}\n- *Size*: ${sumDimensions.textContent} (${sumArea.textContent})\n- *Quantity*: ${qty} pcs\n- *Finishing*: ${sumFinishing.textContent}\n- *Estimated Total*: ~₹${grandTotal.toLocaleString('en-IN')}\n\nPlease check this order and share delivery timeframe & final invoice details. Thank you!`;

    if (btnSendWhatsApp) {
      btnSendWhatsApp.href = `https://wa.me/918888086602?text=${encodeURIComponent(msg)}`;
    }
  }

  // Listen for changes
  const inputs = [materialSelect, widthInput, heightInput, unitSelect, quantityInput, chkEyelets, chkStitching, chkLamination];
  inputs.forEach(el => {
    if (el) {
      el.addEventListener('input', calculateQuote);
      el.addEventListener('change', calculateQuote);
    }
  });

  // Initial calculation
  calculateQuote();
});
