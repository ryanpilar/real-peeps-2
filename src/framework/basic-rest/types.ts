import { QueryKey } from "react-query";
import type { NextApiRequest } from "next";

/////////////////////////////////////////////////////////////////////////////////////
//------------SNIPCART------------
/////////////////////////////////////////////////////////////////////////////////////

declare global {
  interface Window {
    Snipcart: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      "address-fields": any;
      "snipcart-label": any;
      "snipcart-input": any;
    }
  }
}

export type SnipcartWebhookEvent =
  | "order.completed"
  | "order.status.changed"
  | "order.paymentStatus.changed"
  | "order.trackingNumber.changed"
  | "order.refund.created"
  | "order.notification.created"
  | "subscription.created"
  | "subscription.cancelled"
  | "subscription.paused"
  | "subscription.resumed"
  | "subscription.invoice.created"
  | "shippingrates.fetch"
  | "taxes.calculate"
  | "customauth:customer_updated";

export interface SnipcartWebhookContent {
  discounts: { [key: string]: any };
  items: { [key: string]: any };
  shippingAddress: {
    fullName: string;
    firstName?: string;
    name: string;
    company?: string;
    address1: string;
    address2?: string;
    fullAddress: string;
    city: string;
    country: string;
    postalCode: string;
    province: string;
    phone?: string;
  };
  shippingRateUserDefinedId?: string;
  [key: string]: any;
}

export type SnipcartShippingRate = {
  /** Shipping method's price. */
  cost: number;
  /** Name or description of the shipping method. */
  description: string;
  /** Estimated time for delivery in days. */
  guaranteedDaysToDelivery?: number;
  /** Internal ID of shipping method, can be useful when using shipping fulfillment solutions. */
  userDefinedId?: string;
};

export type SnipcartTaxItem = {
  name: string;
  amount: number;
  rate: number;
  numberForInvoice?: string;
  includedInPrice?: boolean;
  appliesOnShipping?: boolean;
};

export interface SnipcartRequest extends NextApiRequest {
  headers: {
    "x-snipcart-requesttoken"?: string;
  };
  body: {
    eventName: SnipcartWebhookEvent;
    mode: string;
    createdOn: string;
    content: SnipcartWebhookContent;
  };
}

/////////////////////////////////////////////////////////////////////////////////////
//------------PRINTFUL------------
/////////////////////////////////////////////////////////////////////////////////////

export interface ISyncProduct {
  id: string;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
}

export interface PrintfulProduct {
  id: string;
  name: string;
}

export type PrintfulProduct2 = {
  id: number | string;
  name: string;

  external_id?: string;
  synced?: number;
  thumnail_url?: string;
  variants?: PrinfulVariant[];

  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  variations?: object;
  [key: string]: unknown;
  isNewArrival?: boolean;
};

export type PrinfulVariant = {
  currency?: string;
  external_id?: string;
  files?: PrintfulFile[];
  id?: number;
  is_ignored?: boolean;
  main_category_id?: number;
  name?: string;
};

export type PrintfulFile = {
  id?: number;
  type?: string;
  hash?: string;
  filename?: string;
};

export type PrintfulShippingItem = {
  external_variant_id: string;
  quantity: number;
};

/////////////////////////////////////////////////////////////////////////////////////
//------------TYPES FROM THE TEMPLATE------------
/////////////////////////////////////////////////////////////////////////////////////

export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  variations?: object;
  [key: string]: unknown;
  isNewArrival?: boolean;
  printfulProducts?: PrintfulProduct[];
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};
