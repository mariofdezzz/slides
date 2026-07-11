import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packagesDir = join(__dirname, "../slides");
const distDir = join(__dirname, "../dist");

if (!existsSync(distDir)) {
  mkdirSync(distDir);
}

// Collect talks data
const talks = [];

for (const folder of readdirSync(packagesDir)) {
  const folderPath = join(packagesDir, folder);
  const slidesMdPath = join(folderPath, "slides.md");

  if (existsSync(slidesMdPath)) {
    const slideContent = readFileSync(slidesMdPath, "utf-8");

    // Extract title from frontmatter
    const titleMatch = slideContent.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, "") : folder;

    talks.push({
      folder,
      title,
      url: `/${folder}/`,
    });
  }
}

// Sort talks by folder name (date)
talks.sort((a, b) => b.folder.localeCompare(a.folder));

// Generate HTML
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mario Ferrero - Charlas</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      max-width: 800px;
      width: 100%;
    }

    .header {
      text-align: center;
      color: white;
      margin-bottom: 50px;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .talks-grid {
      display: grid;
      gap: 20px;
    }

    .talk-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      display: block;
    }

    .talk-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .talk-card h2 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 1.5rem;
    }

    .talk-date {
      color: #999;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .talks-grid a:hover .talk-card h2 {
      color: #764ba2;
    }

    @media (max-width: 600px) {
      .header h1 {
        font-size: 2rem;
      }

      .talk-card {
        padding: 20px;
      }

      .talk-card h2 {
        font-size: 1.2rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Mario Ferrero</h1>
      <p>Charlas Técnicas</p>
    </div>

    <div class="talks-grid">
${talks
  .map((talk) => {
    // Extract date from folder name (e.g., "11-07-2026" -> "11 de Julio de 2026")
    const [day, month, year] = talk.folder.split("-");
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const formattedDate = `${day} de ${months[parseInt(month) - 1]} de ${year}`;

    return `      <a href="${talk.url}" class="talk-link">
        <div class="talk-card">
          <h2>${talk.title}</h2>
          <span class="talk-date">${formattedDate}</span>
        </div>
      </a>`;
  })
  .join("\n")}
    </div>
  </div>
</body>
</html>`;

writeFileSync(join(distDir, "index.html"), htmlContent);
console.log("✓ Index HTML generado en dist/index.html");
