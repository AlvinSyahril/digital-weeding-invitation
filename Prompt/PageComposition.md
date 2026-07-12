# Task

Before implementing any additional sections, create a complete architectural document named:

docs/PageComposition.md

Do NOT write any React components yet.

Your responsibility is to become a Software Architect and design the complete page composition of the Wedding Invitation Template.

This document will become the single source of truth before implementation begins.

---

# Goal

Design the entire wedding invitation page as a sequence of reusable sections.

Every section must have:

- a clear responsibility
- visual purpose
- UX purpose
- dependencies
- reusable UI Foundation components
- animation strategy
- estimated visual height
- responsive considerations
- accessibility considerations

This document should guide future implementation.

---

# Existing Foundation

Already implemented:

✔ Hero

✔ Design Tokens

✔ Theme System

✔ UI Foundation

- SectionContainer
- SectionHeader
- Button
- Card
- Divider
- Ornament
- MotionFade

Do not redesign these.

Instead, reuse them.

---

# Required Output

Create:

docs/PageComposition.md

---

# Required Sections

Design the page using the following order.

1.

Opening Overlay

Purpose

Guest personalization

Open Invitation button

Background music initialization

Transition to Hero

---

2.

Hero

Already implemented.

Describe how Hero connects with the rest of the page.

---

3.

Quote

Purpose

Religious quote

Wedding quote

Simple elegant typography

Minimal decoration

---

4.

Couple

Purpose

Introduce Bride

Introduce Groom

Parents

Optional Instagram

Photo

Relationship layout

---

5.

Countdown

Purpose

Countdown timer

Save The Date

Calendar CTA

---

6.

Event

Purpose

Akad

Reception

Date

Time

Location

Google Maps

Buttons

---

7.

Love Story

Purpose

Timeline

Relationship milestones

Elegant vertical layout

---

8.

Gallery

Purpose

Photo grid

Lightbox

Lazy loading

Responsive layout

---

9.

Wedding Gift

Purpose

Bank account

QRIS

Copy account button

Gift confirmation

---

10.

RSVP

Purpose

Attendance

Guest confirmation

Number of guests

Special message

---

11.

Wedding Wishes

Purpose

Guest wishes

Pagination or infinite loading

Future API ready

---

12.

Footer

Purpose

Thank you

Closing quote

Credits

Music controller

---

# For Every Section

Use the following template.

## Section Name

### Purpose

Why this section exists.

### UX Goal

What should the visitor feel or accomplish.

### Layout

Describe structure.

### Uses UI Foundation

Example

- SectionContainer
- SectionHeader
- Card
- Button
- Divider
- MotionFade

### Animation

Describe animation sequence.

### Dependencies

List

- Theme
- Models
- UI Components
- Motion
- Assets

### Responsive Notes

Explain mobile-first behavior.

### Accessibility

Explain accessibility concerns.

### Future Extensions

Possible future improvements.

---

# At The End

Generate a dependency matrix.

Example

| Section | Uses Card | Uses Button | Uses Motion | Uses Ornament |

This helps identify reusable patterns.

---

# Generate Another Matrix

Visual Rhythm

Example

| Section | Density | Background | Divider | Estimated Height |

This helps balance the scrolling experience.

---

# Finally

Review the entire composition.

Answer:

1.

Are there duplicated patterns?

2.

Should any repeated layout become another UI component?

3.

Which sections share the same architecture?

4.

Can any section become configurable?

5.

What components are still missing from UI Foundation?

---

# Important Rules

Do NOT implement code.

Do NOT generate JSX.

Do NOT generate CSS.

Think only as a Software Architect.

The output must become the architectural blueprint for all future sections.

Prioritize:

- Maintainability
- Scalability
- Reusability
- Commercial readiness
- Elegant UX
- Mobile-first
- Theme independence