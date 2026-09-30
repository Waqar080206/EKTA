/* ============================================================================
   EKTA — static demonstration data.
   Every figure below is fictional sample data for illustration only.
   No value here is an official statistic from CPCL, MoPNG or the Government of India.
   ========================================================================= */

export const nationalCode = "EKTA-VLV-GAT-000482";

export const standardDescription = [
  "Gate Valve, 2 in (DN50),",
  "Class 150, RF,",
  "Carbon Steel ASTM A216 WCB",
];

/* -------------------------------------------------------------------------- */
/*  Section registry                                                          */
/* -------------------------------------------------------------------------- */

export const SECTIONS = [
  { id: "system", label: "System" },
  { id: "product", label: "Product" },
  { id: "impact", label: "Impact" },
  { id: "sih", label: "SIH 2026" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/* -------------------------------------------------------------------------- */
/*  Section numbering                                                         */
/* -------------------------------------------------------------------------- */

export const SECTION_NUMBERS = {
  problem: "01 / PROBLEM",
  system: "02 / SYSTEM",
  capabilities: "03 / CAPABILITIES",
  product: "04 / PRODUCT",
  trace: "05 / TRACEABILITY",
  impact: "06 / IMPACT",
  sectors: "07 / SECTORS",
  governance: "08 / GOVERNANCE",
} as const;

/* -------------------------------------------------------------------------- */
/*  Hero — legacy records                                                     */
/* -------------------------------------------------------------------------- */

export type LegacyRecord = {
  org: string;
  code: string;
  tokens: string[];
  lit: number[];
  sweepAt: number;
};

export const legacyRecords: LegacyRecord[] = [
  {
    org: "CPSE A",
    code: "VLV-GATE-50MM-150#-CS-A216WCB",
    tokens: ["VLV", "GATE", "50MM", "150#", "CS", "A216WCB"],
    lit: [0, 2, 3, 4, 5],
    sweepAt: 900,
  },
  {
    org: "CPSE B",
    code: 'GATE VALVE 2" CL150 WCB',
    tokens: ["GATE", "VALVE", '2"', "CL150", "WCB"],
    lit: [0, 1, 2, 3, 4],
    sweepAt: 1200,
  },
  {
    org: "CPSE C",
    code: "VALVE,GATE,CS,2IN,RF,CLASS 150",
    tokens: ["VALVE", "GATE", "CS", "2IN", "RF", "CLASS 150"],
    lit: [0, 1, 2, 3, 5],
    sweepAt: 1500,
  },
];

/* -------------------------------------------------------------------------- */
/*  Problem — all figures illustrative                                        */
/* -------------------------------------------------------------------------- */

export const problemPanels = [
  {
    index: "01",
    title: ["One material", "many codes"],
    metric: "3–12+",
    metricUnit: "legacy codes",
    note: "One physical valve can carry a different code at every organisation that stores it.",
  },
  {
    index: "02",
    title: ["Duplicate", "masters"],
    metric: "Multiple",
    metricUnit: "records per equivalent",
    note: "Equivalent materials are maintained as independent, unreconciled master records.",
  },
  {
    index: "03",
    title: ["Fragmented", "procurement"],
    metric: "No shared",
    metricUnit: "demand visibility",
    note: "Demand cannot be aggregated across organisations when codes are not comparable.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

export const processStages = [
  {
    index: "01",
    label: "Ingest",
    title: "Bring every master in",
    body: "SAP and ERP material exports from each CPSE are parsed, normalised for structure and staged for analysis without altering the source system.",
    meta: ["SAP", "ERP", "CSV", "API"],
  },
  {
    index: "02",
    label: "Match",
    title: "Recognise the same material",
    body: "Natural language descriptions are embedded, attributes are extracted and candidate clusters are scored for identity and near-duplicate similarity.",
    meta: ["NLP", "Embeddings", "Attribute extraction"],
  },
  {
    index: "03",
    label: "Standardize",
    title: "Resolve to one representation",
    body: "Units, specifications and classifications are normalised into a canonical attribute set, then assigned a common National Material Code.",
    meta: ["Attribute normalization", "Classification", "National code"],
  },
  {
    index: "04",
    label: "Review",
    title: "A person signs it off",
    body: "Recommendations are queued for authorised reviewers. Nothing is published to a national code until a human approves the mapping.",
    meta: ["Human approval", "Audit trail"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Capabilities bento                                                        */
/* -------------------------------------------------------------------------- */

export type CapabilityIcon =
  | "match"
  | "standardize"
  | "duplicate"
  | "code"
  | "mapping"
  | "dashboard"
  | "audit"
  | "integration";

export const capabilities: {
  id: string;
  title: string;
  body: string;
  icon: CapabilityIcon;
  col: string;
  row: string;
  fragment?: "match" | "integration" | "code" | "dashboard" | "duplicate";
}[] = [
  {
    id: "ai-matching",
    title: "AI Matching & Recommendation",
    body: "Description similarity, extracted attributes and procurement history are combined to rank candidate equivalences and surface near-duplicates that plain string matching misses.",
    icon: "match",
    col: "md:col-span-6",
    row: "md:row-span-2",
    fragment: "match",
  },
  {
    id: "standardization",
    title: "Standardization & Classification",
    body: "Units are reconciled to a canonical measure and specifications are expressed in a consistent vocabulary.",
    icon: "standardize",
    col: "md:col-span-3",
    row: "md:row-span-1",
  },
  {
    id: "duplicate-detection",
    title: "Duplicate / Near-Duplicate Detection",
    body: "Clusters are rebuilt on every ingest, so drift inside a legacy system is caught rather than absorbed.",
    icon: "duplicate",
    col: "md:col-span-3",
    row: "md:row-span-1",
    fragment: "duplicate",
  },
  {
    id: "code-generation",
    title: "Common National Code Generation",
    body: "A deterministic code is issued per standardised material and stays stable across re-runs, so downstream references do not break.",
    icon: "code",
    col: "md:col-span-6",
    row: "md:row-span-1",
    fragment: "code",
  },
  {
    id: "mapping-migration",
    title: "CPSE Code Mapping & Migration",
    body: "Every national code keeps an explicit, reversible link to each originating legacy code, allowing parallel operation during migration.",
    icon: "mapping",
    col: "md:col-span-3",
    row: "md:row-span-1",
  },
  {
    id: "dashboard",
    title: "Dashboard & Analytics",
    body: "Cluster health, rationalisation progress and pending approvals at organisation and national level.",
    icon: "dashboard",
    col: "md:col-span-3",
    row: "md:row-span-1",
    fragment: "dashboard",
  },
  {
    id: "audit",
    title: "Audit Trail & Governance",
    body: "Each recommendation carries its full provenance: inputs, model version, reviewer decision and timestamp.",
    icon: "audit",
    col: "md:col-span-3",
    row: "md:row-span-1",
  },
  {
    id: "integration",
    title: "SAP / ERP Integration",
    body: "Material masters are exchanged over scheduled exports or a direct interface. Source systems remain the system of record for their own codes.",
    icon: "integration",
    col: "md:col-span-3",
    row: "md:row-span-1",
    fragment: "integration",
  },
];

/* -------------------------------------------------------------------------- */
/*  Dashboard — SAMPLE DATA                                                   */
/* -------------------------------------------------------------------------- */

export const duplicateClusters = [
  { label: "Valve assemblies", records: 12, active: true },
  { label: "Bearing 6205", records: 8, active: false },
  { label: "Carbon steel pipe", records: 17, active: false },
  { label: "Gasket spiral wound", records: 6, active: false },
  { label: "Flange RF 150#", records: 9, active: false },
  { label: "Stud bolt M20", records: 4, active: false },
] as const;

export type AttrState = "match" | "review";

export type ComparisonAttr = {
  key: string;
  a: string;
  b: string;
  state: AttrState;
};

export const comparisonRecords = [
  {
    org: "CPSE A",
    code: "VLV-GATE-50",
    system: "SAP · legacy",
  },
  {
    org: "CPSE B",
    code: "GV-2-150-WCB",
    system: "SAP · legacy",
  },
] as const;

export const comparisonAttrs: ComparisonAttr[] = [
  { key: "Size", a: "50 MM", b: "2 IN", state: "match" },
  { key: "Class", a: "150", b: "CL150", state: "match" },
  { key: "Material", a: "A216 WCB", b: "WCB", state: "review" },
  { key: "End connection", a: "RF", b: "RF", state: "match" },
  { key: "Type", a: "GATE", b: "GATE", state: "match" },
  { key: "Standard", a: "—", b: "ASME B16.34", state: "review" },
];

export const dashMetrics = [
  { label: "Duplicate rate", value: 18.6, suffix: "%", decimals: 1 },
  { label: "Codes rationalized", value: 4821, suffix: "", decimals: 0 },
  { label: "Mapped CPSEs", value: 12, suffix: "", decimals: 0 },
  { label: "Pending approvals", value: 143, suffix: "", decimals: 0 },
] as const;

/* -------------------------------------------------------------------------- */
/*  Traceability                                                               */
/* -------------------------------------------------------------------------- */

export const legacyMappings = [
  { org: "CPSE A", code: "VLV-GATE-50" },
  { org: "CPSE B", code: "GV-2-150-WCB" },
  { org: "CPSE C", code: "VALVE-GATE-CS" },
  { org: "CPSE D", code: "GV-150-RF" },
  { org: "CPSE E", code: "GATE-VLV-2IN" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Impact — illustrative, no fabricated financial figures                    */
/* -------------------------------------------------------------------------- */

export const impactOutcomes = [
  {
    index: "01",
    title: "Fewer duplicate codes",
    body: "Equivalent materials collapse onto a single national representation, shrinking the surface that has to be maintained.",
  },
  {
    index: "02",
    title: "Better material data quality",
    body: "Attribute normalisation exposes specification gaps and inconsistent descriptions while they are still cheap to fix.",
  },
  {
    index: "03",
    title: "Inventory optimization",
    body: "A material that is visible as one item can be managed as one item, rather than as several unrelated surpluses.",
  },
  {
    index: "04",
    title: "Demand aggregation & lower procurement cost",
    body: "Comparable codes make combined demand visible, which is a precondition for consolidated purchasing.",
  },
  {
    index: "05",
    title: "Faster specification finalization",
    body: "Reviewers compare a prepared attribute set instead of reconstructing a specification from three descriptions.",
  },
  {
    index: "06",
    title: "Foundation for common procurement & strategic sourcing",
    body: "A shared vocabulary is the layer any national sourcing framework would have to sit on.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Sectors — Unsplash, verified HTTP 200, photographer credited only where    */
/*  the name was confirmed on the source page.                                */
/* -------------------------------------------------------------------------- */

export type Sector = {
  id: string;
  name: string;
  index: string;
  note: string;
  src: string;
  alt: string;
  credit: string;
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const sectors: Sector[] = [
  {
    id: "oil-gas",
    name: "Oil & Gas",
    index: "01",
    note: "Refining, processing and pipeline operations",
    src: u("photo-1722246128616-76c934278e0a"),
    alt: "Oil refinery processing towers and pipework illuminated at dusk",
    credit: "Buddy AN · Unsplash",
  },
  {
    id: "power",
    name: "Power",
    index: "02",
    note: "Generation, transmission and distribution assets",
    src: u("photo-1588339251392-e1405faa28bd"),
    alt: "High-voltage electricity transmission towers under an overcast sky",
    credit: "Unsplash",
  },
  {
    id: "steel",
    name: "Steel",
    index: "03",
    note: "Primary metals, rolling and finished products",
    src: u("photo-1748946469857-60142faa03b4"),
    alt: "Molten steel rods moving through a steel mill production line",
    credit: "NIloy Tanvirul · Unsplash",
  },
  {
    id: "mining",
    name: "Mining",
    index: "04",
    note: "Extraction, beneficiation and material handling",
    src: u("photo-1649822825476-70af6471d30f"),
    alt: "Large open-cast mine pit with heavy excavation machinery at its centre",
    credit: "Tim Altmann · Unsplash",
  },
  {
    id: "engineering",
    name: "Heavy Engineering",
    index: "05",
    note: "Turbines, pressure equipment and large assemblies",
    src: u("photo-1759159091682-3b98f4759367"),
    alt: "Close-up of heavy industrial machinery with exposed gears and machined dials",
    credit: "Hans Westbeek · Unsplash",
  },
];

export const supportingImagery = {
  warehouse: {
    src: u("photo-1730503807844-6b01c05f9c0f"),
    alt: "Interior of a large industrial warehouse with tall shelving and stored materials",
    credit: "noe fornells · Unsplash",
  },
  valves: {
    src: u("photo-1767274714714-dda4c25c6376"),
    alt: "Rusted industrial pipes and valves on a factory pipe rack",
    credit: "Attila Lénert · Unsplash",
  },
  texture: {
    src: u("photo-1764717360313-587a1805fe7e"),
    alt: "Abstract view of a steel truss structure against an open sky",
    credit: "Philippe BONTEMPS · Unsplash",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Governance                                                                 */
/* -------------------------------------------------------------------------- */

export const governancePrinciples = [
  {
    id: "human",
    label: "Human-in-the-loop",
    title: "A person decides",
    body: "EKTA proposes. It does not publish. Every material mapping, whether newly created or amended, is reviewed and approved by an authorised user before it becomes part of the national standard. A rejected recommendation is recorded, not silently dropped.",
    points: [
      "No mapping is final without an approver",
      "Reject and edit are first-class outcomes",
      "Reviewers see the full source record before deciding",
    ],
  },
  {
    id: "audit",
    label: "Audit trail",
    title: "Every step is reconstructable",
    body: "Recommendations retain their inputs, model version, confidence and reasoning signals. Each approval, edit or rejection is written to an immutable log so any national code can be traced back to the exact records that produced it.",
    points: [
      "Source records retained with each recommendation",
      "Model and rule version recorded per mapping",
      "Decision history retained per national code",
    ],
  },
  {
    id: "access",
    label: "Role-based access",
    title: "Authority follows responsibility",
    body: "Permissions are structured around the organisation's own responsibilities. Materiallists, procurement officers and administrators each see the scope of material they are accountable for, and nothing beyond it.",
    points: [
      "Scope bounded by organisation and material group",
      "Approval rights separated from data entry",
      "Access changes recorded alongside mappings",
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const projectMeta = {
  theme: "Smart Automation",
  hackathon: "SIH 2026",
  problemStatement: "PS 6099",
  organization: "Ministry of Petroleum & Natural Gas",
  agency: "Chennai Petroleum Corporation Limited",
  descriptor: "National Unified Material Master",
  tagline: "One Nation. One Material Code.",
  team: "Team EKTA",
} as const;

export const imageCredits: string[] = [
  ...new Set([
    ...sectors.map((s) => s.credit),
    supportingImagery.warehouse.credit,
    supportingImagery.valves.credit,
    supportingImagery.texture.credit,
  ]),
];

export const partnerSectors = [
  "Oil & Gas",
  "Power",
  "Steel",
  "Mining",
  "Heavy Engineering",
] as const;
