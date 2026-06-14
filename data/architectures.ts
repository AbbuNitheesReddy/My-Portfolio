/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Layered system-architecture specs, keyed by `architectureId`.
 * Rendered by <ArchitectureModal/> as a tiered diagram (lanes of node cards +
 * connectors + metrics + a stores rail), not a diagram library.
 * Keep employer work at WORKFLOW level — generic stage names, no internal
 * endpoint paths, service names, or data-layer schema.
 */

export type NodeKind = 'input' | 'process' | 'model' | 'store' | 'output' | 'decision';

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
  kind: NodeKind;
}

export interface Layer {
  /** Lane label shown on the left (e.g. "Retrieval"). */
  label: string;
  nodes: DiagramNode[];
}

export interface DataStore {
  label: string;
  detail?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ArchitectureSpec {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  metrics?: Metric[];
  /** Top-to-bottom tiers; each tier is a horizontal lane of nodes. */
  layers: Layer[];
  /** Stores / sources feeding the pipeline, shown on the rail. */
  stores?: DataStore[];
  note?: string;
}

export const ARCHITECTURES: Record<string, ArchitectureSpec> = {
  docintel: {
    id: 'docintel',
    title: 'DocIntel Agent',
    tagline: 'Bounded agentic RAG loop with confidence-graded synthesis',
    stack: ['FastAPI', 'LangChain', 'ChromaDB', 'Ollama · Qwen3', 'SentenceTransformers'],
    metrics: [
      { value: '4', label: 'Live sources' },
      { value: '3-tier', label: 'Confidence grading' },
      { value: 'cosine', label: 'Vector space' },
    ],
    layers: [
      {
        label: 'Entry',
        nodes: [{ id: 'in', kind: 'input', label: 'POST /agent/query', detail: 'User question enters the agentic loop' }],
      },
      {
        label: 'Planning',
        nodes: [{ id: 'plan', kind: 'model', label: 'Planner LLM', detail: 'Emits a structured JSON retrieval plan' }],
      },
      {
        label: 'Retrieval',
        nodes: [
          { id: 'pre', kind: 'process', label: 'Pre-fetch', detail: 'Score evidence over the vector store' },
          { id: 'web', kind: 'decision', label: 'Weak evidence → web ingest', detail: 'search · scrape · embed · upsert' },
          { id: 'post', kind: 'process', label: 'Post-fetch', detail: 'Re-query after fresh evidence' },
        ],
      },
      {
        label: 'Synthesis',
        nodes: [{ id: 'out', kind: 'output', label: 'Confidence-graded answer', detail: 'Per-chunk HIGH / MEDIUM / LOW tags' }],
      },
    ],
    stores: [
      { label: 'ChromaDB', detail: 'Cosine space · normalized embeddings' },
      { label: 'Sources', detail: 'Wikipedia · arXiv · GitHub · StackOverflow' },
    ],
  },

  'rag-pipeline': {
    id: 'rag-pipeline',
    title: 'Production RAG Pipeline',
    tagline: 'Grounded retrieval + streaming generation for an EdTech platform',
    stack: ['FastAPI', 'FAISS', 'SentenceTransformers', 'Ollama · Qwen3'],
    metrics: [
      { value: '89%', label: 'Answer accuracy' },
      { value: '<4s', label: 'Time-to-first-token' },
      { value: '700+', label: 'Subject materials' },
      { value: 'top-4', label: 'Semantic retrieval' },
    ],
    layers: [
      {
        label: 'Ingestion',
        nodes: [
          { id: 'src', kind: 'input', label: '700+ subject materials', detail: 'Course content & question banks' },
          { id: 'chunk', kind: 'process', label: 'Metadata-tagged chunking', detail: 'Group-aware segmentation' },
        ],
      },
      {
        label: 'Indexing',
        nodes: [
          { id: 'embed', kind: 'model', label: 'SentenceTransformers', detail: 'Dense embeddings' },
          { id: 'faiss', kind: 'store', label: 'Per-group FAISS index', detail: 'Top-4 semantic retrieval' },
        ],
      },
      {
        label: 'Query',
        nodes: [
          { id: 'route', kind: 'decision', label: 'Query routing & type detection', detail: 'Question-bank ↔ study-material · short ↔ 8-section' },
        ],
      },
      {
        label: 'Generation',
        nodes: [
          { id: 'gen', kind: 'model', label: 'Qwen3 (Ollama) streaming', detail: 'Token-by-token · <think> suppression' },
        ],
      },
      {
        label: 'Serving',
        nodes: [{ id: 'api', kind: 'output', label: 'FastAPI microservice', detail: 'Asyncio concurrency guards on GPU calls' }],
      },
    ],
    stores: [
      { label: 'Question-bank index', detail: 'Per-group FAISS' },
      { label: 'Study-material index', detail: 'Per-group FAISS' },
    ],
    note: 'Workflow-level view — internal endpoints and data-layer details omitted.',
  },

  'multi-agent': {
    id: 'multi-agent',
    title: 'Multi-Agent AI Workflows',
    tagline: 'Specialist LLM agents behind a single routed API',
    stack: ['Qwen3', 'Qwen3-VL', 'Ollama', 'FastAPI'],
    metrics: [
      { value: '2', label: 'Specialist agents' },
      { value: 'JEE', label: 'Difficulty calibration' },
      { value: 'vision→LLM', label: 'Tool chaining' },
    ],
    layers: [
      {
        label: 'Orchestration',
        nodes: [{ id: 'route', kind: 'decision', label: 'Query routing', detail: 'Dispatch to the right specialist agent' }],
      },
      {
        label: 'Agents',
        nodes: [
          { id: 'mcq', kind: 'model', label: 'MCQ Generation Agent', detail: 'Concept-aware · JEE Mains/Advanced calibration' },
          { id: 'img', kind: 'model', label: 'Image→Solution Agent', detail: 'Qwen3-VL vision OCR → LLM solver' },
        ],
      },
      {
        label: 'Tooling',
        nodes: [
          { id: 'calib', kind: 'process', label: 'Difficulty calibration', detail: 'Targets exam difficulty bands' },
          { id: 'ocr', kind: 'process', label: 'Vision OCR chain', detail: 'Extract → reason → solve' },
        ],
      },
      {
        label: 'Delivery',
        nodes: [{ id: 'api', kind: 'output', label: 'FastAPI microservices', detail: 'Calibrated MCQs · step-by-step solutions' }],
      },
    ],
    stores: [
      { label: 'FAISS indexes', detail: 'Shared semantic retrieval' },
      { label: 'Concept bank', detail: 'Topic & concept metadata' },
    ],
    note: 'Workflow-level view — internal endpoints and data-layer details omitted.',
  },

  jobgenie: {
    id: 'jobgenie',
    title: 'JobGenie',
    tagline: 'AI hiring-intelligence platform — OCR + transformer NLP matching',
    stack: ['Python', 'BERT', 'GNN', 'OCR', 'AWS'],
    metrics: [
      { value: '70%', label: 'Less screening time' },
      { value: '85%', label: 'Job-match accuracy' },
    ],
    layers: [
      {
        label: 'Intake',
        nodes: [
          { id: 'in', kind: 'input', label: 'Résumés & job postings', detail: 'Mixed text and scanned documents' },
          { id: 'ocr', kind: 'process', label: 'OCR extraction', detail: 'Document → structured text' },
        ],
      },
      {
        label: 'Encoding',
        nodes: [{ id: 'embed', kind: 'model', label: 'Transformer NLP embeddings', detail: 'BERT encodes profiles & roles' }],
      },
      {
        label: 'Matching',
        nodes: [
          { id: 'graph', kind: 'process', label: 'Graph ranking', detail: 'GNN models candidate ↔ role fit' },
          { id: 'score', kind: 'process', label: 'Match scoring', detail: 'Readiness & relevance signals' },
        ],
      },
      {
        label: 'Output',
        nodes: [{ id: 'out', kind: 'output', label: 'Ranked recommendations', detail: 'Best-fit roles per candidate' }],
      },
    ],
    stores: [{ label: 'AWS services', detail: 'Hosted inference & storage' }],
  },

  'email-extraction': {
    id: 'email-extraction',
    title: 'Email Extraction & Classification',
    tagline: 'OCR + fine-tuned RoBERTa categorization pipeline',
    stack: ['Python', 'RoBERTa', 'OCR', 'NLP'],
    metrics: [
      { value: '60%', label: 'Less manual effort' },
      { value: '2-axis', label: 'Category + priority' },
    ],
    layers: [
      {
        label: 'Intake',
        nodes: [
          { id: 'in', kind: 'input', label: 'Recruiter emails & attachments', detail: 'Inbound text and documents' },
          { id: 'ocr', kind: 'process', label: 'OCR extraction', detail: 'Attachments → raw text' },
        ],
      },
      {
        label: 'Preprocess',
        nodes: [{ id: 'pre', kind: 'process', label: 'NLP preprocessing', detail: 'Clean · tokenize · normalize' }],
      },
      {
        label: 'Classification',
        nodes: [{ id: 'clf', kind: 'model', label: 'Fine-tuned RoBERTa', detail: 'Category + priority labels' }],
      },
      {
        label: 'Output',
        nodes: [{ id: 'out', kind: 'output', label: 'Auto-routed & prioritized', detail: 'Structured, labeled records' }],
      },
    ],
  },
};

export type ArchitectureId = keyof typeof ARCHITECTURES;
