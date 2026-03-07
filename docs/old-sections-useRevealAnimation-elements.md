# useRevealAnimation elements (old_sections reference)

This document lists the `elements` config of `useRevealAnimation` for each Vue component under `src/old_sections/`, with file and line reference. No property or comment has been removed.

---

## AssociationSection

@src/old_sections/AssociationSection.vue (16-20)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: question, direction: 'down', delay: 0 },
  { el: player, direction: 'down', delay: 0.1 },
]
```

---

## CaminoSection

@src/old_sections/CaminoSection.vue (12-16)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
]
```

---

## CapsuleSonoreSection

@src/old_sections/CapsuleSonoreSection.vue (19-22)

```js
[
  { el: imageBlock, direction: 'up', delay: 0, scale: 3, duration: 4, transformOrigin: 'bottom center' },
  { el: playerBlock, direction: 'down', delay: 0.1 },
]
```

---

## CommentEstNeRecitSection

@src/old_sections/CommentEstNeRecitSection.vue (15-19)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: author, direction: 'left', delay: 0 },
  { el: content, direction: 'right', delay: 0.12 },
]
```

---

## ConcentreGaliceSection

@src/old_sections/ConcentreGaliceSection.vue (14-18)

```js
[
  { el: leftCol, direction: 'left', delay: 0 },
  { el: rightCol, direction: 'right', delay: 0.1, rotation: 12 },
  { el: question, direction: 'down', delay: 0.2 },
]
```

---

## CoupDeCoeurSection

@src/old_sections/CoupDeCoeurSection.vue (17-21)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: player, direction: 'down', delay: 0.08 },
]
```

---

## DeconnexionSection

@src/old_sections/DeconnexionSection.vue (14-19)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: content, direction: 'left', delay: 0.1 },
  { el: question, direction: 'down', delay: 0.2 },
]
```

---

## ElementsJacquaireSection

@src/old_sections/ElementsJacquaireSection.vue (15-25)

```js
[
  // { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  {
    el: image, direction: 'left', delay: 0, steps: [
      { to: { scale: 2 }, duration: 0, opacity: 0 },
      { to: { scale: 1 }, duration: 2, opacity: 1 }
    ]
  },
  // { el: contentBlock, direction: 'left', delay: 0.5 },
  { el: title, direction: 'left', delay: 0.7 },
]
```

---

## EnBrefSection

@src/old_sections/EnBrefSection.vue (26-31)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: statsRow, direction: 'right', delay: 0.1 },
  { el: linkWrap, direction: 'left', delay: 0.2 },
]
```

---

## EtapesClesSection

@src/old_sections/EtapesClesSection.vue (14-18)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: image, direction: 'down', delay: 0.08, scale: 0.7 },
]
```

---

## ExperienceDestineeSection

@src/old_sections/ExperienceDestineeSection.vue (22-33)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: illustration, direction: 'right', delay: 0 },
  { el: content, direction: 'left', delay: 0.1 },
  { el: question1, direction: 'left', delay: 0.2 },
  { el: answer1Intro, direction: 'left', delay: 0.2 },
  { el: question1b, direction: 'right', delay: 0.2 },
  { el: answer1b, direction: 'right', delay: 0.2 },
  { el: answer1, direction: 'left', delay: 0.2 },
  { el: question2, direction: 'left', delay: 0.2 },
  { el: answer2, direction: 'left', delay: 0.2 },
]
```

---

## FlechageSection

@src/old_sections/FlechageSection.vue (14-19)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: content, direction: 'right', delay: 0.1 },
  { el: question, direction: 'down', delay: 0.2 },
]
```

---

## HeroIllustration

@src/old_sections/HeroIllustration.vue (34-40)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: heroTitle, direction: 'down', delay: 0.1 },
  { el: heroSubtitle, direction: 'down', delay: 0.2 },
  { el: creditsLeft, direction: 'left', delay: 0.35, offset: 80 },
  { el: creditsRight, direction: 'right', delay: 0.35, offset: 80 },
]
```

---

## JoyauSection

@src/old_sections/JoyauSection.vue (30-36)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: caption, direction: 'right', delay: 0 },
  { el: cell1, direction: 'left', delay: 0.06, rotation: -12 },
  { el: cell2, direction: 'down', delay: 0.12 },
  { el: cell3, direction: 'right', delay: 0.18, rotation: 12 },
]
```

---

## MapIllustration

@src/old_sections/MapIllustration.vue (53-58)

```js
[
  { el: title, direction: 'left', delay: 0.1 },
  // { el: mapWrap, direction: 'up', delay: 0.1, scale: 3, duration: 4, transformOrigin: 'bottom center' },
  { el: stepsImage, direction: 'right', delay: 0.18, rotation: 12 },
  { el: question, direction: 'down', delay: 0.26 },
]
```

---

## OrixeInterviewSection

@src/old_sections/OrixeInterviewSection.vue (14-19)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: block1, direction: 'left', delay: 0 },
  { el: block2, direction: 'right', delay: 0.1 },
  { el: block3, direction: 'left', delay: 0.2 },
]
```

---

## ParcoursPraticableSection

