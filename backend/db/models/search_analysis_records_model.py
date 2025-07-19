from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base  # 你的 Base

class SearchAnalysisRecord(Base):
    __tablename__ = "search_analysis_records"

    id = Column(Integer, primary_key=True, index=True)
    search_history_id = Column(Integer, ForeignKey("search_history.id"), nullable=False)

    query = Column(String, nullable=False)
    platforms = Column(JSON, nullable=False)
    overall_sentiment = Column(JSON, nullable=False)
    emotions = Column(JSON, nullable=False)
    keywords = Column(JSON, nullable=False)
    topics = Column(JSON, nullable=False)
    summary = Column(String, nullable=False)
    insights = Column(JSON, nullable=False)
    recommendations = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # 关系映射（可选，方便ORM级别访问）
    search_history = relationship("SearchHistory", back_populates="analysis_record")