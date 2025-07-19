/*import React from "react";
import ReactECharts from "echarts-for-react";
import {
  Box, Typography
} from "@mui/material";

interface Analysis {
  sentiment: string;
  summary: string;
  keywords: string[];
}

interface Props {
  analysis: Analysis;
}

const SentimentResult: React.FC<Props> = ({ analysis }) => {
  const sentimentPieOption = {
    title: {
      text: "情绪分布",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "情绪",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1, name: analysis.sentiment }, // 这里只显示分析结果情绪
          { value: 0, name: "positive" },
          { value: 0, name: "neutral" },
          { value: 0, name: "negative" }
        ].map((d) => ({
          ...d,
          itemStyle: {
            color:
              d.name === "positive"
                ? "#91cc75"
                : d.name === "negative"
                ? "#ee6666"
                : "#fac858"
          }
        }))
      }
    ]
  };

  const keywordWordCloudOption = {
    title: {
      text: "关键词词云",
      left: "center"
    },
    tooltip: {},
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        sizeRange: [12, 40],
        rotationRange: [-90, 90],
        gridSize: 2,
        drawOutOfBound: true,
        textStyle: {
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: () =>
            `rgb(${[1, 1, 1].map(() => Math.round(Math.random() * 160)).join(",")})`
        },
        data: analysis.keywords.map((word) => ({
          name: word,
          value: Math.floor(Math.random() * 100 + 20) // mock value
        }))
      }
    ]
  };

  return (
    <div>
      <Box>
            <Typography variant="h6">Analysis Result:</Typography>
            <Typography>
              <strong>Sentiment:</strong> {analysis.sentiment}
            </Typography>
            <Typography>
              <strong>Summary:</strong> {analysis.summary}
            </Typography>
            <Typography>
              <strong>Keywords:</strong> {analysis.keywords.join(", ")}
            </Typography>
     </Box>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 30 }}>
        <ReactECharts option={sentimentPieOption} style={{ width: 400, height: 400 }} />
        <ReactECharts option={keywordWordCloudOption} style={{ width: 500, height: 400 }} />
      </div>
    </div>
  );
};

export default SentimentResult;*/
// src/components/SentimentResult.tsx

import React from "react";
import { Typography, Box, Chip, Stack, Divider } from "@mui/material";
import ReactECharts from "echarts-for-react";

interface AnalysisResult {
  aggregate: {
    sentiment_distribution: {
      positive: number;
      neutral: number;
      negative: number;
    };
    top_keywords: string[];
    summary: string;
    overall_sentiment: string;
    overall_keywords: string[];
  };
  per_item_results: {
    id: number;
    sentiment: string;
    summary: string;
    keywords: string[];
  }[];
}

const SentimentResult: React.FC<{ analysis: AnalysisResult }> = ({ analysis }) => {
  const { aggregate, per_item_results } = analysis;

  const pieOption = {
    title: { text: "Sentiment Distribution", left: "center" },
    tooltip: { trigger: "item" },
    series: [
      {
        name: "Sentiment",
        type: "pie",
        radius: "50%",
        data: Object.entries(aggregate.sentiment_distribution).map(
          ([label, value]) => ({ name: label, value })
        ),
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0,0,0,0.5)" },
        },
      },
    ],
  };

  const wordcloudOption = {
    title: { text: "Top Keywords", left: "center" },
    tooltip: {},
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        sizeRange: [12, 40],
        rotationRange: [-45, 90],
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          normal: { color: () => `rgb(${Math.random()*160},${Math.random()*160},${Math.random()*160})` },
          emphasis: { shadowBlur: 10, shadowColor: "#333" },
        },
        data: Array.from(new Set(aggregate.top_keywords)).map(word => ({
          name: word,
          value: Math.floor(Math.random() * 100 + 20),
        })),
      },
    ],
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Overall Summary
      </Typography>
      <Typography>{aggregate.summary}</Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} mt={4} gap={4}>
        <Box flex={1}>
          <ReactECharts option={pieOption} />
        </Box>
        <Box flex={1}>
          <ReactECharts option={wordcloudOption} />
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" gutterBottom>
        Individual Post Analysis
      </Typography>
      <Stack spacing={2}>
        {per_item_results.map((item, idx) => (
          <Box key={idx} border={1} borderColor="grey.300" borderRadius={2} p={2}>
            <Typography fontWeight="bold">Post {item.id}</Typography>
            <Typography variant="body2" gutterBottom color="text.secondary">
              Sentiment: {item.sentiment}
            </Typography>
            <Typography variant="body2">{item.summary}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {item.keywords.map((kw, i) => (
                <Chip key={i} label={kw} size="small" />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default SentimentResult;

