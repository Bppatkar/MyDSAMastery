# ================================================
# DSA Mastery - Day 1 Complete Setup Script
# Windows PowerShell me run karo
# Usage: .\setup-day1.ps1
# ================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DSA Mastery - Day 1 Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# === STEP 1: Regular Folders Create Karo ===
Write-Host "📁 Creating folders..." -ForegroundColor Yellow

$folders = @(
    "src\app\editor",
    "src\app\interview",
    "src\app\ai",
    "src\app\dashboard",
    "src\app\patterns",
    "src\app\practice",
    "src\app\visualizers\sorting",
    "src\app\visualizers\graph",
    "src\app\visualizers\tree",
    "src\components\ui",
    "src\components\layout",
    "src\components\patterns",
    "src\components\practice",
    "src\components\visualizers",
    "src\components\editor",
    "src\components\ai",
    "src\components\dashboard",
    "src\data\patterns",
    "src\data\questions",
    "src\lib",
    "src\hooks",
    "src\store",
    "src\types",
    "src\styles",
    "public\illustrations"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    Write-Host "  + $folder" -ForegroundColor DarkGreen
}

# === STEP 2: Dynamic Route Folders (bracket wale) ===
New-Item -ItemType Directory -Force -LiteralPath "src\app\patterns\[pattern]" | Out-Null
Write-Host "  + src\app\patterns\[pattern]" -ForegroundColor DarkGreen
New-Item -ItemType Directory -Force -LiteralPath "src\app\practice\[question]" | Out-Null
Write-Host "  + src\app\practice\[question]" -ForegroundColor DarkGreen

Write-Host ""
Write-Host "✅ All folders created!" -ForegroundColor Green

# === STEP 3: Regular Files Create Karo ===
Write-Host ""
Write-Host "📝 Creating files..." -ForegroundColor Yellow

$files = @(
    "postcss.config.mjs",
    "PROGRESS.md",
    "src\styles\globals.css",
    "src\types\pattern.ts",
    "src\types\question.ts",
    "src\types\user.ts",
    "src\lib\utils.ts",
    "src\lib\constants.ts",
    "src\lib\helpers.ts",
    "src\hooks\usePatterns.ts",
    "src\hooks\useQuestions.ts",
    "src\hooks\useProgress.ts",
    "src\store\useUserStore.ts",
    "src\store\useProgressStore.ts",
    "src\store\useEditorStore.ts",
    "src\components\ui\button.tsx",
    "src\components\ui\card.tsx",
    "src\components\ui\badge.tsx",
    "src\components\ui\progress.tsx",
    "src\components\ui\separator.tsx",
    "src\components\ui\dialog.tsx",
    "src\components\ui\tabs.tsx",
    "src\components\ui\tooltip.tsx",
    "src\components\ui\scroll-area.tsx",
    "src\components\layout\Navbar.tsx",
    "src\components\layout\Sidebar.tsx",
    "src\components\layout\Footer.tsx",
    "src\components\patterns\PatternCard.tsx",
    "src\components\patterns\PatternList.tsx",
    "src\components\patterns\PatternProgress.tsx",
    "src\components\practice\QuestionCard.tsx",
    "src\components\practice\QuestionList.tsx",
    "src\components\practice\SubmissionPanel.tsx",
    "src\components\visualizers\SortingVisualizer.tsx",
    "src\components\visualizers\GraphVisualizer.tsx",
    "src\components\visualizers\TreeVisualizer.tsx",
    "src\components\editor\CodeEditor.tsx",
    "src\components\ai\ChatPanel.tsx",
    "src\components\dashboard\ProgressChart.tsx",
    "src\components\dashboard\StatsCard.tsx",
    "src\app\layout.tsx",
    "src\app\page.tsx",
    "src\app\patterns\page.tsx",
    "src\app\practice\page.tsx",
    "src\app\visualizers\page.tsx",
    "src\app\editor\page.tsx",
    "src\app\interview\page.tsx",
    "src\app\ai\page.tsx",
    "src\app\dashboard\page.tsx"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
    Write-Host "  + $file" -ForegroundColor DarkGreen
}

# === STEP 4: Dynamic Route Files ===
New-Item -ItemType File -Force -LiteralPath "src\app\patterns\[pattern]\page.tsx" | Out-Null
Write-Host "  + src\app\patterns\[pattern]\page.tsx" -ForegroundColor DarkGreen
New-Item -ItemType File -Force -LiteralPath "src\app\practice\[question]\page.tsx" | Out-Null
Write-Host "  + src\app\practice\[question]\page.tsx" -ForegroundColor DarkGreen

# === STEP 5: Old globals.css delete ===
Remove-Item -Force "src\app\globals.css" -ErrorAction SilentlyContinue
Write-Host ""
Write-Host "  - Deleted old src\app\globals.css" -ForegroundColor DarkYellow

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Day 1 Structure Ready!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Paste file contents from the guide" -ForegroundColor White
Write-Host "Then: npm run dev" -ForegroundColor White
Write-Host ""