// Augment the palette to include an ochre color
export declare module '@mui/material/styles' {
  interface Palette {
    mito: Palette['primary']
    helesta: Palette['primary']
  }

  interface PaletteOptions {
    mito?: PaletteOptions['primary']
    helesta?: PaletteOptions['primary']
  }
}

// Update the Button's color options to include an ochre option
export declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    mito: true
    helesta: true
  }
}
