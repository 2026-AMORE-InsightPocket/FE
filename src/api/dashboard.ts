// src/api/dashboard.ts
import { API_BASE_URL } from "../config/api";

export interface BestSellerItemRaw {
  rank: number;
  product_id: number;
  image_url: string;
  product_name: string;
  last_month_sales: number;
  rating: number;
  review_count: number;
  prev_month_rank: number;
  rank_change: number;
}

export interface BestSellerTop5ApiResponse {
  month: string;
  snapshot_time: string;
  items: BestSellerItemRaw[];
}

export interface BestSellerTop5Row {
  rank: number;
  name: string;
  sales: number;
  rating: number;
  reviews: number;
}

export async function fetchTop5Bestsellers(month: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/dashboard/bestsellers/top5?month=${month}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch top5 bestsellers");
  }

  return res.json();
}
