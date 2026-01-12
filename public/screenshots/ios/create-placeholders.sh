#!/bin/bash

# Remaining iOS placeholders
declare -A placeholders=(
  ["step3-2-account-verification.svg"]="📧|Hesap Doğrulama"
  ["step3-3-otp-entry.svg"]="🔢|OTP Girişi"
  ["step3-4-set-password.svg"]="🔐|Şifre Belirleme"
  ["step4-device-pairing.svg"]="📲|Cihaz Eşleştirme"
  ["step4-add-device.svg"]="➕|Cihaz Ekle"
  ["step4-connected-devices.svg"]="✅|Bağlı Cihazlar"
)

for file in "${!placeholders[@]}"; do
  IFS='|' read -r icon title <<< "${placeholders[$file]}"
  
  cat > "$file" << EOL
<svg width="750" height="1334" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${file}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF501D;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#FFD700;stop-opacity:0.1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="750" height="1334" fill="url(#grad-${file})"/>

  <!-- Border -->
  <rect x="40" y="100" width="670" height="1134" fill="none" stroke="#E5E7EB" stroke-width="2" rx="20"/>

  <!-- Icon -->
  <circle cx="375" cy="500" r="80" fill="#FF501D" opacity="0.15"/>
  <text x="375" y="530" font-family="Arial, sans-serif" font-size="64" fill="#FF501D" text-anchor="middle">${icon}</text>

  <!-- Title -->
  <text x="375" y="650" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#1F2937" text-anchor="middle">${title}</text>

  <!-- Subtitle -->
  <text x="375" y="720" font-family="Arial, sans-serif" font-size="18" fill="#6B7280" text-anchor="middle">Screenshot yakında eklenecek</text>

  <!-- Passgage branding -->
  <text x="375" y="1200" font-family="Arial, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">Passgage iOS Guide</text>
</svg>
EOL
done

echo "✅ Created ${#placeholders[@]} placeholder images"
ls -lh *.svg
