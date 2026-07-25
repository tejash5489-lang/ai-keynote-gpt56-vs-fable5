# Research log — GPT-5.6 (Sol / Terra / Luna) vs Claude Fable 5

All figures used in the presentation are traced here: **claim → source → date checked**.
Checked live via web search on **2026-07-25**. Where sources conflicted, both values are kept
and shown on-screen — see "Conflicts & caveats" at the bottom.

## Release facts

| Claim | Source | Date checked |
|---|---|---|
| GPT-5.6 (Sol/Terra/Luna) shared with ~20 orgs + US CAISI review June 26, 2026; general availability July 9, 2026 | [VentureBeat](https://venturebeat.com/technology/openai-unveils-gpt-5-6-sol-terra-and-luna-models-but-only-accessible-to-limited-preview-partners-for-now-per-us-gov), [explainx.ai](https://explainx.ai/blog/gpt-5-6-sol-terra-luna-preview-june-2026), [AINews/latent.space](https://www.latent.space/p/ainews-openai-launches-gpt-56-solterraluna) | 2026-07-25 |
| Sol = flagship (hardest coding/security), Terra = high-volume business tasks, Luna = fast/cheap everyday work | [VentureBeat](https://venturebeat.com/technology/openai-unveils-gpt-5-6-sol-terra-and-luna-models-but-only-accessible-to-limited-preview-partners-for-now-per-us-gov) | 2026-07-25 |
| Claude Fable 5 announced/released June 9, 2026; first "Mythos-class" model, a tier above Opus | [codersera.com](https://codersera.com/blog/claude-fable-5-launch-guide-2026/), [simonwillison.net](https://simonwillison.net/2026/Jun/9/claude-fable-5/) | 2026-07-25 |
| Claude Opus 5 launched afterward at ~half Fable 5's price | [qz.com](https://qz.com/anthropic-claude-opus-5-fable-5-price-072426) | 2026-07-25 |

## Pricing (official, per 1M tokens)

| Model | Input | Output | Source |
|---|---|---|---|
| GPT-5.6 Luna | $1 | $6 | [VentureBeat](https://venturebeat.com/technology/openai-unveils-gpt-5-6-sol-terra-and-luna-models-but-only-accessible-to-limited-preview-partners-for-now-per-us-gov), cross-checked [apidog.com](https://apidog.com/blog/gpt-5-6-pricing/) |
| GPT-5.6 Terra | $2.50 | $15 | same |
| GPT-5.6 Sol | $5 | $30 | same |
| Claude Fable 5 | $10 | $50 | [Claude Platform pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) (official, fetched directly) |
| Claude Opus 5 (context, not a headline model) | $5 | $25 | Claude Platform pricing docs |

Caveats fetched from the same official Anthropic pricing page:
- Fable 5 prompt-cache reads are 0.1× base input ($1/MTok); 5-min cache write 1.25×, 1-hr cache write 2×.
- US-only `inference_geo` adds a 1.1× multiplier on Claude pricing.
- GPT-5.6 Sol requests over 272K input tokens are billed at 2× input / 1.5× output for the *entire* request ([Paweł Huryn / X](https://x.com/PawelHuryn/status/2079052153180569803), [GitHub openai/codex#31860](https://github.com/openai/codex/issues/31860)).

## Effort / reasoning levels

| Claim | Source | Date checked |
|---|---|---|
| GPT-5.6 offers six effort levels: none, low, medium, high, xhigh, and new **max** | [the-decoder.com](https://the-decoder.com/openai-staffer-maps-out-which-of-gpt-5-6-sols-five-reasoning-levels-fits-which-task-complexity/), [x.com/reach_vb](https://x.com/reach_vb/status/2075489301253488778) | 2026-07-25 |
| **Ultra** is not a higher effort level — it coordinates 4 agents in parallel by default, trading tokens for stronger/faster results. Ultra: ChatGPT Pro/Enterprise; Max: all ChatGPT/Codex plans with GPT-5.6 access | [ToolColumn](https://www.toolcolumn.com/learn/gpt-5-6-max-vs-ultra), [digitalapplied.com](https://www.digitalapplied.com/blog/gpt-5-6-sol-terra-luna-public-ga) | 2026-07-25 |
| Claude's `effort` API parameter (official docs, fetched directly): five levels — **low, medium, high (default), xhigh, max** — supported on Claude Fable 5, Mythos 5, Opus 5, Opus 4.8/4.7/4.6, Sonnet 5/4.6. `xhigh` not available on every model that supports `max`. | [Claude Platform docs — Effort](https://platform.claude.com/docs/en/build-with-claude/effort) | 2026-07-25 |
| Anthropic has no parallel-multi-agent *model parameter* equivalent to Ultra — subagent orchestration is a harness/product feature (Claude Code, Claude Managed Agents), not an `effort` value | Claude Platform docs — Effort (absence confirmed by full parameter table); Claude Managed Agents pricing docs | 2026-07-25 |

**Editorial note:** both companies converged on nearly identical five-rung naming (low/medium/high/xhigh/max). The real difference is OpenAI shipping a sixth, *categorically different* axis (Ultra = parallel agents) at the model-tier level, while Anthropic keeps multi-agent orchestration one layer up, in the harness.

## Cost & context specs

| Claim | Source |
|---|---|
| GPT-5.6 Sol: 1.05M token context window, 128K max output, knowledge cutoff Feb 16, 2026 (raw API spec) | [developers.openai.com model page via search](https://developers.openai.com/api/docs/models/gpt-5.6-sol) |
| Codex product-level context caps for Sol were cut in practice: 372K → 272K → 258K amid user complaints, despite the 1.05M spec | [AI Weekly](https://aiweekly.co/alerts/openai-codex-cuts-gpt-56-context-window-from-372k-to-272k), [GitHub openai/codex#31860](https://github.com/openai/codex/issues/31860), [GitHub openai/codex#32806](https://github.com/openai/codex/issues/32806) |
| Claude Fable 5: 1M token context window, 128K max output, knowledge cutoff Jan 2026 | [AWS Bedrock model card](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-fable-5.html), cross-checked search summaries |

## Benchmarks

| Benchmark | Sol / GPT-5.6 | Claude Fable 5 | Notes / source |
|---|---|---|---|
| Artificial Analysis **Intelligence Index** | 59 (max) | **60 (max)** — Fable ahead by 1 | Third-party aggregator, most neutral figure available. [artificialanalysis.ai](https://artificialanalysis.ai/articles/gpt-5-6-has-landed) |
| Artificial Analysis **Coding Agent Index** (in Codex harness) | **80 (max)** — Sol ahead | 77 (max) | OpenAI's own framing of the AA number: "2.8 points above Fable 5, less than half the output tokens, less than half the time, ~⅓ the cost." [OpenAI/X](https://x.com/OpenAI/status/2075271425548795909), [artificialanalysis.ai](https://artificialanalysis.ai/articles/gpt-5-6-has-landed) |
| **Terminal-Bench 2.1** | Sol 88.8 (base) / **91.9 (Ultra)** | 88.0 | [lushbinary.com](https://lushbinary.com/blog/gpt-5-6-sol-benchmarks-terminalbench-agentic-deep-dive/) — secondary aggregation of OpenAI's own release numbers |
| **SWE-bench Pro** — self-reported, different scaffolds (⚠️ contested, not apples-to-apples) | 64.60 (public set) | 80.3 (Anthropic's own scaffold) | Sol: public-set numbers cited widely, e.g. [datalearner.com](https://www.datalearner.com/en/ai-models/pretrained-models/gpt-5-6-sol/analysis). Fable: [claude5.ai](https://claude5.ai/en/news/claude-fable-5-benchmarks-swe-bench-pro-80-percent); contested per [techjacksolutions.com](https://techjacksolutions.com/ai-brief/claude-fable-5s-swe-bench-pro-score-is-contested-what-indepe/) — Anthropic's number used its own scaffolding, not a neutral harness |
| **Agents' Last Exam** (long-horizon professional workflows, 55 fields) — OpenAI's own self-reported comparison | **53.6** | 40.5 (i.e. "13.1 points" below Sol, per OpenAI) | Direct quote, OpenAI's own account: *"On Agents' Last Exam, GPT‑5.6 Sol sets a new high of 53.6, eclipsing Claude Fable 5 (adaptive) by 13.1 points."* [OpenAI/X](https://x.com/OpenAI/status/2075271423992680532) |
| GDPval-AA | 1747.8 Elo (v2, Sol) | 1932 Elo (different version tag, "GDPval-AA") | **Dropped from the deck** — version tags don't match (v2 vs unspecified), not a fair comparison; see caveat below |

## Conflicts & caveats (shown transparently in the app, not hidden)

1. **Agents' Last Exam is OpenAI's own number.** No neutral third-party re-run was found in this research pass. It is labeled on-screen as "OpenAI's own benchmark claim," not an independent score.
2. **SWE-bench Pro scores are not directly comparable.** Anthropic's 80.3% used Anthropic's own scaffolding (contested by independent commentators); the Sol figure widely cited (64.60) comes from the public evaluation set. The deck shows both numbers with the scaffold caveat rather than presenting one "winner."
3. **GDPval numbers were dropped entirely** because the two cited figures used different benchmark version tags (v2 vs. unversioned) and are not safely comparable — per the "never invent/never fudge a comparison" rule.
4. **A separate, older data point exists for GPT-5.5** (previous generation, not 5.6) scoring 24.0% vs Fable 5's 22.0% on an earlier run of Agents' Last Exam ([VentureBeat](https://venturebeat.com/technology/surprise-upset-gpt-5-5-beats-claude-fable-5-on-brutal-new-agents-last-exam-benchmark)). This is *not* used as a GPT-5.6 data point — it predates Sol — but explains why absolute ALE numbers moved so much between reports.
5. Independent leaderboards report Fable 5 at **95.00% on SWE-bench Verified** (an easier, largely-saturated predecessor benchmark, distinct from SWE-bench Pro) via vals.ai — mentioned only as context, not plotted against Sol's SWE-bench Pro number since they are different tests.
6. Both companies' own benchmark posts are marketing material. Treat every number here as vendor- or aggregator-reported, checked on 2026-07-25 — not independently re-run by this project.

## "Manager vs worker" framing

Labeled in the deck as **opinion/community framing**, not an official claim from either company. Sourced from creator commentary circulating around the GPT-5.6 launch window (general framing observed across multiple secondary blog posts, not attributable to a single primary source) — kept only as a labeled opinion card, not presented as fact.
