import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

const Chart = () => {
    const chartRef = useRef();
    const [ohlcData, setOhlcData] = useState(null);

    //chart 전체 스타일에 대한 속성 (e.g 수평선, 수직선, 가로세로 text 등)
    useEffect(() => {
        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: "#fff" },
                textColor: "#000",
                attributionLogo: false,
            },
            grid: {
                vertLines: { color: "#eee" },
                horzLines: { color: "#eee" },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        //chart 내부 데이터에 대한 속성
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderUpColor: '#26a69a',
            borderDownColor: '#ef5350',
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            priceFormat: {
                type: 'price',
                precision: 4,
                minMove: 0.0001
            },
        });

        //데이터들 (백엔드에서 비동기로 받아와서 store로 저장하고 전파하면 될듯)
        const data = [
            { time: '2025-06-01', open: 0.1121, high: 0.1186, low: 0.0887, close: 0.1134 },
            { time: '2025-06-02', open: 0.1134, high: 0.1287, low: 0.1088, close: 0.1287 },
            { time: '2025-06-03', open: 0.1287, high: 0.1287, low: 0.1105, close: 0.1200 },
            { time: '2025-06-04', open: 0.1200, high: 0.1250, low: 0.1165, close: 0.1173 },
            { time: '2025-06-05', open: 0.1173, high: 0.1198, low: 0.1100, close: 0.1147 },
            { time: '2025-06-06', open: 0.1147, high: 0.1170, low: 0.1048, close: 0.1093 },
            { time: '2025-06-07', open: 0.1093, high: 0.1101, low: 0.0900, close: 0.0987 },
            { time: '2025-06-08', open: 0.0987, high: 0.1029, low: 0.0937, close: 0.0951 },
            { time: '2025-06-09', open: 0.0951, high: 0.1190, low: 0.0900, close: 0.1038 },
            { time: '2025-06-10', open: 0.1038, high: 0.1100, low: 0.0975, close: 0.1050 },
            { time: '2025-06-11', open: 0.1050, high: 0.1150, low: 0.1041, close: 0.1077 },
            { time: '2025-06-12', open: 0.1077, high: 0.1082, low: 0.0996, close: 0.1020 },
        ];

        candlestickSeries.setData(data);

        chart.subscribeCrosshairMove((param) => {
            if (!param || !param.time || !param.seriesData) {
                setOhlcData(null);
                return;
            }
            const d = param.seriesData.get(candlestickSeries);

            // 가격 표시 display (얘도 마지막 데이터 store로 남기면 될듯)
            if (d) {
                setOhlcData({
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    close: d.close,
                });
            }
        });

        return () => chart.remove();
    }, []);

    return (
        <div className="relative w-full">
            {/* 상단 좌측 가격 표시 display 영역 */}
            <div className="absolute top-2 left-2 bg-transparent flex gap-[10px] text-[#000] text-sm z-10 font-mono">
                {ohlcData ? (
                    <>
                        <div><strong>{ohlcData.time}</strong></div>
                        <div>O:{ohlcData.open.toFixed(4)}</div>
                        <div>H:{ohlcData.high.toFixed(4)}</div>
                        <div>L:{ohlcData.low.toFixed(4)}</div>
                        <div>C:{ohlcData.close.toFixed(4)}</div>
                    </>
                ) : (
                    <></>
                )}
            </div>

            {/* 차트 영역 */}
            <div ref={chartRef} style={{ width: "100%", height: 400 }} />
        </div>
    );
};

export default Chart;
