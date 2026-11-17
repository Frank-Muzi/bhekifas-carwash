# Bhekifas Mobile Car Wash

A simple responsive React + Vite landing page for Bhekifas Mobile Car Wash.

## Features
- Car-and-water-splash hero background (no people)
- Mobile-friendly layout
- Quote and booking form
- Sends booking details to the owner's WhatsApp number: 082 439 8434

## Run locally
1. Install Node.js.
2. Open this folder in VS Code.
3. Open the terminal and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown in the terminal.

## WhatsApp booking
When a customer submits the form, WhatsApp opens with the booking details pre-filled. The customer must tap **Send** to deliver the message to the owner.

The WhatsApp destination is configured in `src/App.jsx` as `27824398434`.