@src/old_sections/ParcoursPraticableSection.vue (18-24)

```js
[
  // { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  // { el: firstBlock, direction: 'left', delay: 0 },
  { el: leftCol, direction: 'left', delay: 0.1 },
  { el: rightCol, direction: 'right', delay: 0.1, rotation: 15, transformOrigin: 'left bottom' },
  { el: question, direction: 'down', delay: 0.2 },
]
```

---

## PilgrimsStatsSection

@src/old_sections/PilgrimsStatsSection.vue (15-17)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
]
```

---

## ReconnaissanceFootnoteSection

@src/old_sections/ReconnaissanceFootnoteSection.vue (16-20)

```js
[
  // { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: image, direction: 'right', delay: 0, rotation: 12 },
  // { el: content, direction: 'left', delay: 0.1 },
]
```

---

## ReconnaissanceSection

@src/old_sections/ReconnaissanceSection.vue (12-16)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: leftCol, direction: 'left', delay: 0 },
]
```

---

## ReconstitutionTracSection

@src/old_sections/ReconstitutionTracSection.vue (21-27)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: imageBlock, direction: 'up', delay: 0, scale: 4, duration: 4, transformOrigin: 'bottom center' },
  { el: image, direction: 'down', delay: 0.1, scale: 3, duration: 4, transformOrigin: 'top center' },
  { el: title, direction: 'left', delay: 0.1 },
  { el: question, direction: 'down', delay: 0.2 },
]
```

---

## RessentirLieuxClosingSection

@src/old_sections/RessentirLieuxClosingSection.vue (11-14)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
]
```

---

## RessentirLieuxSection

@src/old_sections/RessentirLieuxSection.vue (21-30)

```js
[
  { el: imageBlock, delay: 0, steps: [
    { to: { scale: 1.5 }, duration: 0, opacity: 0, transformOrigin: 'center top' },
    { to: { scale: 1 }, duration: 4, opacity: 1 }
  ], transformOrigin: 'center top' },
  { el: image, direction: 'down', scale: 3, transformOrigin: 'center top' },
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: titleBlock, direction: 'down', delay: 1 },
  { el: title, direction: 'left', delay: 1.1 },
  { el: question, direction: 'down', delay: 1.1 },
]
```

---

## SantiagoJourneyPhotoGrid

@src/old_sections/SantiagoJourneyPhotoGrid.vue (32-39)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: photoGrid, direction: 'down', delay: 0, scale: 0.5, rotation: 12 },
  { el: cellLeft, direction: 'left', delay: 0.06 },
  { el: cellRightTop, direction: 'right', delay: 0.12 },
  { el: cellRightBottom, direction: 'right', delay: 0.18 },
  { el: caption, direction: 'left', delay: 0.24 },
]
```

---

## SantiagoJourneySection

@src/old_sections/SantiagoJourneySection.vue (16-19)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: player, direction: 'down', delay: 0 },
]
```

---

## SantiagoStepsSection

@src/old_sections/SantiagoStepsSection.vue (16-21)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: image, direction: 'right', delay: 0.08, rotation: 12 },
  { el: question, direction: 'down', delay: 0.16 },
]
```

---

## SignalisationSection

@src/old_sections/SignalisationSection.vue (27-31)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: cell1, direction: 'left', delay: 0, rotation: -12, transformOrigin: 'left bottom' },
  { el: cell2, direction: 'right', delay: 0.08, rotation: 12, transformOrigin: 'right bottom' },
]
```

---

## SlowTourismeSection

@src/old_sections/SlowTourismeSection.vue (18-24)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: question, direction: 'left', delay: 0.1 },
  { el: answer, direction: 'left', delay: 0.1 },
  { el: illustration, direction: 'left', delay: 0.2 },
]
```

---

## TraceRouteSection

@src/old_sections/TraceRouteSection.vue (17-21)

```js
[
  { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
  { el: title, direction: 'left', delay: 0 },
  { el: player, direction: 'down', delay: 0.08 },
]
```

---

## FifthTestimonial

@src/old_sections/testimonials/FifthTestimonial.vue (14-14)

```js
[{ el: blockquoteInner, direction: 'down', delay: 0.5 }]
```

---

## FirstTestimonial

@src/old_sections/testimonials/FirstTestimonial.vue (14-14)

```js
[{ el: blockquoteInner, direction: 'down', delay: 0.5 }]
```

---

## FourthTestimonial

@src/old_sections/testimonials/FourthTestimonial.vue (17-21)

```js
[
  { el: blockquoteInner, direction: 'down', delay: 0.5 },
  { el: imageRef, direction: 'left', delay: 1.1 },
]
```

---

## SecondTestimonial

@src/old_sections/testimonials/SecondTestimonial.vue (16-20)

```js
[
  { el: blockquoteInner, direction: 'down', delay: 0.5 },
  { el: imageRef, direction: 'right', delay: 1.1 },
]
```

---

## ThirdTestimonial

@src/old_sections/testimonials/ThirdTestimonial.vue (14-14)

```js
[{ el: blockquoteInner, direction: 'down', delay: 0.5 }]
```
