/**
 * PlaySpace - Interactive Charts Module
 * Strictly using #000000, #FFFFFF, #FFCC00
 * Self-contained Canvas chart rendering with full fallback
 */

(function () {
  'use strict';

  function drawBarChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 500;
    const height = canvas.height = 240;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxVal = Math.max(...data, 100);

    ctx.clearRect(0, 0, width, height);

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    const barWidth = (chartWidth / data.length) * 0.6;
    const barSpacing = chartWidth / data.length;

    data.forEach((val, idx) => {
      const barH = (val / maxVal) * chartHeight;
      const x = padding + idx * barSpacing + (barSpacing - barWidth) / 2;
      const y = height - padding - barH;

      // Bar fill (Yellow #FFCC00)
      ctx.fillStyle = '#FFCC00';
      ctx.fillRect(x, y, barWidth, barH);

      // Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx], x + barWidth / 2, height - padding + 16);

      // Value
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(val, x + barWidth / 2, y - 6);
    });
  }

  function drawLineChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 500;
    const height = canvas.height = 240;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxVal = Math.max(...data, 5000);

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Points
    const stepX = chartWidth / (data.length - 1);
    const points = data.map((val, idx) => {
      return {
        x: padding + idx * stepX,
        y: height - padding - (val / maxVal) * chartHeight
      };
    });

    // Draw Area Fill
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 204, 0, 0.15)';
    ctx.fill();

    // Draw Stroke Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#FFCC00';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Points & Labels
    points.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.strokeStyle = '#FFCC00';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx], p.x, height - padding + 16);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Occupancy Hourly Chart
    drawBarChart('admin-occupancy-chart',
      ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
      [65, 140, 210, 235, 184, 90]
    );

    // Revenue Trend Chart
    drawLineChart('admin-revenue-chart',
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [1800, 2200, 2600, 3100, 5400, 8900, 7200]
    );

    window.addEventListener('resize', function () {
      drawBarChart('admin-occupancy-chart',
        ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
        [65, 140, 210, 235, 184, 90]
      );
      drawLineChart('admin-revenue-chart',
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        [1800, 2200, 2600, 3100, 5400, 8900, 7200]
      );
    });
  });

  window.PlaySpaceCharts = {
    drawBarChart: drawBarChart,
    drawLineChart: drawLineChart
  };
})();
