"use client";

import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
  type ChartConfiguration,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

type FundsDonutChartProps = {
  items: Array<{
    label: string;
    value: number;
    color: string;
  }>;
};

type TooltipState = {
  color: string;
  label: string;
  left: number;
  top: number;
  value: string;
};

export function FundsDonutChart({ items }: FundsDonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config: ChartConfiguration<"doughnut", number[], string> = {
      type: "doughnut",
      data: {
        labels: items.map((item) => item.label),
        datasets: [
          {
            data: items.map((item) => item.value),
            backgroundColor: items.map((item) => item.color),
            borderColor: "transparent",
            borderRadius: 0,
            borderWidth: 0,
            hoverOffset: 20,
            spacing: 0,
          },
        ],
      },
      options: {
        cutout: "60%",
        layout: {
          padding: 24,
        },
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: ({ chart, tooltip }) => {
              if (!tooltip.opacity) {
                setTooltip(null);
                return;
              }

              const point = tooltip.dataPoints?.[0];
              const parent = chart.canvas.parentElement;

              if (!point || !parent) {
                setTooltip(null);
                return;
              }

              const canvasRect = chart.canvas.getBoundingClientRect();
              const parentRect = parent.getBoundingClientRect();
              const color = Array.isArray(point.dataset.backgroundColor)
                ? String(point.dataset.backgroundColor[point.dataIndex])
                : String(point.dataset.backgroundColor ?? "#8b1737");
              const value =
                typeof point.parsed === "number"
                  ? point.parsed.toLocaleString("it-IT", {
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    })
                  : "";

              setTooltip({
                color,
                label: point.label,
                left: canvasRect.left - parentRect.left + tooltip.caretX,
                top: canvasRect.top - parentRect.top + tooltip.caretY,
                value: `${value}%`,
              });
            },
          },
        },
        responsive: true,
      },
    };

    const chart = new Chart(canvasRef.current, config);

    return () => chart.destroy();
  }, [items]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-visible">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Schema visuale delle aree sostenute dai fondi A-ROSE"
      />
      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 min-w-48 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-2xl border border-line bg-white px-4 py-3 text-left shadow-[0_18px_45px_rgba(73,15,31,0.14)]"
          style={{ left: tooltip.left, top: tooltip.top }}
        >
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: tooltip.color }}
              aria-hidden="true"
            />
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-rose">
              {tooltip.label}
            </p>
          </div>
          <p className="mt-1 font-serif text-3xl leading-none text-wine">
            {tooltip.value}
          </p>
        </div>
      ) : null}
    </div>
  );
}
