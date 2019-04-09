import Vue from 'vue'

/** ElementUI component common definition */
export declare class YlementUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type YlementUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type YlementUIHorizontalAlignment = 'left' | 'center' | 'right'
