// src/utils/pdfUtils.js
export async function downloadElementAsPDF(elementRef, filename = "document.pdf", landscape = false) {
  if (!elementRef) return;
  const el = elementRef instanceof HTMLElement ? elementRef : elementRef.current;
  if (!el) return;

  // Prefer html2pdf (works like faculty.html)
  try {
    let html2pdfLib;
    // Try dynamic import (if installed via npm)
    try {
      // eslint-disable-next-line import/no-extraneous-dependencies
      html2pdfLib = (await import("html2pdf.js")).default;
    } catch (e) {
      // fallback to global (if you loaded via CDN script tag in index.html)
      html2pdfLib = window.html2pdf;
    }
    if (html2pdfLib) {
      html2pdfLib().set({
        margin: 10,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: landscape ? "a4" : "a4", orientation: landscape ? "landscape" : "portrait" }
      }).from(el).save();
      return;
    }
  } catch (err) {
    console.warn("html2pdf error", err);
  }

  // Simple fallback: convert to PNG via html2canvas then open
  if (window.html2canvas) {
    try {
      const canvas = await window.html2canvas(el, { scale: 2 });
      const dataUrl = canvas.toDataURL("image/png");
      const w = window.open("");
      w.document.write(`<img src="${dataUrl}" style="max-width:100%"/>`);
      return;
    } catch (err) {
      console.error("html2canvas fallback failed", err);
    }
  }
  alert("PDF export requires html2pdf.js or html2canvas. Add the CDN script to index.html or install html2pdf.js.");
}
