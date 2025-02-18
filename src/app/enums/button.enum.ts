export enum ButtonVariant {
  // Basic Variants
  Primary = 'btn-primary',
  Secondary = 'btn-secondary',
  Success = 'btn-success',
  Danger = 'btn-danger',
  Warning = 'btn-warning',
  Info = 'btn-info',
  Light = 'btn-light',
  Dark = 'btn-dark',

  // Outline Variants
  OutlinePrimary = 'btn-outline-primary',
  OutlineSecondary = 'btn-outline-secondary',
  OutlineSuccess = 'btn-outline-success',
  OutlineDanger = 'btn-outline-danger',
  OutlineWarning = 'btn-outline-warning',
  OutlineInfo = 'btn-outline-info',
  OutlineDark = 'btn-outline-dark',

  // Pill Variants
  PillSuccess = 'btn-success font-weight-bold btn-pill',
  PillPrimary = 'btn-primary font-weight-bold btn-pill',
  PillDanger = 'btn-danger font-weight-bold btn-pill',
  PillWarning = 'btn-warning font-weight-bold btn-pill',
  PillDark = 'btn-dark font-weight-bold btn-pill',

  // Square Variants
  SquareSuccess = 'btn-success font-weight-bold btn-square',
  SquarePrimary = 'btn-primary font-weight-bold btn-square',
  SquareDanger = 'btn-danger font-weight-bold btn-square',
  SquareWarning = 'btn-warning font-weight-bold btn-square',
  SquareDark = 'btn-dark font-weight-bold btn-square',

  // Light with Text and Hover
  LightTextSuccess = 'btn-light btn-text-success btn-hover-text-success font-weight-bold',
  LightTextPrimary = 'btn-light btn-text-primary btn-hover-text-primary font-weight-bold',
  LightTextDanger = 'btn-light btn-text-danger btn-hover-text-danger font-weight-bold',
  LightTextWarning = 'btn-light btn-text-warning btn-hover-text-dark-50 font-weight-bold',
  LightTextDark = 'btn-light btn-text-dark btn-hover-text-dark font-weight-bold',

  // Light Button Variants
  LightSuccess = 'btn-light-success font-weight-bold mr-2',
  LightPrimary = 'btn-light-primary font-weight-bold mr-2',
  LightDanger = 'btn-light-danger font-weight-bold mr-2',
  LightWarning = 'btn-light-warning font-weight-bold mr-2',
  LightDark = 'btn-light-dark font-weight-bold',

  // Text Buttons with Hover Background
  HoverBgSuccess = 'btn-hover-bg-success btn-text-success btn-hover-text-white border-0 font-weight-bold mr-2',
  HoverBgPrimary = 'btn-hover-bg-primary btn-text-primary btn-hover-text-white border-0 font-weight-bold mr-2',
  HoverBgDanger = 'btn-hover-bg-danger btn-text-danger btn-hover-text-white border-0 font-weight-bold mr-2',
  HoverBgWarning = 'btn-hover-bg-warning btn-text-warning btn-hover-text-white border-0 font-weight-bold mr-2',
  HoverBgDark = 'btn-hover-bg-dark btn-text-dark btn-hover-text-white border-0 font-weight-bold mr-2',

  // Transparent Variants
  TransparentSuccess = 'btn-transparent-success font-weight-bold mr-2',
  TransparentPrimary = 'btn-transparent-primary font-weight-bold mr-2',
  TransparentDanger = 'btn-transparent-danger font-weight-bold mr-2',
  TransparentWarning = 'btn-transparent-warning font-weight-bold mr-2',
  TransparentWhite = 'btn-transparent-white font-weight-bold',

  // Hover Transparent Variants
  HoverTransparentSuccess = 'btn-hover-transparent-success font-weight-bold mr-2',
  HoverTransparentPrimary = 'btn-hover-transparent-primary font-weight-bold mr-2',
  HoverTransparentDanger = 'btn-hover-transparent-danger font-weight-bold mr-2',
  HoverTransparentWarning = 'btn-hover-transparent-warning font-weight-bold mr-2',
  HoverTransparentWhite = 'btn-hover-transparent-white font-weight-bold',

  // Link Variants
  LinkSuccess = 'btn-link-success font-weight-bold',
  LinkPrimary = 'btn-link-primary font-weight-bold',
  LinkDanger = 'btn-link-danger font-weight-bold',
  LinkWarning = 'btn-link-warning font-weight-bold',
  LinkDark = 'btn-link-dark font-weight-bold',

  // Shadow Variants
  ShadowLight = 'btn-light btn-shadow font-weight-bold mr-2',
  ShadowSuccess = 'btn-success btn-shadow font-weight-bold mr-2',
  ShadowPrimary = 'btn-primary btn-shadow font-weight-bold mr-2',
  ShadowDanger = 'btn-danger btn-shadow font-weight-bold mr-2',
  ShadowWarning = 'btn-warning btn-shadow font-weight-bold mr-2',
}


export enum ButtonType {
  default = 'button',
  submit = 'submit',
  reset = 'reset',
  icon = 'icon-button',
  fab = 'fab-button',
}

export enum ButtonSize {
  Small = 'btn-sm',
  Large = 'btn-lg',
  Default = ''
}


