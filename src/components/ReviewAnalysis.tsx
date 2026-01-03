import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Minus,
  TrendingUp,
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AddToCartButton } from "./AddToCartButton";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { InsightItem } from "../App";
import "../styles/ReviewAnalysis.css";

const laneigeProducts = [
  {
    name: "Water Sleeping Mask",
    avgRating: 4.7,
    totalReviews: 120,
  },
];

const productReviewData: Record<string, any> = {
  "Water Sleeping Mask": {
    keywords: [
      {
        keyword: "보습 (Hydration)",
        mentions: 120,
        sentiment: "positive",
        score: 85,
        aiInsight: "수면 중 보습 지속력에 대한 긍정적 반응이 다수 확인됨.",
      },
    ],
    sentiment: [
      { name: "긍정", value: 70, color: "#6691ff" },
      { name: "중립", value: 20, color: "#ebf3fd" },
      { name: "부정", value: 10, color: "#ffebeb" },
    ],
    customerSay: "밤새 촉촉함이 유지되어 아침 피부 컨디션이 좋아졌어요.",
    ratingDist: [
      { rating: 5, count: 70, percentage: 70 },
      { rating: 4, count: 20, percentage: 20 },
      { rating: 3, count: 7, percentage: 7 },
      { rating: 2, count: 2, percentage: 2 },
      { rating: 1, count: 1, percentage: 1 },
    ],
  },
};

const sentimentDummy = {
  positive: 68,
  negative: 32,
};

const reputationDummy = {
  score: 94, // 평판 지수
  rating: 4.7, // 평균 별점
  totalReviews: 3245,
};

const sentimentChartData = [
  { name: "긍정", value: sentimentDummy.positive, color: "#6B86FF" },
  { name: "부정", value: sentimentDummy.negative, color: "#E5E7EB" },
];

export function ReviewAnalysis({
  addToCart,
  removeByUniqueKey,
  isInCart,
}: {
  addToCart: (item: Omit<InsightItem, "id" | "timestamp">) => void;
  removeByUniqueKey: (uniqueKey: string) => void;
  isInCart: (uniqueKey: string) => boolean;
}) {
  const [selectedProduct, setSelectedProduct] = useState("Water Sleeping Mask");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  // 더미데이터
  const currentData = productReviewData[selectedProduct];
  const totalReviews =
    currentData?.ratingDist?.reduce(
      (sum: number, r: any) => sum + (r.count ?? 0),
      0
    ) ?? 0;
  const averageRating = 3.5;
  const avgRatingNumber = Number(averageRating) || 3.5;

  const handleScroll = (direction: "left" | "right") => {
    const el = document.getElementById("review-product-scroll");
    if (!el) return;

    const offset = direction === "left" ? -300 : 300;
    const next = scrollPosition + offset;
    el.scrollTo({ left: next, behavior: "smooth" });
    setScrollPosition(next);
  };

  return (
    <section className="review">
      {/* Product Selector */}
      <section className="review-selector">
        <div className="review-selector__top">
          <span className="review-selector__label">분석할 제품 선택</span>

          <div className="review-selector__search">
            <Search size={16} />
            <input
              placeholder="제품명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="review-selector__carousel">
          <button
            className="carousel__btn left"
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft />
          </button>

          <div id="review-product-scroll" className="carousel__list">
            {laneigeProducts
              .filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <button
                  key={product.name}
                  className={`review-product-card ${
                    selectedProduct === product.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedProduct(product.name)}
                >
                  <div className="product-card__image">
                    <ImageWithFallback
                      src={`https://via.placeholder.com/200?text=${product.name}`}
                      alt={product.name}
                    />
                  </div>

                  <p className="product-card__name">{product.name}</p>
                  <p className="product-card__rating">
                    ⭐ {product.avgRating} (
                    {product.totalReviews.toLocaleString()})
                  </p>
                </button>
              ))}
          </div>

          <button
            className="carousel__btn right"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Customers Say */}
      <section className="customers-say">
        <div className="customers-say__header">
          <div className="customers-say__title">
            <span className="customers-say__label">Customers Say</span>
            <span className="customers-say__count">
              전체 {totalReviews.toLocaleString()}개 리뷰 분석
            </span>
          </div>

          <div className="customers-say__rating">
            <span className="customers-say__positive">
              긍정 반응 <strong>{currentData.sentiment[0].value}%</strong>
            </span>

            <div className="customers-say__stars">
              {"★★★★★".split("").map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(averageRating) ? "star active" : "star"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="customers-say__quote">“{currentData.customerSay}”</div>
      </section>

      {/* 감정 분석 분포, 평판 지수 */}
      <div className="review-card sentiment-card">
        <div className="card-header">
          <h3>감정 분석 분포</h3>

          <div className="card-actions">
            <span className="badge">보고서에 담기</span>
            <button className="plus-btn">+</button>
          </div>
        </div>

        <div className="sentiment-badge">
          긍정 반응 <strong>{sentimentDummy.positive}%</strong>
        </div>

        <div className="donut-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={sentimentChartData}
                dataKey="value"
                innerRadius={90}
                outerRadius={115}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {sentimentChartData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="review-card reputation-card">
        <div className="card-header">
          <h3>평판 지수</h3>

          <div className="card-actions">
            <span className="badge">보고서에 담기</span>
            <button className="plus-btn">+</button>
          </div>
        </div>

        <div className="donut-wrapper">
          <svg className="reputation-donut" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#E5E7EB"
              strokeWidth="18"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#6B86FF"
              strokeWidth="18"
              fill="none"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={
                2 * Math.PI * 80 * (1 - reputationDummy.score / 100)
              }
              strokeLinecap="round"
            />
          </svg>

          <div className="reputation-center">
            <span className="reputation-score">{reputationDummy.score}</span>
            <span className="reputation-label">신뢰도 점수</span>
          </div>
        </div>

        <div className="reputation-footer">
          <div className="stars">
            {"★★★★★".split("").map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(reputationDummy.rating)
                    ? "star active"
                    : "star"
                }
              >
                ★
              </span>
            ))}
            <span className="rating-text">{reputationDummy.rating}</span>
          </div>

          <div className="review-count">
            {reputationDummy.totalReviews.toLocaleString()}개 리뷰
          </div>
        </div>
      </div>

      {/* Keyword Insight */}
      <section className="review-keywords">
        <header className="review-keywords__header">
          <h2>AI 키워드 분석 및 비즈니스 인사이트</h2>
        </header>

        <ul className="review-keywords__list">
          {currentData.keywords.map((k: any, idx: number) => {
            const Icon =
              k.sentiment === "positive"
                ? ThumbsUp
                : k.sentiment === "negative"
                ? ThumbsDown
                : Minus;

            return (
              <li key={idx} className={`keyword keyword--${k.sentiment}`}>
                <div className="keyword__head">
                  <Icon />
                  <div>
                    <strong>{k.keyword}</strong>
                    <span>{k.mentions.toLocaleString()}회 언급</span>
                  </div>
                </div>
                <p className="keyword__insight">{k.aiInsight}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
