# SemaKare Drupal 11 Theme - Developer Handoff Guide

Hello! This folder contains a custom, fully-configured Drupal 11 Base Theme (`semakare_theme`) built from Figma designs using Tailwind CSS. It is component-driven and extracts complex front-end logic into modular Twig templates ready for Drupal 11 site-building.

## What is Included
1. **Interactive Calculators**: Fully functional JavaScript engines for WHR (Waist-to-Hip Ratio) and BMI (Body Mass Index) calculators are hooked directly into `libraries.yml` and only load on their respective templates.
2. **Component Modularity**: Huge HTML pages have been modularized in `templates/components/` (global header/footer) and `templates/paragraphs/` (modular landing page slices).
3. **Tailwind Framework**: The exact styling definitions are localized in `css/styles.css` and `js/tailwind-config.js`. You do not need node/npm to run this locally; it uses a stable CDN configuration specifically injected for this environment.

---

## Installation & Setup Instructions

### 1. Install the Theme
Drop the `semakare_theme` folder directly into your Drupal installation's `/web/themes/custom/` directory.
Go to `Appearance`, locate **SemaKare Custom Theme**, and click **Install and set as default**.

### 2. Configure the Backend (Paragraphs Module)
This theme anticipates that your site administrators will build pages using the **[Paragraphs Module](https://www.drupal.org/project/paragraphs)**. We have provided `paragraph--[type].html.twig` templates.

You must build the corresponding Paragraph Types in the Drupal Admin UI (`Structure > Paragraph types`) using exact machine names to bridge the data:

#### A. Hero Section Container
* **Machine Name of Paragraph Type**: `hero`
* **Add Fields With These Exact Machine Names**:
  - `field_badge` (Text/String)
  - `field_headline` (Text/String)
  - `field_subtext` (Formatted Text/Long)
  - `field_primary_button` (Link/Text)
  - `field_secondary_button` (Link/Text)
  - `field_image` (Media/Image)

#### B. Value Prop Container
* **Machine Name of Paragraph Type**: `value_prop`
* **Add Fields With These Exact Machine Names**:
  - `field_headline` (Text/String)
  - `field_body` (Formatted Text/Long)
  - `field_benefits` (Entity Reference/List - to hold individual bullet points if desired)

#### C. FAQ Container
* **Machine Name of Paragraph Type**: `faq`
* **Add Fields With These Exact Machine Names**:
  - `field_headline` (Text/String)
  - `field_faq_items` (Entity Reference Revisions linking to a dedicated 'FAQ Item' paragraph type)

### 3. Rendering The Page
When creating a Landing Page (Node), simply add an Entity Reference Revisions field for paragraphs (e.g., `field_sections`).
Because of the `page--front.html.twig` wrapper logic we have provided, simply rendering your paragraphs inside the main content region will automatically snap everything into the complex Tailwind Grid layout perfectly.

Good luck!
