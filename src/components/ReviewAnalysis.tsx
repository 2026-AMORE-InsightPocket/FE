import { useState } from "react";
import "../styles/ReviewAnalysis.css";
import { AddToCartButton } from "./AddToCartButton";
import { Search, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, BadgeAlert } from "lucide-react";

interface ReviewAnalysisProps {
  addToCart: (item: any) => void;
  removeByUniqueKey: (uniqueKey: string) => void;
  isInCart: (uniqueKey: string) => boolean;
}

interface Product {
  id: number;
  name: string;
  image: string;
}

interface Insight {
  id: string;
  title: string;
  mentions: number;
  score: number;
  type: "positive" | "negative" | "neutral";
  aiAnalysis: string;
}

export function ReviewAnalysis({
  addToCart,
  removeByUniqueKey,
  isInCart,
}: ReviewAnalysisProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const products: Product[] = [
    { id: 12, name: "Water Sleeping Mask", image: "" },
    { id: 23, name: "Cream Skin Refiner", image: "" },
    { id: 8, name: "Lip Sleeping Mask", image: "" },
    { id: 5, name: "Water Bank Moisture Cream", image: "" },
    { id: 45, name: "Neo Cushion", image: "" },
    { id: 87, name: "Glowy Makeup Serum", image: "" },
  ];

  const sentimentData = {
    positive: 68,
    negative: 32,
  };

  const ratingDistribution = [
    { stars: 5, percentage: 66 },
    { stars: 4, percentage: 21 },
    { stars: 3, percentage: 12 },
    { stars: 2, percentage: 7 },
    { stars: 1, percentage: 2 },
  ];

  const insights: Insight[] = [
    {
      id: "1",
      title: "보습 (Hydration)",
      mentions: 2094,
      score: 85,
      type: "positive",
      aiAnalysis:
        '2,094명의 고객이 언급하며 80% 이상의 양성 피드백을 보임. 특히 "밤 사이 일어나는 극강의 촉촉함"이 핵심 구매 결정 요인으로 분석됨.',
    },
    {
      id: "2",
      title: "흡수력 (Absorption)",
      mentions: 1842,
      score: 78,
      type: "positive",
      aiAnalysis:
        '빠른 흡수력과 가벼운 텍스처가 주요 긍정 요인. "끈적임 없이 촉촉하다"는 평가가 지배적.',
    },
    {
      id: "3",
      title: "사용 편의성",
      mentions: 1289,
      score: 42,
      type: "negative",
      aiAnalysis:
        '스패출러 사용의 번거로움과 제형의 끈적임이 부정 평가의 주원인. 낮 시간대보다는 "나이트 케어 전용" 메시지를 강화하여 끈적임에 대한 거부감을 상쇄시킬 것을 제안.',
    },
    {
      id: "4",
      title: "용량 (Quantity)",
      mentions: 987,
      score: 58,
      type: "neutral",
      aiAnalysis:
        "용량 대비 가격에 대한 양가적 반응. 더 큰 사이즈 옵션 출시 고려 필요.",
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "positive":
        return "#13C85E";
      case "negative":
        return "#FF2F36";
      case "neutral":
        return "#FFA82F";
      default:
        return "#13C85E";
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "positive":
        return "#CCFFE1";
      case "negative":
        return "#FFCBCD";
      case "neutral":
        return "#FFE8C8";
      default:
        return "#CCFFE1";
    }
  };

  return (
    <div className="review-analysis">
      <main className="review-analysis__main">
        {/* 1. 분석할 제품 선택 섹션 */}
        <section className="product-selection">
          <div className="product-selection__header">
            <h2 className="product-selection__title">분석할 제품 선택</h2>
            <div className="product-selection__actions">
              <AddToCartButton
                onAdd={() =>
                  addToCart({
                    type: "product-selection",
                    title: "분석할 제품 선택",
                    data: products,
                    page: "review",
                    uniqueKey: "review-product-selection",
                  })
                }
                onRemove={() => removeByUniqueKey("review-product-selection")}
                isInCart={isInCart("review-product-selection")}
              />
            </div>
          </div>

          <div className="product-selection__search">
            <svg
              className="search-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="#999" strokeWidth="1.5" />
              <path
                d="M20 20L17 17"
                stroke="#999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="제품명 검색"
              className="product-selection__search-input"
            />
          </div>

          <div className="product-carousel">
            <button className="scroll-btn scroll-btn--left">
              <ChevronLeft />
            </button>
            <div className="product-carousel__items">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-card__badge">#{product.id}</div>
                  <div className="product-card__image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <p className="product-card__name">{product.name}</p>
                </div>
              ))}
            </div>
            <button className="scroll-btn scroll-btn--right">
              <ChevronRight />
            </button>
          </div>
        </section>

        {/* 2. 고객들이 말합니다 섹션 */}
        <div className="customer-feedback">
          <div className="section-header-row">
            <h3 className="customer-feedback__title">
              <span className="highlight">고객들이 말합니다</span>
              <span className="count">전체 3,245개 리뷰 분석</span>
            </h3>
            <AddToCartButton
              onAdd={() =>
                addToCart({
                  type: "feedback-summary",
                  title: "고객들이 말합니다 (리뷰 요약)",
                  data: { count: 3245, rating: 68 },
                  page: "review",
                  uniqueKey: "review-customer-feedback",
                })
              }
              onRemove={() => removeByUniqueKey("review-customer-feedback")}
              isInCart={isInCart("review-customer-feedback")}
            />
          </div>
          <div className="customer-feedback__rating">
            <span className="rating-label">긍정 반응</span>
            <span className="rating-value">68%</span>
            <div className="rating-stars">
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
              <span className="star star--half">★</span>
            </div>
          </div>
          <blockquote className="customer-feedback__quote">
            "밤새 촉촉함이 지속되는 마법 같은 제품! 아침에 일어나면 피부가 맑게
            빛나요~!"
          </blockquote>
        </div>

        <div className="sentiment-analysis">
          <div className="sentiment-grid">
            {/* 3. 감정 분석 분포 섹션 */}
            <div className="sentiment-card">
              <div className="card-header">
                <h3 className="card-title">감정 분석 분포</h3>
                <div className="card-header__actions">
                  <AddToCartButton
                    onAdd={() =>
                      addToCart({
                        type: "chart",
                        title: "감정 분석 분포",
                        data: sentimentData,
                        page: "review",
                        uniqueKey: "review-sentiment-distribution",
                      })
                    }
                    onRemove={() =>
                      removeByUniqueKey("review-sentiment-distribution")
                    }
                    isInCart={isInCart("review-sentiment-distribution")}
                  />
                </div>
              </div>
              <div className="sentiment-chart">
                <div className="chart-container">
                  <svg className="donut-chart" viewBox="0 0 200 200">
                    {/* 배경 원*/}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="28"
                    />

                    {/* Positive 세그먼트 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#6691FF"
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(sentimentData.positive / 100) * 502 - 30} 502`}
                      strokeDashoffset="-20"
                      transform="rotate(-90 100 100)"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredSegment("positive")}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />

                    {/* Negative 세그먼트 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#D6E2FF"
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(sentimentData.negative / 100) * 502 - 30} 502`}
                      strokeDashoffset={`-${(sentimentData.positive / 100) * 502 + 20}`}
                      transform="rotate(-90 100 100)"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredSegment("negative")}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                  </svg>
                  {/* 마우스 호버 시 나타나는 플로팅 툴팁 (CSS로 제어) */}
                  {hoveredSegment && (
                    <div className={`chart-tooltip-simple ${hoveredSegment}`}>
                      <span className="tooltip-label">
                        {hoveredSegment === "positive"
                          ? "긍정 반응"
                          : "부정 반응"}
                      </span>
                      <span className="tooltip-value">
                        {hoveredSegment === "positive"
                          ? sentimentData.positive
                          : sentimentData.negative}
                        %
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. 평점 지수 (평판 지수) 섹션 */}
            <div className="sentiment-card">
              <div className="card-header">
                <h3 className="card-title">평점 지수</h3>
                <div className="card-header__actions">
                  <AddToCartButton
                    onAdd={() =>
                      addToCart({
                        type: "stat",
                        title: "평점 지수",
                        data: { score: 94, rating: 4.7 },
                        page: "review",
                        uniqueKey: "review-rating-index",
                      })
                    }
                    onRemove={() => removeByUniqueKey("review-rating-index")}
                    isInCart={isInCart("review-rating-index")}
                  />
                </div>
              </div>
              <div className="rating-chart">
                <div className="rating-score-circle">
                  <svg viewBox="0 0 200 200" className="score-circle">
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#e5e5e5"
                      strokeWidth="20"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#6691ff"
                      strokeWidth="20"
                      strokeDasharray="470 534"
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="score-content">
                    <div className="score-number">94</div>
                    <div className="score-label">신뢰도 점수</div>
                  </div>
                </div>
                <div className="rating-stars-display">
                  <span className="star star--filled">★</span>
                  <span className="star star--filled">★</span>
                  <span className="star star--filled">★</span>
                  <span className="star star--filled">★</span>
                  <span className="star star--half">★</span>
                  <span className="rating-number">4.7</span>
                </div>
                <div className="review-count">3,245개 리뷰</div>
              </div>
            </div>
          </div>

          {/* 5. 평점 분포 섹션 */}
          <div className="rating-distribution">
            <div className="rating-section-header-row">
              <h3 className="section-title">평점 분포</h3>
              <AddToCartButton
                onAdd={() =>
                  addToCart({
                    type: "chart",
                    title: "평점 분포",
                    data: ratingDistribution,
                    page: "review",
                    uniqueKey: "review-rating-distribution",
                  })
                }
                onRemove={() => removeByUniqueKey("review-rating-distribution")}
                isInCart={isInCart("review-rating-distribution")}
              />
            </div>
            <div className="rating-bars">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="rating-bar-row">
                  <div className="rating-bar-label">
                    <span className="star-number">{item.stars}</span>
                    <span className="star-filled">★</span>
                  </div>
                  <div className="rating-bar-container">
                    <div className="rating-bar-bg">
                      <div
                        className="rating-bar-fill"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="rating-bar-percentage">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. AI 키워드 분석 및 비즈니스 인사이트 섹션 */}
        <section className="review-ai-insights">
          <div className="ai-insights__container">
            <div className="ai-section-header-row">
              <h2 className="ai-insights__title">
                AI 키워드 분석 및 비즈니스 인사이트
              </h2>
              <AddToCartButton
                onAdd={() =>
                  addToCart({
                    type: "insight-list",
                    title: "AI 키워드 분석 및 비즈니스 인사이트",
                    data: insights,
                    page: "review",
                    uniqueKey: "review-ai-insights",
                  })
                }
                onRemove={() => removeByUniqueKey("review-ai-insights")}
                isInCart={isInCart("review-ai-insights")}
              />
            </div>

            <div className="insights-list">
              {insights.map((insight) => (
                <div key={insight.id} className="insight-item">
                  <div className="insight-header">
                    <div
                      className="insight-icon"
                      style={{ backgroundColor: getIconBg(insight.type) }}
                    >
                      {insight.type === "positive" ? (
                        <ThumbsUp color={getIconColor(insight.type)} size={20} />
                      ) : insight.type === "negative" ? (
                        <ThumbsDown color={getIconColor(insight.type)} size={20} />
                      ) : insight.type === "neutral" ? (
                        <BadgeAlert color={getIconColor(insight.type)} size={20} />
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 5V19M12 5C12 5 8 8 8 12M12 5C12 5 16 8 16 12"
                            stroke={getIconColor(insight.type)}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="insight-header-text">
                      <h3 className="insight-title">{insight.title}</h3>
                    </div>
                  </div>
                  <div className="insight-meta">
                    <span className="mention-count">
                      {insight.mentions.toLocaleString()} 언급
                    </span>
                    <span className="score">
                      점수 <span className="score-value">{insight.score}</span>
                      /100
                    </span>
                  </div>

                  <div className="insight-analysis">
                    <div className="ai-badge">
                      <span>✦ AI 해석</span>
                    </div>
                    <p className="analysis-text">{insight.aiAnalysis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
