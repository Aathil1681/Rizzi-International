"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { FiArrowUp, FiArrowDown, FiBell } from "react-icons/fi";
import { AiOutlineClose, AiOutlineGold } from "react-icons/ai";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ScatterController,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ScatterController,
  Title,
  Tooltip,
  Filler
);

// Animate numbers
const useAnimatedPrice = (price: number | null) => {
  const [animatedPrice, setAnimatedPrice] = useState<number>(price || 0);

  useEffect(() => {
    if (price === null) return;
    const controls = animate(animatedPrice, price, {
      duration: 0.5,
      onUpdate: (latest: number) => setAnimatedPrice(latest),
    });
    return controls.stop;
  }, [price]);

  return animatedPrice.toFixed(2);
};

type PriceData = {
  "24K": number;
  "22K": number;
  "18K": number;
  ounce: number;
};

export default function GoldRateButton() {
  const [open, setOpen] = useState(false);
  const [priceData, setPriceData] = useState<PriceData>({
    "24K": 4232.14,
    "22K": 4232.14 * (22 / 24),
    "18K": 4232.14 * (18 / 24),
    ounce: 4232.14,
  });
  const [history, setHistory] = useState<number[]>(
    Array.from({ length: 30 }, () => 4200 + Math.random() * 50)
  );
  const [buyersRatio, setBuyersRatio] = useState(65 + Math.random() * 20);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live gold prices
  useEffect(() => {
    if (!open) return;

    const fetchGoldRate = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/gold", { cache: "no-store" });
        if (!res.ok)
          throw new Error(`Server API request failed: ${res.status}`);
        const data: PriceData = await res.json();

        setPriceData(data);
        setHistory((prev) => [...prev.slice(1), data["24K"]]);
        setBuyersRatio(65 + Math.random() * 20);
      } catch (err) {
        console.error("Failed to fetch gold price:", err);
        setPriceData((prev) => {
          const change = (Math.random() - 0.5) * 5;
          const gold24K = prev["24K"] + change;
          setHistory((prevHist) => [...prevHist.slice(1), gold24K]);
          return {
            "24K": gold24K,
            "22K": gold24K * (22 / 24),
            "18K": gold24K * (18 / 24),
            ounce: gold24K,
          };
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 5000);
    return () => clearInterval(interval);
  }, [open]);

  const animatedPrice = useAnimatedPrice(priceData["24K"]);
  const sellPrice = priceData["24K"] * 0.9995;
  const buyPrice = priceData["24K"];

  const chartData = {
    labels: history.map((_, i) => i),
    datasets: [
      {
        data: history,
        borderColor: "#3b82f6",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3b82f6",
        fill: true,
        backgroundColor: (ctx: any) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
      },
    ],
  };

  // Typed as ChartOptions<'line'>; we cast scales entries to `any` to avoid strict Chart.js scale-type issues.
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            const value = Number(context.raw || 0);
            const prev = Number(history[context.dataIndex - 1] || value);
            const diff = (value - prev).toFixed(2);
            return `$${value.toFixed(2)} (${
              Number(diff) >= 0 ? "+" : ""
            }${diff})`;
          },
        },
      },
    },
    scales: {
      // cast to any to satisfy the Chart.js TS scale typing (safe and common workaround)
      x: {
        display: true,
        title: {
          display: true,
          text: "Time (seconds)", // straight font label with parentheses
          font: { weight: "normal", style: "normal" },
        },
        ticks: {
          maxRotation: 0, // straight labels (no slant)
          autoSkip: true,
        },
      } as unknown as any,
      y: {
        display: true,
        title: {
          display: true,
          text: "Price (USD)",
          font: { weight: "normal", style: "normal" },
        },
      } as unknown as any,
    },
  };

  return (
    <>
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-5 z-50 p-4 bg-yellow-400 text-white rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
        >
          <AiOutlineGold size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl px-6 sm:px-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl font-sans relative overflow-hidden">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                >
                  <AiOutlineClose size={20} />
                </button>

                {/* Header */}
                <div className="flex justify-between items-center mb-4 mt-2">
                  <div className="flex items-center gap-4">
                    <motion.div
                      key={animatedPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl font-bold tracking-tight"
                    >
                      {animatedPrice}
                    </motion.div>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <FiBell />
                    </button>
                  </div>
                </div>

                {/* Karat Prices */}
                <div className="flex justify-between mb-2 text-sm text-gray-400 flex-wrap">
                  {(["24K", "22K", "18K", "ounce"] as const).map((k) => (
                    <div key={k} className="flex flex-col items-center w-1/4">
                      <span className="font-semibold">{k}</span>
                      <span>{priceData[k]?.toFixed(2) ?? "0.00"}</span>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="h-56 mb-4 w-full sm:w-[28rem] md:w-[36rem] lg:w-[48rem] xl:w-[60rem] mx-auto">
                  {history.length > 0 && (
                    <Line data={chartData} options={chartOptions} />
                  )}
                </div>

                {/* Buy/Sell */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="bg-red-600 hover:bg-red-700 transition-colors w-full p-4 rounded-lg flex flex-col items-start">
                    <span className="text-sm font-medium opacity-80">SELL</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">
                        {sellPrice.toFixed(2)}
                      </span>
                      <FiArrowDown />
                    </div>
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 transition-colors w-full p-4 rounded-lg flex flex-col items-start">
                    <span className="text-sm font-medium opacity-80">BUY</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">
                        {buyPrice.toFixed(2)}
                      </span>
                      <FiArrowUp />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
