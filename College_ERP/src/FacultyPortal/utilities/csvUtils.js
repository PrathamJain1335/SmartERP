// lightweight CSV parser fallback (you can remove if using papa)
export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const text = reader.result;
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (!lines.length) resolve([]);
      const headers = lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,""));
      const rows = lines.slice(1).map(line => {
        const values = [];
        let cur = "", inQuotes=false;
        for (let i=0;i<line.length;i++){
          const ch = line[i];
          if (ch === '"' && line[i+1] === '"') { cur += '"'; i++; continue; }
          if (ch === '"') { inQuotes = !inQuotes; continue; }
          if (ch === ',' && !inQuotes) { values.push(cur); cur=""; continue; }
          cur += ch;
        }
        values.push(cur);
        const obj = {};
        headers.forEach((h,i)=>obj[h]=values[i]??"");
        return obj;
      });
      resolve(rows);
    };
    reader.readAsText(file);
  });
}
