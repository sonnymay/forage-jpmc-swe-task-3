import { ServerRespond } from './DataStreamer';

export interface Row {
  stock: string,
  top_ask_price: number,
  timestamp: Date,
  ratio: number, // Add ratio field
  upper_bound: number, // Add upper_bound field
  lower_bound: number, // Add lower_bound field
  trigger_alert?: string, // Add trigger_alert field
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    // Calculate ratio, upper_bound, lower_bound, and trigger_alert
    return serverResponds.map((el: any) => {
      const price_abc = el.stock === 'ABC' ? el.top_ask && el.top_ask.price || 0 : 1;
      const price_def = el.stock === 'DEF' ? el.top_ask && el.top_ask.price || 0 : 1;
      const ratio = price_abc / price_def;
      const upper_bound = 1.1; // Adjust as needed
      const lower_bound = 0.99; // Adjust as needed
      let trigger_alert;

      if (ratio > upper_bound) {
        trigger_alert = 'upper_bound_crossed';
      } else if (ratio < lower_bound) {
        trigger_alert = 'lower_bound_crossed';
      }

      return {
        stock: el.stock,
        top_ask_price: el.top_ask && el.top_ask.price || 0,
        timestamp: el.timestamp,
        ratio,
        upper_bound,
        lower_bound,
        trigger_alert,
      };
    });
  }
}
