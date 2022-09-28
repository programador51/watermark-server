export type Payment = 'Donation' | 'Subscription' | 'Commission' | 'Shop Order';

export interface ShopItemI {
  /**
   * URL of the shop item in order to visit it on kofi. For instance: https://ko-fi.com/s/1f5eca9b6d
   * direct_link_code is: 1f5eca9b6d
   */
  direct_link_code: string;
}

export interface Kofi {
  message_id: string;
  timestamp: string;
  type: Payment;
  is_public: boolean;
  from_name: string;
  message: string;
  amount: string;
  url: string;
  email: string;
  currency: string;
  is_subscription_payment: boolean;
  is_first_subscription_payment: boolean;
  kofi_transaction_id: string;
  verification_token: string;
  /**
   * It's an array because user can buy multiple items of this shop cart
   */
  shop_items: null | ShopItemI[];
  tier_name: null | string;
}
